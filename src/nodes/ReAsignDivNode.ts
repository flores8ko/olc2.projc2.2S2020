import {Op} from "../utils/Op";
import {Envmnt} from "../utils/Envmnt";
import {Reference} from "../utils/Reference";
import {GetReferenceValueCode, SemanticException} from "../utils/Utils";
import {Division} from "../utils/AlgebraicOperationsFunctions";
import {Cntnr} from "../utils/Cntnr";
import {GraphvizNode} from "../utils/GraphvizNode";
import { Code } from "../utils/C3D/Code";
import {Tmp} from "../utils/C3D/Tmp";

export class ReAsignDivNode extends Op {
    private readonly lf: Op;
    private readonly rt: Op;

    constructor(position: any, lf: Op, rt: Op) {
        super(position);
        this.lf = lf;
        this.rt = rt;
    }

    public GOCode(env: Envmnt): Code {
        const value = this.GO(env) as Cntnr;

        const codeLfRef = this.lf.ExeCode(env);
        const codeLf = GetReferenceValueCode(codeLfRef);
        const codeRt = GetReferenceValueCode(this.rt.ExeCode(env));

        const codeAns = new Code(codeLfRef, codeLf, codeRt);
        codeAns.setPointer(Tmp.newTmp());
        codeAns.appendDiv(codeLf.getPointer(), codeRt.getPointer());
        codeAns.setValue(value);
        if(!codeLfRef.isHeap) {
            codeAns.appendAsignToStackPosition(codeLfRef.getPointer(), codeAns.getPointer());
        }else{
            codeAns.appendAsignToHeapPosition(codeLfRef.getPointer(), codeAns.getPointer());
        }
        return codeAns;
    }

    GO(env: Envmnt): object {
        const lf = this.lf.Exe(env);
        const rt = this.rt.Exe(env);

        if (!(lf instanceof Reference)) {
            throw new SemanticException(`No se puede asiganr a ${lf}, las asignaciones solo pueden ser sobre una referencia`, this.position);
        }

        (lf as Reference).PutValueOnReference(
            Division((lf as Reference).getValue(), rt as Cntnr, this.position)
        );
        return (lf as Reference).getValue();
    }

    GetGraph(env: Envmnt): GraphvizNode {
        return new GraphvizNode('RE_ASIGN_DIV', [this.lf.GetGraph(env), this.rt.GetGraph(env)]);
    }

    GetTSGraph(): string {
        return "";
    }
}
