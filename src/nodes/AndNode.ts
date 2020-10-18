import { Op } from "../utils/Op";
import {Envmnt} from "../utils/Envmnt";
import {And} from "../utils/LogicalOperationsFunctions";
import {Cntnr} from "../utils/Cntnr";
import {GraphvizNode} from "../utils/GraphvizNode";
import { Code } from "../utils/C3D/Code";
import {GetReferenceValueCode} from "../utils/Utils";
import {Lbl} from "../utils/C3D/Lbl";
import {Tmp} from "../utils/C3D/Tmp";

export class AndNode extends Op {
    private readonly lf: Op;
    private readonly rt: Op;

    public GOCode(env: Envmnt): Code {
        const codeLf = GetReferenceValueCode(this.lf.ExeCode(env));
        const codeRt = GetReferenceValueCode(this.rt.ExeCode(env));

        const lbl1 = Lbl.newLbl();
        const lbl2 = Lbl.newLbl();
        const lbl3 = Lbl.newLbl();

        const codeAns = new Code(codeLf, codeRt);
        codeAns.appendSplitComment("and start");
        codeAns.setPointer(Tmp.newTmp());
        codeAns.appendValueToPointer("1");
        codeAns.appendJE(codeLf.getPointer(), "1", lbl1);
        codeAns.appendJMP(lbl2);
        codeAns.appendLabel(lbl1);
        codeAns.appendJE(codeRt.getPointer(), "1", lbl3);
        codeAns.appendLabel(lbl2);
        codeAns.appendValueToPointer("0");
        codeAns.appendLabel(lbl3);
        codeAns.appendSplitComment("and end");

        codeAns.setValue(And(codeLf.getValue(), codeRt.getValue()));

        //TODO tmpmanager ??
        return codeAns;
    }

    constructor(position: any, lf: Op, rt: Op) {
        super(position);
        this.lf = lf;
        this.rt = rt;
    }

    GO(env: Envmnt): object {
        return And(this.lf.Exe(env) as Cntnr, this.rt.Exe(env) as Cntnr, this.position);
    }

    GetGraph(env: Envmnt): GraphvizNode {
        return new GraphvizNode('AND', [this.lf.GetGraph(env), this.rt.GetGraph(env)]);
    }

    GetTSGraph(): string {
        return "";
    }
}
