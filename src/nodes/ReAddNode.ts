import {Op} from "../utils/Op";
import {Envmnt} from "../utils/Envmnt";
import {Add} from "../utils/AlgebraicOperationsFunctions";
import {Cntnr} from "../utils/Cntnr";
import {GraphvizNode} from "../utils/GraphvizNode";

export class ReAddNode extends Op {
    private readonly lf: Op;

    constructor(position: any, lf: Op) {
        super(position);
        this.lf = lf;
    }

    GO(env: Envmnt): object {
        return Add(this.lf.Exe(env) as Cntnr, this.position);
    }

    GetGraph(env: Envmnt): GraphvizNode {
        return new GraphvizNode('RE_ADD', [this.lf.GetGraph(env)]);
    }

    GetTSGraph(): string {
        return "";
    }
}
