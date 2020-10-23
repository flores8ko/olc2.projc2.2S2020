import {Cntnr, Envmnt, Op, Reference} from "../index";
import {GetReferenceValueCode, SemanticException} from "../utils/Utils";
import {Suma} from "../utils/AlgebraicOperationsFunctions";
import {GraphvizNode} from "../utils/GraphvizNode";
import { Code } from "../utils/C3D/Code";
import {STRING} from "../utils/PrimitiveTypoContainer";
import {Tmp} from "../utils/C3D/Tmp";

export class ReAsignAddNode extends Op {
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
        if (value instanceof STRING) {
            codeAns.appendSplitComment("Start String asign");
            codeAns.appendValueToPointer("H", "string start");

            const codePos = new Code();
            codePos.setPointer(Tmp.newTmp());
            codePos.appendSuma(codeAns.getPointer(), 0 + "", "str[" + 0 + "]");
            let ch = value.getValue().length;
            codePos.appendAsignToHeapPosition(codePos.getPointer(), ch, "str[" + 0 + "]=" + ch + " (strLth)");
            codeAns.append(codePos);

            for (let i = 1; i <= value.getValue().length; i++) {
                const codePos = new Code();
                codePos.setPointer(Tmp.newTmp());
                codePos.appendSuma(codeAns.getPointer(), i + "", "str[" + i + "]");
                ch = value.getValue().charCodeAt(i - 1);
                codePos.appendAsignToHeapPosition(codePos.getPointer(), ch + "", "str[" + i + "]=" + String.fromCharCode(ch));
                codeAns.append(codePos);
            }

            codeAns.appendAddToHeapPointer(value.getValue().length + 1 + "", "string size");
        }else{
            codeAns.appendSuma(codeLf.getPointer(), codeRt.getPointer());
        }
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
