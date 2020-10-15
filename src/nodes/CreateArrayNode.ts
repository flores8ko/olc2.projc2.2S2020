import { Op } from "../utils/Op";
import {Envmnt} from "../utils/Envmnt";
import {Cntnr} from "../utils/Cntnr";
import {Reference} from "../utils/Reference";
import {ARRAY} from "../utils/PrimitiveTypoContainer";
import {GraphvizNode} from "../utils/GraphvizNode";

export class CreateArrayNode extends Op{
    private readonly vals: Array<Op>;

    constructor(position: any, vals: Array<Op>) {
        super(position);
        this.vals = vals;
    }

    GO(env: Envmnt): object {
        let real = new Array<Cntnr>();
        for (let op of this.vals) {
            let reference = new Reference();
            reference.PutValueOnReference(op.Exe(env) as Cntnr);
            real.push(reference);
        }
        return new ARRAY(real);
    }

    GetGraph(env: Envmnt): GraphvizNode {
        return new GraphvizNode('ARRAY', this.vals.map(val => val.GetGraph(env)));
    }

    GetTSGraph(): string {
        return "";
    }
}
