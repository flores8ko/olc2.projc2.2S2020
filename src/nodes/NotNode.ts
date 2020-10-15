import {Op} from "../utils/Op";
import {Envmnt} from "../utils/Envmnt";
import {Not} from "../utils/LogicalOperationsFunctions";
import {Cntnr} from "../utils/Cntnr";
import {GraphvizNode} from "../utils/GraphvizNode";

export class NotNode extends Op {
    private readonly lf: Op;

    constructor(position: any, lf: Op, rt: Op) {
        super(position);
        this.lf = lf;
    }

    GO(env: Envmnt): object {
        return Not(this.lf.Exe(env) as Cntnr, this.position);
    }

    GetGraph(env: Envmnt): GraphvizNode {
        return new GraphvizNode('NOT', [this.lf.GetGraph(env)]);
    }

    GetTSGraph(): string {
        return "";
    }
}
