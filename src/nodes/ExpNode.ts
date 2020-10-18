import {Op} from "../utils/Op";
import {Envmnt} from "../utils/Envmnt";
import {Potencia} from "../utils/AlgebraicOperationsFunctions";
import {Cntnr} from "../utils/Cntnr";
import {GraphvizNode} from "../utils/GraphvizNode";
import { Code } from "../utils/C3D/Code";
import {GetReferenceValueCode} from "../utils/Utils";
import {Tmp} from "../utils/C3D/Tmp";
import {Lbl} from "../utils/C3D/Lbl";

export class ExpNode extends Op {
    private readonly lf: Op;
    private readonly rt: Op;

    constructor(position: any, lf: Op, rt: Op) {
        super(position);
        this.lf = lf;
        this.rt = rt;
    }

    public GOCode(env: Envmnt): Code {
        const codeLf = GetReferenceValueCode(this.lf.ExeCode(env));
        const codeRt = GetReferenceValueCode(this.rt.ExeCode(env));

        const codeAns = new Code(codeLf, codeRt);
        codeAns.setPointer(Tmp.newTmp());
        const codeControlPot = new Code();
        codeControlPot.setPointer(Tmp.newTmp());
        codeControlPot.appendValueToPointer(codeRt.getPointer(), "temporal para control del ciclo de potencia");
        codeAns.append(codeControlPot);
        const lbl = Lbl.newLbl();
        const lblEnd = Lbl.newLbl();
        codeAns.appendValueToPointer(1);
        codeAns.appendJE(codeControlPot.getPointer(), "0", lblEnd);
        codeAns.appendLabel(lbl, "ciclo para realizar potencia");
        codeAns.appendMulti(codeAns.getPointer(), codeLf.getPointer());
        const codeControlRef = new Code();
        codeControlRef.setPointer(codeControlPot.getPointer());
        codeControlRef.appendResta(codeControlRef.getPointer(), "1");
        codeAns.append(codeControlRef);
        codeAns.appendJG(codeControlPot.getPointer(), "0", lbl, "retorna a ciclo para poetencia");
        codeAns.appendLabel(lblEnd);
        codeAns.setValue(Potencia(codeLf.getValue(), codeRt.getValue()));
        return codeAns;
    }

    GO(env: Envmnt): object {
        return Potencia((this.lf.Exe(env) as Cntnr), (this.rt.Exe(env) as Cntnr), this.position);
    }

    GetGraph(env: Envmnt): GraphvizNode {
        return new GraphvizNode('EXP', [this.lf.GetGraph(env), this.rt.GetGraph(env)]);
    }

    GetTSGraph(): string {
        return "";
    }
}
