import {Op} from "../utils/Op";
import {Envmnt} from "../utils/Envmnt";
import {Reference} from "../utils/Reference";
import {SemanticException} from "../utils/Utils";
import {Cntnr} from "../utils/Cntnr";
import {GraphvizNode} from "../utils/GraphvizNode";

export class AsignNode extends Op{
    private readonly lf: Op;
    private readonly rt: Op;

    constructor(position: any, lf: Op, rt: Op) {
        super(position);
        this.lf = lf;
        this.rt = rt;
    }

    GO(env: Envmnt): object {
        const lfVal: object = this.lf.Exe(env);
        const rtVal: object = this.rt.Exe(env);

        if (!(lfVal instanceof Reference)) {
            throw new SemanticException(`No se puede asignar a ${(lfVal as Cntnr).typo}, las asignaciones solo pueden ser sobre una referencia`, this.position);
        }
        (lfVal as Reference).PutValueOnReference(rtVal as Cntnr);
        return null;
    }

    GetGraph(env: Envmnt): GraphvizNode {
        return new GraphvizNode('ASIG', [this.lf.GetGraph(env), this.rt.GetGraph(env)]);
    }

    GetTSGraph(): string {
        return "";
    }
}
