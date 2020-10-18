import {Op} from "../utils/Op";
import {Envmnt} from "../utils/Envmnt";
import {Resta} from "../utils/AlgebraicOperationsFunctions";
import {Cntnr} from "../utils/Cntnr";
import {GraphvizNode} from "../utils/GraphvizNode";
import { Code } from "../utils/C3D/Code";
import {GetReferenceValueCode} from "../utils/Utils";
import {Tmp} from "../utils/C3D/Tmp";

export class SubNode extends Op {
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

        var codeAns = new Code(codeLf, codeRt);
        codeAns.setPointer(Tmp.newTmp());
        codeAns.appendResta(codeLf.getPointer(), codeRt.getPointer());
        codeAns.setValue(Resta(codeLf.getValue(), codeRt.getValue()));

        //TODO tmpmanager ??;
        return codeAns;
    }

    GO(env: Envmnt): object {
        return Resta((this.lf.Exe(env) as Cntnr), (this.rt.Exe(env) as Cntnr), this.position);
    }

    GetGraph(env: Envmnt): GraphvizNode {
        return new GraphvizNode('SUB', [this.lf.GetGraph(env), this.rt.GetGraph(env)]);
    }

    GetTSGraph(): string {
        return "";
    }
}
