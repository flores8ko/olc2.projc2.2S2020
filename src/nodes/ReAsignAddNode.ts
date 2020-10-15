import {Cntnr, Envmnt, Op, Reference} from "../index";
import {SemanticException} from "../utils/Utils";
import {Suma} from "../utils/AlgebraicOperationsFunctions";
import {GraphvizNode} from "../utils/GraphvizNode";

export class ReAsignAddNode extends Op {
    private readonly lf: Op;
    private readonly rt: Op;

    constructor(position: any, lf: Op, rt: Op) {
        super(position);
        this.lf = lf;
        this.rt = rt;
    }

    GO(env: Envmnt): object {
        const lf = this.lf.Exe(env);
        const rt = this.rt.Exe(env);

        if (!(lf instanceof Reference)) {
            throw new SemanticException(`No se puede asiganr a ${lf}, las asignaciones solo pueden ser sobre una referencia`, this.position);
        }

        (lf as Reference).PutValueOnReference(
            Suma((lf as Reference).getValue(), rt as Cntnr, this.position)
        );
        return (lf as Reference).getValue();
    }

    GetGraph(env: Envmnt): GraphvizNode {
        return new GraphvizNode('RE_ASIGN_ADD', [this.lf.GetGraph(env), this.rt.GetGraph(env)]);
    }

    GetTSGraph(): string {
        return "";
    }
}
