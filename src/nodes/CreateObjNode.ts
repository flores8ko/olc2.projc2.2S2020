import {Op} from "../utils/Op";
import {Envmnt} from "../utils/Envmnt";
import {Cntnr} from "../utils/Cntnr";
import {Reference} from "../utils/Reference";
import {OBJECT} from "../utils/PrimitiveTypoContainer";
import {GraphvizNode} from "../utils/GraphvizNode";

export class CreateObjNode extends Op {
    private readonly attrs: Map<string, Op>;

    constructor(position: any, attrs: Map<string, Op>) {
        super(position);
        this.attrs = attrs;
    }

    GO(env: Envmnt): object {
        const real: Map<string, Cntnr> = new Map<string, Cntnr>();
        this.attrs.forEach((v, k) => {
            let value = v.Exe(env);
            if (value instanceof Reference) {
                value = (value as Reference).getValue();
            }
            const reference = new Reference();
            reference.PutValueOnReference(value as Cntnr);
            real.set(k, reference);
        });
        return new OBJECT(real);
    }

    GetGraph(env: Envmnt): GraphvizNode {
        let values: GraphvizNode[] = [];
        this.attrs.forEach((v, k) => {
            values.push(new GraphvizNode(k));
            values.push(v.GetGraph(env));
        });
        return new GraphvizNode('TYPE_VALUE', values);
    }

    GetTSGraph(): string {
        return "";
    }
}
