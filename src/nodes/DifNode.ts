import {Op} from "../utils/Op";
import {Diferente} from "../utils/RelationalOperationsFunctions";
import {Cntnr} from "../utils/Cntnr";
import {Envmnt} from "../utils/Envmnt";
import {GraphvizNode} from "../utils/GraphvizNode";

export class DifNode extends Op {
    private readonly lf: Op;
    private readonly rt: Op;

    constructor(position: any, lf: Op, rt: Op) {
        super(position);
        this.lf = lf;
        this.rt = rt;
    }

    GO(env: Envmnt): object {
        return Diferente((this.lf.Exe(env) as Cntnr), (this.rt.Exe(env) as Cntnr), this.position);
    }

    GetGraph(env: Envmnt): GraphvizNode {
        return new GraphvizNode('DIF', [this.lf.GetGraph(env), this.rt.GetGraph(env)]);
    }

    GetTSGraph(): string {
        return "";
    }
}
