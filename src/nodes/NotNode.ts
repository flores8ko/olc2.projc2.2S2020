import {Op} from "../utils/Op";
import {Envmnt} from "../utils/Envmnt";
import {Not} from "../utils/LogicalOperationsFunctions";
import {Cntnr} from "../utils/Cntnr";
import {GraphvizNode} from "../utils/GraphvizNode";
import { Code } from "../utils/C3D/Code";
import {GetReferenceValueCode} from "../utils/Utils";
import {Lbl} from "../utils/C3D/Lbl";
import {Tmp} from "../utils/C3D/Tmp";

export class NotNode extends Op {
    private readonly lf: Op;

    public GOCode(env: Envmnt): Code {
        const codeRt = GetReferenceValueCode(this.lf.ExeCode(env));

        const lbl1 = Lbl.newLbl();

        const codeAns = new Code(codeRt);
        codeAns.appendSplitComment("not start");
        codeAns.setPointer(Tmp.newTmp());
        codeAns.appendValueToPointer("0");
        codeAns.appendJE(codeRt.getPointer(), "1", lbl1);
        codeAns.appendValueToPointer("1");
        codeAns.appendLabel(lbl1);
        codeAns.appendSplitComment("not end");

        codeAns.setValue(Not(codeRt.getValue()));

        //TODO tmpmanager ??;
        return codeAns;
    }

    constructor(position: any, lf: Op, rt: Op) {
        super(position);
        this.lf = lf;
    }

    GO(env: Envmnt): object {
        return Not(this.lf.Exe(env) as Cntnr, this.position);
    }

    GetGraph(env: Envmnt): GraphvizNode {
        return new GraphvizNode('NOT', [this.lf.GetGraph(env)]);
    }

    GetTSGraph(): string {
        return "";
    }
}
