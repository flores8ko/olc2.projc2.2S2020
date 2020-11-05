import {Op} from "../utils/Op";
import {Envmnt} from "../utils/Envmnt";
import {Cntnr} from "../utils/Cntnr";
import {Reference} from "../utils/Reference";
import {GetReferenceValueCode, SemanticException} from "../utils/Utils";
import {FunctionRepresent} from "../utils/functions/FunctionRepresent";
import {ReturnObj} from "./ReturnObj";
import {GraphvizNode} from "../utils/GraphvizNode";
import { Code } from "../utils/C3D/Code";
import {Tmp} from "../utils/C3D/Tmp";
import {Native} from "../utils/functions/Native";

export class CreateObjVarNode extends Op {
    private readonly id: Op;
    private readonly attr: string;

    constructor(position: any, id: Op, attr: string) {
        super(position);
        this.id = id;
        this.attr = attr;
    }

    public GOCode(env: Envmnt): Code {
        //TODO NATIVE CALL
        const codeAns = new Code();
        codeAns.setPointer(Tmp.newTmp());
        let idCode = this.id.ExeCode(env);
        idCode = GetReferenceValueCode(idCode);

        let ref = idCode.getValue();
        let vl = ref.GetProperty(this.attr);
        if (vl instanceof Native) {
            console.log(idCode);
            return vl.GetC3DCode(env, "", idCode);
        }
        let e = ref.GetPropertyIndex(this.attr)[0];

        const codeVar = new Code(idCode);
        codeVar.setPointer(Tmp.newTmp());
        codeVar.appendSuma(idCode.getPointer(), e+"", "property index");

        codeAns.append(codeVar);
        codeAns.appendValueToPointer(codeVar.getPointer(), `obtiene ${this.attr}`);
        codeAns.setValue(vl);
        codeAns.isHeap = true;

        return codeAns;
    }

    GO(env: Envmnt): object {
        let id = this.id.Exe(env) as Cntnr;
        if (!(id instanceof Reference)) {
            throw new SemanticException("Llamada a Objeto no definido", this.position);
        }

        let ref = (id as Reference).getValue();
        let e = ref.GetProperty(this.attr);
        if (e instanceof FunctionRepresent) {
            let ans = e.EXE(env, new Array<Cntnr>());
            if (ans instanceof ReturnObj) {
                return (ans as ReturnObj).getValue();
            }
        }

        return ref.GetProperty(this.attr);
    }

    GetGraph(env: Envmnt): GraphvizNode {
        return new GraphvizNode('TYPE_MEMBER', [this.id.GetGraph(env), new GraphvizNode(this.attr)]);
    }

    GetTSGraph(): string {
        return "";
    }
}
