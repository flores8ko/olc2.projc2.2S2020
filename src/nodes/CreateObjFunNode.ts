import {Op} from "../utils/Op";
import { Envmnt } from "../utils/Envmnt";
import {Reference} from "../utils/Reference";
import {Cntnr} from "../utils/Cntnr";
import {FunctionRepresent} from "../utils/functions/FunctionRepresent";
import {ReturnObj} from "./ReturnObj";
import {GraphvizNode} from "../utils/GraphvizNode";
import { Code } from "../utils/C3D/Code";
import {Native} from "../utils/functions/Native";
import {GetReferenceValueCode} from "../utils/Utils";

export class CreateObjFunNode extends Op {
    public GOCode(env: Envmnt): Code {
        let idCode = this.object.ExeCode(env);
        idCode = GetReferenceValueCode(idCode);

        let ref = idCode.getValue();

        let vl = (ref as Cntnr).GetProperty(this.funId);
        if (!(vl instanceof FunctionRepresent)) {
            throw new Error(`No existe la funcion ${this.funId}`);
        }

        const codes = new Array<Code>();
        for (let arg of this.args) {
            let argValue = arg.ExeCode(env);
            argValue = GetReferenceValueCode(argValue);
            codes.push(argValue);
        }
        codes.push(idCode);

        if (vl instanceof Native) {
            return vl.GetC3DCode(env, "", idCode, ...codes);
        }

    }
    private readonly object: Op;
    private readonly funId: string;
    private readonly args: Array<Op>;

    constructor(position: any, object: Op, funId: string, args: Array<Op>) {
        super(position);
        this.object = object;
        this.funId = funId;
        this.args = args;
    }

    GO(env: Envmnt): object {
        let refe = this.object.Exe(env);
        if (refe instanceof Reference) {
            refe = (refe as Reference).getValue();
        }

        let fun = (refe as Cntnr).GetProperty(this.funId);
        if (!(fun instanceof FunctionRepresent)) {
            return null;
        }

        const references = new Array<Cntnr>();
        for (let arg of this.args) {
            let argValue = arg.Exe(env);
            if (argValue instanceof Reference) {
                argValue = (argValue as Reference).getValue();
            }
            references.push(argValue as Cntnr);
        }

        let ans = fun.EXE(env, references);
        if (ans instanceof ReturnObj) {
            return (ans as ReturnObj).getValue();
        }
        return null;
    }

    GetGraph(env: Envmnt): GraphvizNode {
        return new GraphvizNode('FUNCTION', [this.object.GetGraph(env), new GraphvizNode(this.funId), new GraphvizNode('ARGS', this.args.map(arg => arg.GetGraph(env)))]);
    }

    GetTSGraph(): string {
        return "";
    }
}
