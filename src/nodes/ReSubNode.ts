import {Op} from "../utils/Op";
import {Envmnt} from "../utils/Envmnt";
import {Sub} from "../utils/AlgebraicOperationsFunctions";
import {Cntnr} from "../utils/Cntnr";
import {GraphvizNode} from "../utils/GraphvizNode";
import { Code } from "../utils/C3D/Code";

export class ReSubNode extends Op {
    public GOCode(env: Envmnt): Code {
        throw new Error("Method not implemented.");
    }
    private readonly lf: Op;

    constructor(position: any, lf: Op) {
        super(position);
        this.lf = lf;
    }

    GO(env: Envmnt): object {
        return Sub(this.lf.Exe(env) as Cntnr, this.position);
    }

    GetGraph(env: Envmnt): GraphvizNode {
        return new GraphvizNode('RE_SUB', [this.lf.GetGraph(env)]);
    }

    GetTSGraph(): string {
        return "";
    }

}
