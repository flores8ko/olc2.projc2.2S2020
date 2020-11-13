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

            codeStrLf.setPointer(Tmp.newTmp());
            codeStrRt.setPointer(Tmp.newTmp());

            codeStrLf.GetFromHeap(codeLf.getPointer(), "obtiene tamaño str1");
            codeStrRt.GetFromHeap(codeRt.getPointer(), "obtiene tamaño str2");
            codeAns.append(codeStrLf);
            codeAns.append(codeStrRt);
            codeAns.appendJE(codeStrLf.getPointer(), codeStrRt.getPointer(), lbl, "mismo tamaño");
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
