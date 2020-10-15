import {Op} from "../utils/Op";
import {Envmnt} from "../utils/Envmnt";
import {Modulo} from "../utils/AlgebraicOperationsFunctions";
import {Cntnr} from "../utils/Cntnr";
import {GraphvizNode} from "../utils/GraphvizNode";

export class ModNode extends Op{
    private readonly lf: Op;
    private readonly rt: Op;

    constructor(position: any, lf: Op, rt: Op) {
        super(position);
        this.lf = lf;
        this.rt = rt;
    }

    GO(env: Envmnt): object {
        return Modulo((this.lf.Exe(env) as Cntnr), (this.rt.Exe(env) as Cntnr), this.position);
    }

    GetGraph(env: Envmnt): GraphvizNode {
        return new GraphvizNode('MOD', [this.lf.GetGraph(env), this.rt.GetGraph(env)]);
    }

    GetTSGraph(): string {
        return "";
    }
}
