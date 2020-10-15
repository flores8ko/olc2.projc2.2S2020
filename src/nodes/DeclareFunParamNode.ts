import {Op} from "../utils/Op";
import {Envmnt} from "../utils/Envmnt";
import {UNDEFINED} from "../utils/PrimitiveTypoContainer";
import {Reference} from "../utils/Reference";
import {GraphvizNode} from "../utils/GraphvizNode";
import {TSGraphControl} from "../utils/TSGraphControl";

export class DeclareFunParamNode extends Op{
    private readonly name: string;
    private readonly type: string;

    constructor(position: any, name: string, type = 'ANY') {
        super(position);
        this.name = name;
        this.type = type.toUpperCase();
    }

    GetName() {
        return this.name.toUpperCase();
    }

    GO(env: Envmnt): object {
        const value = new UNDEFINED();
        const reference = new Reference(this.type);
        reference.PutValueOnReference(value);
        env.Declare(this.name, reference);
        return reference;
    }

    GetGraph(env: Envmnt): GraphvizNode {
        return new GraphvizNode('NEW_FUN_PARAM', [new GraphvizNode(this.name), new GraphvizNode(this.type)]);
    }

    GetTSGraph(): string {
        return `n${TSGraphControl.GetNodeId()} [label="${this.name}"]\n`;;
    }
}
