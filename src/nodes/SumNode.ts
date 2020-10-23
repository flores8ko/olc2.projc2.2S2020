import {Op} from "../utils/Op";
import {Envmnt} from "../utils/Envmnt";
import {Suma} from "../utils/AlgebraicOperationsFunctions";
import {Cntnr} from "../utils/Cntnr";
import {GraphvizNode} from "../utils/GraphvizNode";
import { Code } from "../utils/C3D/Code";
import {GetReferenceValueCode} from "../utils/Utils";
import {Tmp} from "../utils/C3D/Tmp";
import {STRING} from "../utils/PrimitiveTypoContainer";
import {Lbl} from "../utils/C3D/Lbl";

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
            codeAns.appendSplitComment("START STRING concat");
            codeAns.appendValueToPointer("H");
            const newStr = new Code();
            newStr.setPointer(Tmp.newTmp());
            newStr.GetFromHeap(codeLf.getPointer());


            const codeStr1Cicle = new Code();
            codeStr1Cicle.setPointer(Tmp.newTmp());
            codeStr1Cicle.appendValueToPointer(codeLf.getPointer());
            newStr.append(codeStr1Cicle);
            newStr.appendSuma(newStr.getPointer(), codeStr1Cicle.getPointer());

            let codePos = new Code();
            codePos.setPointer(Tmp.newTmp());
            codePos.appendValueToPointer(codeAns.getPointer());
            newStr.append(codePos);

            const str1LblCicle = Lbl.newLbl();
            newStr.appendLabel(str1LblCicle, "start "+(codeLf.getValue() as STRING).getValue());

            let codeTmp = new Code();
            codeTmp.setPointer(codeStr1Cicle.getPointer());
            codeTmp.appendSuma(codeStr1Cicle.getPointer(), "1");
            newStr.append(codeTmp);

            let codePosTmp = new Code();
            codePosTmp.setPointer(codePos.getPointer());
            codePosTmp.appendSuma(codePos.getPointer(), "1");
            newStr.append(codePosTmp);

            let codeHeap = new Code();
            codeHeap.setPointer(Tmp.newTmp());
            codeHeap.GetFromHeap(codeTmp.getPointer());
            newStr.append(codeHeap);
            newStr.appendAsignToHeapPosition(codePos.getPointer(), codeHeap.getPointer());

            newStr.appendJL(codeStr1Cicle.getPointer(), newStr.getPointer(), str1LblCicle, "end "+(codeLf.getValue() as STRING).getValue());



            const newStr2 = new Code();
            newStr2.setPointer(Tmp.newTmp());
            newStr2.GetFromHeap(codeRt.getPointer());

            const codeStr2Cicle = new Code();
            codeStr2Cicle.setPointer(Tmp.newTmp());
            codeStr2Cicle.appendValueToPointer(codeRt.getPointer());
            newStr2.append(codeStr2Cicle);
            newStr2.appendSuma(newStr2.getPointer(), codeStr2Cicle.getPointer());


            const str2LblCicle = Lbl.newLbl();
            newStr2.appendLabel(str2LblCicle, "start "+(codeRt.getValue() as STRING).getValue());

            codeTmp = new Code();
            codeTmp.setPointer(codeStr2Cicle.getPointer());
            codeTmp.appendSuma(codeStr2Cicle.getPointer(), "1");
            newStr2.append(codeTmp);

            codePosTmp = new Code();
            codePosTmp.setPointer(codePos.getPointer());
            codePosTmp.appendSuma(codePos.getPointer(), "1");
            newStr2.append(codePosTmp);

            codeHeap = new Code();
            codeHeap.setPointer(Tmp.newTmp());
            codeHeap.GetFromHeap(codeTmp.getPointer());
            newStr2.append(codeHeap);
            newStr2.appendAsignToHeapPosition(codePos.getPointer(), codeHeap.getPointer());

            newStr2.appendJL(codeStr2Cicle.getPointer(), newStr2.getPointer(), str2LblCicle, "end "+(codeRt.getValue() as STRING).getValue());


            codeAns.append(newStr);
            codeAns.append(newStr2);

            codePos = new Code();
            codePos.setPointer(Tmp.newTmp());
            codePos.appendSuma(newStr.getPointer(), newStr2.getPointer());
            codePos.appendAsignToHeapPosition(codeAns.getPointer(), codePos.getPointer());
            codeAns.append(codePos);
            codeAns.appendAddToHeapPointer(codePos.getPointer(), "string size");
            codeAns.appendSplitComment("End string concat");
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
