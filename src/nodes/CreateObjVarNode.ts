import {Op} from "../utils/Op";
import {Envmnt} from "../utils/Envmnt";
import {Cntnr} from "../utils/Cntnr";
import {Reference} from "../utils/Reference";
import {SemanticException} from "../utils/Utils";
import {FunctionRepresent} from "../utils/functions/FunctionRepresent";
import {ReturnObj} from "./ReturnObj";
import {GraphvizNode} from "../utils/GraphvizNode";

export class CreateObjVarNode extends Op{
    private readonly id: Op;
    private readonly attr: string;

    constructor(position: any, id: Op, attr: string) {
        super(position);
        this.id = id;
        this.attr = attr;
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
