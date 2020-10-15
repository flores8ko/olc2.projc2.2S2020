import {Op} from "../utils/Op";
import { Envmnt } from "../utils/Envmnt";
import {Reference} from "../utils/Reference";
import {Cntnr} from "../utils/Cntnr";
import {FunctionRepresent} from "../utils/functions/FunctionRepresent";
import {ReturnObj} from "./ReturnObj";
import {GraphvizNode} from "../utils/GraphvizNode";

export class CreateObjFunNode extends Op{
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
