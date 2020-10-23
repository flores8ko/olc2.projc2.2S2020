import {Op} from "../utils/Op";
import {Envmnt} from "../utils/Envmnt";
import {Add} from "../utils/AlgebraicOperationsFunctions";
import {Cntnr} from "../utils/Cntnr";
import {GraphvizNode} from "../utils/GraphvizNode";
import { Code } from "../utils/C3D/Code";
import {GetReferenceValueCode, SemanticException} from "../utils/Utils";
import {Tmp} from "../utils/C3D/Tmp";
import {Reference} from "../utils/Reference";

export class ReAddNode extends Op {
    private readonly lf: Op;

    constructor(position: any, lf: Op) {
        super(position);
        this.lf = lf;
    }

    public GOCode(env: Envmnt): Code {
        const lfVal: object = this.lf.Exe(env);
        if (!(lfVal instanceof Reference)) {
            throw new SemanticException(`No se puede asignar a ${(lfVal as Cntnr).typo}, las asignaciones solo pueden ser sobre una referencia`, this.position);
        }


        let codeLf = this.lf.ExeCode(env);
        const codeLfRefVal = GetReferenceValueCode(codeLf);

        const codeAns = new Code(codeLf, codeLfRefVal);
        const codeSuma = new Code();
        codeSuma.setPointer(Tmp.newTmp());
        codeSuma.appendSuma(codeLfRefVal.getPointer(), "1");
        codeAns.append(codeSuma);
        if(!codeLf.isHeap) {
            codeAns.appendAsignToStackPosition(codeLf.getPointer(), codeSuma.getPointer());
        }else{
            codeAns.appendAsignToHeapPosition(codeLf.getPointer(), codeSuma.getPointer());
        }

        codeAns.setPointer(Tmp.newTmp());
        codeAns.appendValueToPointer(codeLfRefVal.getPointer());
        codeAns.setValue(Add(codeLf.getValue(), this.position));

        return codeAns;
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
