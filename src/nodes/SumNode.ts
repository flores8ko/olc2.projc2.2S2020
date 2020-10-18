import {Op} from "../utils/Op";
import {Envmnt} from "../utils/Envmnt";
import {Suma} from "../utils/AlgebraicOperationsFunctions";
import {Cntnr} from "../utils/Cntnr";
import {GraphvizNode} from "../utils/GraphvizNode";
import { Code } from "../utils/C3D/Code";
import {GetReferenceValueCode} from "../utils/Utils";
import {Tmp} from "../utils/C3D/Tmp";
import {STRING} from "../utils/PrimitiveTypoContainer";

export class SumNode extends Op {
    private readonly lf: Op;
    private readonly rt: Op;

    constructor(position: any, lf: Op, rt: Op) {
        super(position);
        this.lf = lf;
        this.rt = rt;
    }

    public GOCode(env: Envmnt): Code {
        let codeLf = GetReferenceValueCode(this.lf.ExeCode(env));
        let codeRt = GetReferenceValueCode(this.rt.ExeCode(env));

        const codeAns = new Code(codeLf, codeRt);
        codeAns.setPointer(Tmp.newTmp());
        let value = Suma((this.lf.Exe(env) as Cntnr), (this.rt.Exe(env) as Cntnr), this.position);
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
        //TODO tmpmanager ??
        return codeAns;
    }

    GO(env: Envmnt): object {
        return Suma((this.lf.Exe(env) as Cntnr), (this.rt.Exe(env) as Cntnr), this.position);
    }

    GetGraph(env: Envmnt): GraphvizNode {
        return new GraphvizNode('SUM', [this.lf.GetGraph(env), this.rt.GetGraph(env)]);
    }

    GetTSGraph(): string {
        return "";
    }

}
