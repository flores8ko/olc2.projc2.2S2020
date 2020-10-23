import {Op} from "../utils/Op";
import {Envmnt} from "../utils/Envmnt";
import {Add, Sub} from "../utils/AlgebraicOperationsFunctions";
import {Cntnr} from "../utils/Cntnr";
import {GraphvizNode} from "../utils/GraphvizNode";
import { Code } from "../utils/C3D/Code";
import {Reference} from "../utils/Reference";
import {GetReferenceValueCode, SemanticException} from "../utils/Utils";
import {Tmp} from "../utils/C3D/Tmp";

export class ReSubNode extends Op {
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
        const codeResta = new Code();
        codeResta.setPointer(Tmp.newTmp());
        codeResta.appendResta(codeLfRefVal.getPointer(), "1");
        codeAns.append(codeResta);
        if(!codeLf.isHeap) {
            codeAns.appendAsignToStackPosition(codeLf.getPointer(), codeResta.getPointer());
        }else{
            codeAns.appendAsignToHeapPosition(codeLf.getPointer(), codeResta.getPointer());
        }

        codeAns.setPointer(Tmp.newTmp());
        codeAns.appendValueToPointer(codeLfRefVal.getPointer());
        codeAns.setValue(Add(codeLf.getValue(), this.position));

        return codeAns;
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
