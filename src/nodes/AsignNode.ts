import {Op} from "../utils/Op";
import {Envmnt} from "../utils/Envmnt";
import {Reference} from "../utils/Reference";
import {GetReferenceValueCode, SemanticException} from "../utils/Utils";
import {Cntnr} from "../utils/Cntnr";
import {GraphvizNode} from "../utils/GraphvizNode";
import { Code } from "../utils/C3D/Code";

export class AsignNode extends Op {
    private readonly lf: Op;
    private readonly rt: Op;

    public GOCode(env: Envmnt): Code {
        //const lfVal: object = this.lf.Exe(env);
        //const rtVal: object = this.rt.Exe(env);

        const codeLf = this.lf.ExeCode(env);
        let codeRt = this.rt.ExeCode(env);

        if (!(codeLf.getValue() instanceof Reference)) {
            throw new SemanticException(`No se puede asignar a ${(codeLf.getValue() as Cntnr).typo}, las asignaciones solo pueden ser sobre una referencia`, this.position);
        }

        codeRt = GetReferenceValueCode(codeRt);
        const codeAns = new Code(codeLf, codeRt);
        codeAns.appendSplitComment("start Asignacion");
        if(!codeLf.isHeap) {
            codeAns.appendAsignToStackPosition(codeLf.getPointer(), codeRt.getPointer());
        }else {
            codeAns.appendAsignToHeapPosition(codeLf.getPointer(), codeRt.getPointer());
        }
        (codeLf.getValue() as Reference).setValue(codeRt.getValue());

        codeAns.setPointer(codeLf.getPointer());
        codeAns.setValue(codeLf.getValue());
        codeAns.isHeap = codeLf.isHeap;

        codeAns.appendSplitComment("end Asginacion");
        return codeAns;
    }

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
