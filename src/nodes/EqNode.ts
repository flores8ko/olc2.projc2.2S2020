import {Op} from "../utils/Op";
import {Igual} from "../utils/RelationalOperationsFunctions";
import {Envmnt} from "../utils/Envmnt";
import {Cntnr} from "../utils/Cntnr";
import {GraphvizNode} from "../utils/GraphvizNode";
import { Code } from "../utils/C3D/Code";
import {GetReferenceValueCode} from "../utils/Utils";
import {Tmp} from "../utils/C3D/Tmp";
import {Lbl} from "../utils/C3D/Lbl";
import {STRING} from "../utils/PrimitiveTypoContainer";

export class EqNode extends Op {
    private readonly lf: Op;
    private readonly rt: Op;

    public GOCode(env: Envmnt): Code {
        const codeLf = GetReferenceValueCode(this.lf.ExeCode(env));
        const codeRt = GetReferenceValueCode(this.rt.ExeCode(env));

        const codeAns = new Code(codeLf, codeRt);
        codeAns.setPointer(Tmp.newTmp());
        codeAns.setValue(Igual(codeLf.getValue(), codeRt.getValue()));
        const lbl = Lbl.newLbl();
        codeAns.appendValueToPointer("1");
        if (codeLf.getValue() instanceof STRING && codeRt.getValue() instanceof STRING) {
            const codeStrLf = new Code();
            const codeStrRt = new Code();
            let nonEq = Lbl.newLbl();

            codeStrLf.setPointer(Tmp.newTmp());
            codeStrRt.setPointer(Tmp.newTmp());

            codeStrLf.GetFromHeap(codeLf.getPointer(), "obtiene tamaño str1");
            codeStrRt.GetFromHeap(codeRt.getPointer(), "obtiene tamaño str2");
            codeAns.append(codeStrLf);
            codeAns.append(codeStrRt);
            codeAns.appendJNE(codeStrLf.getPointer(), codeStrRt.getPointer(), nonEq, "no mismo tamaño, salto a falso");

            const codeLfIndex = new Code();
            const codeRtIndex = new Code();

            codeLfIndex.setPointer(Tmp.newTmp());
            codeRtIndex.setPointer(Tmp.newTmp());

            codeLfIndex.appendSuma(codeLf.getPointer(), "1", "indice str1");
            codeRtIndex.appendSuma(codeRt.getPointer(), "1", "indice str2");

            codeAns.append(codeLfIndex);
            codeAns.append(codeRtIndex);

            let whileStart = Lbl.newLbl();
            let whileEnd = Lbl.newLbl();

            const codeWhile = new Code();
            codeWhile.setPointer(Tmp.newTmp());
            codeWhile.appendValueToPointer("0", "control de comparacion");
            codeWhile.appendLabel(whileStart);
            const codeHeapLf = new Code();
            const codeHeapRt = new Code();
            codeHeapLf.setPointer(Tmp.newTmp());
            codeHeapRt.setPointer(Tmp.newTmp());

            codeHeapLf.GetFromHeap(codeLfIndex.getPointer(), "str1 char");
            codeHeapRt.GetFromHeap(codeRtIndex.getPointer(), "str2 char");

            codeWhile.append(codeHeapLf);
            codeWhile.append(codeHeapRt);
            codeWhile.appendJNE(codeHeapLf.getPointer(), codeHeapRt.getPointer(), nonEq, "diferente char, salto a false");


            codeWhile.appendLine(`${codeLfIndex.getPointer()} = ${codeLfIndex.getPointer()} + 1;`, "aumenta indice str1")
            codeWhile.appendLine(`${codeRtIndex.getPointer()} = ${codeRtIndex.getPointer()} + 1;`, "aumenta indice str2");
            codeWhile.appendSuma(codeWhile.getPointer(), "1", "aumento indice control");
            codeWhile.appendJL(codeWhile.getPointer(), codeStrLf.getPointer(), whileStart);
            codeWhile.appendJMP(lbl, "todo bien salto a true");

            codeAns.append(codeWhile);
            codeAns.appendLabel(nonEq);
            codeAns.appendValueToPointer("0");
            codeAns.appendLabel(lbl);
        }else {
            codeAns.appendJE(codeLf.getPointer(), codeRt.getPointer(), lbl);
            codeAns.appendValueToPointer("0");
            codeAns.appendLabel(lbl);
        }


        //TODO tmpmanager ??
        return codeAns;
    }

    constructor(position: any, lf: Op, rt: Op) {
        super(position);
        this.lf = lf;
        this.rt = rt;
    }

    GO(env: Envmnt): object {
        return Igual((this.lf.Exe(env) as Cntnr), (this.rt.Exe(env) as Cntnr), this.position);
    }

    GetGraph(env: Envmnt): GraphvizNode {
        return new GraphvizNode('EQ', [this.lf.GetGraph(env), this.rt.GetGraph(env)]);
    }

    GetTSGraph(): string {
        return "";
    }
}
