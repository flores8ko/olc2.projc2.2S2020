import {Op} from "../utils/Op";
import {Envmnt} from "../utils/Envmnt";
import {Modulo} from "../utils/AlgebraicOperationsFunctions";
import {Cntnr} from "../utils/Cntnr";
import {GraphvizNode} from "../utils/GraphvizNode";
import { Code } from "../utils/C3D/Code";
import {GetReferenceValueCode} from "../utils/Utils";
import {Tmp} from "../utils/C3D/Tmp";

export class ModNode extends Op {
    private readonly lf: Op;
    private readonly rt: Op;

    public GOCode(env: Envmnt): Code {
        const codeLf = GetReferenceValueCode(this.lf.ExeCode(env));
        const codeRt = GetReferenceValueCode(this.rt.ExeCode(env));

        const codeAns = new Code(codeLf, codeRt);
        codeAns.setPointer(Tmp.newTmp());
        codeAns.appendMod(codeLf.getPointer(), codeRt.getPointer());
        codeAns.setValue(Modulo(codeLf.getValue(), codeRt.getValue()));

        //TODO tmpmanager ??
        return codeAns;
    }

    constructor(position: any, lf: Op, rt: Op) {
        super(position);
        this.lf = lf;
        this.rt = rt;
    }

    GO(env: Envmnt): object {
        return Modulo((this.lf.Exe(env) as Cntnr), (this.rt.Exe(env) as Cntnr), this.position);
    }

    GetGraph(env: Envmnt): GraphvizNode {
        return new GraphvizNode('MOD', [this.lf.GetGraph(env), this.rt.GetGraph(env)]);
    }

    GetTSGraph(): string {
        return "";
    }
}
