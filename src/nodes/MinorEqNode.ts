import {Op} from "../utils/Op";
import {Envmnt} from "../utils/Envmnt";
import {MenorEq} from "../utils/RelationalOperationsFunctions";
import {Cntnr} from "../utils/Cntnr";
import {GraphvizNode} from "../utils/GraphvizNode";
import {Position} from "../utils/ErrorsControl";
import { Code } from "../utils/C3D/Code";
import {GetReferenceValueCode} from "../utils/Utils";
import {Tmp} from "../utils/C3D/Tmp";
import {Lbl} from "../utils/C3D/Lbl";

export class MinorEqNode extends Op {
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
        codeAns.appendValueToPointer("1");
        const lbl = Lbl.newLbl();
        codeAns.appendJLE(codeLf.getPointer(), codeRt.getPointer(), lbl);
        codeAns.appendValueToPointer("0");
        codeAns.appendLabel(lbl);

        codeAns.setValue(MenorEq(codeLf.getValue(), codeRt.getValue()));

        //TODO tmpmanager ??
        return codeAns;
    }

    GO(env: Envmnt): object {
        return MenorEq(this.lf.Exe(env) as Cntnr, this.rt.Exe(env) as Cntnr, this.position);
    }

    GetGraph(env: Envmnt): GraphvizNode {
        return new GraphvizNode('MIN_EQ', [this.lf.GetGraph(env), this.rt.GetGraph(env)]);
    }

    GetTSGraph(): string {
        return "";
    }
}
