import {Op} from "../utils/Op";
import {Envmnt} from "../utils/Envmnt";
import {Suma} from "../utils/AlgebraicOperationsFunctions";
import {Cntnr} from "../utils/Cntnr";
import {GraphvizNode} from "../utils/GraphvizNode";
import { Code } from "../utils/C3D/Code";
import {GetReferenceValueCode} from "../utils/Utils";
import {Tmp} from "../utils/C3D/Tmp";
import {NUMBER, STRING} from "../utils/PrimitiveTypoContainer";
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
        let value = Suma(codeLf.getValue(), codeRt.getValue(), this.position);
        if (value instanceof STRING) {

            if (!(codeLf.getValue() instanceof STRING)) {
                const codeRtToString = this.valToString(codeLf);
                codeAns.append(codeRtToString);
                codeLf.setPointer(codeRtToString.getPointer());
                codeLf.setValue(codeRtToString.getValue());
            }

            if (!(codeRt.getValue() instanceof STRING)) {
                const codeRtToString = this.valToString(codeRt);
                codeAns.append(codeRtToString);
                codeRt.setPointer(codeRtToString.getPointer());
                codeRt.setValue(codeRtToString.getValue());
            }

            codeAns.appendSplitComment("START STRING concat");
            codeAns.appendValueToPointer("H");


            const newStr = new Code();
            newStr.setPointer(Tmp.newTmp());
            newStr.GetFromHeap(codeLf.getPointer());
            let realSize1 = Tmp.newTmp();


            const codeStr1Cicle = new Code();
            codeStr1Cicle.setPointer(Tmp.newTmp());
            codeStr1Cicle.appendValueToPointer(codeLf.getPointer());
            newStr.append(codeStr1Cicle);
            newStr.appendLine(`${realSize1} = ${newStr.getPointer()};`, "guardo tamaño real 1er string")
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
            let realSize2 = Tmp.newTmp();

            const codeStr2Cicle = new Code();
            codeStr2Cicle.setPointer(Tmp.newTmp());
            codeStr2Cicle.appendValueToPointer(codeRt.getPointer());
            newStr2.append(codeStr2Cicle);
            newStr2.appendLine(`${realSize2} = ${newStr2.getPointer()};`, "guardo tamaño real 2do string");
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
            codePos.appendSuma(realSize1, realSize2, "suma de tamaños de string 1 y 2");
            codePos.appendSuma(codePos.getPointer(), "1");
            codePos.appendAsignToHeapPosition(codeAns.getPointer(), codePos.getPointer(), "añadir el tamaño de string");
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

    private valToString(codeValue: Code): Code{
        let codeToString = new Code();
        codeToString.appendSplitComment("start pasando a string");

        const codeCopiaNumero = new Code();
        codeCopiaNumero.setPointer(Tmp.newTmp());
        let isNegativeLbl = Lbl.newLbl();
        let endLbl = Lbl.newLbl();
        let negativoBandera = Tmp.newTmp();
        codeCopiaNumero.appendJL(codeValue.getPointer(), "0", isNegativeLbl);
        codeCopiaNumero.appendValueToPointer(codeValue.getPointer(), "no es negativo");
        codeCopiaNumero.appendLine(`${negativoBandera} = 0;`, "bandera no es negativo");
        codeCopiaNumero.appendJMP(endLbl);
        codeCopiaNumero.appendLabel(isNegativeLbl);
        codeCopiaNumero.appendMulti(codeValue.getPointer(), "-1","si es negativo");
        codeCopiaNumero.appendLine(`${negativoBandera} = 1;`, "bandera si es negativo");
        codeCopiaNumero.appendLabel(endLbl);
        codeToString.append(codeCopiaNumero);

        let codeSize = new Code();
        codeSize.setPointer(Tmp.newTmp());
        codeSize.appendValueToPointer("0");
        let whileStartLbl = Lbl.newLbl();
        let whileEndLbl = Lbl.newLbl();
        codeSize.appendLabel(whileStartLbl, "ciclo para tamaño");
        codeSize.appendJLE("(int)"+codeCopiaNumero.getPointer(), "0", whileEndLbl);
        codeSize.appendLine(`${codeCopiaNumero.getPointer()} = ${codeCopiaNumero.getPointer()} / 10;`, "divide la copia del numero");
        codeSize.appendSuma(codeSize.getPointer(), "1", "incrementa el tamaño del string");
        codeSize.appendJMP(whileStartLbl);
        codeSize.appendLabel(whileEndLbl, "termina ciclo para tamaño");
        codeToString.append(codeSize);

        isNegativeLbl = Lbl.newLbl();
        endLbl = Lbl.newLbl();

        codeToString.appendJE(negativoBandera, "1", isNegativeLbl);
        codeToString.appendLine(`${codeCopiaNumero.getPointer()} = ${codeValue.getPointer()};`, "si no es negativo solo copia el numero");
        codeToString.appendJMP(endLbl);
        codeToString.appendLabel(isNegativeLbl, "si es negativo va a negativo");
        codeToString.appendLine(`${codeSize.getPointer()} = ${codeSize.getPointer()} + 1;`, "aumenta en uno el string");
        codeToString.appendLine(`${codeCopiaNumero.getPointer()} = ${codeValue.getPointer()} * -1;`, "multiplica por menos uno");
        codeToString.appendLabel(endLbl);

        const codeNewString = new Code();
        codeNewString.appendSplitComment("start asign string");
        codeNewString.setPointer(Tmp.newTmp());
        codeNewString.appendValueToPointer("H", "string start");

        const codePos = new Code();
        codePos.setPointer(Tmp.newTmp());
        codePos.appendSuma(codeNewString.getPointer(), 0 + "", "str["+0+"]");
        codePos.appendAsignToHeapPosition(codePos.getPointer(), codeSize.getPointer(), "str["+0+"]="+codeSize.getPointer()+" (strLth)");

        codeNewString.append(codePos);



        let codeCopyToHeap = new Code();
        codeCopyToHeap.setPointer(Tmp.newTmp());
        let stringSize = Tmp.newTmp();
        codeCopyToHeap.appendLine(`${stringSize} = ${codeSize.getPointer()};`, "guardo tamaño de string");
        codeCopyToHeap.appendValueToPointer("0");
        whileStartLbl = Lbl.newLbl();
        whileEndLbl = Lbl.newLbl();
        let tmpForChr = Tmp.newTmp();

        codeCopyToHeap.appendLabel(whileStartLbl);
        codeCopyToHeap.appendJLE("(int)" + codeCopiaNumero.getPointer(), "0", whileEndLbl);
        codeCopyToHeap.appendSuma(codeNewString.getPointer(), codeSize.getPointer(), "suma puntero string + size");
        codeCopyToHeap.appendLine(`${tmpForChr} = (int)${codeCopiaNumero.getPointer()} % 10;`, "cuenta para numero");
        codeCopyToHeap.appendLine(`${tmpForChr} = ${tmpForChr} + 48;`, "añade ascii");
        codeCopyToHeap.appendAsignToHeapPosition(codeCopyToHeap.getPointer(), tmpForChr, "añade char a heap");
        codeCopyToHeap.appendLine(`${codeCopiaNumero.getPointer()} = ${codeCopiaNumero.getPointer()} / 10;`, "siguiente numero");
        codeCopyToHeap.appendLine( `${codeSize.getPointer()} = ${codeSize.getPointer()} - 1;`, "reduce size");
        codeCopyToHeap.appendJMP(whileStartLbl);
        codeCopyToHeap.appendLabel(whileEndLbl);

        codeCopyToHeap.appendAddToHeapPointer(stringSize);
        codeNewString.append(codeCopyToHeap);
        codeNewString.appendSplitComment("end asign string");
        codeToString.append(codeNewString);
        codeToString.appendSplitComment("end pasando a string");
        codeToString.setPointer(codeNewString.getPointer());
        codeToString.setValue(new STRING());

        return codeToString;
    }

}
