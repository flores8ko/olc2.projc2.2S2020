import {Op} from "../utils/Op";
import {Envmnt} from "../utils/Envmnt";
import {Cntnr} from "../utils/Cntnr";
import {Reference} from "../utils/Reference";
import {SemanticException} from "../utils/Utils";
import {ARRAY, NUMBER, STRING, UNDEFINED} from "../utils/PrimitiveTypoContainer";
import {GraphvizNode} from "../utils/GraphvizNode";

export class CreateArrVarNode extends Op {
    private readonly id: Op;
    private readonly index: Op;

    constructor(position: any, id: Op, index: Op) {
        super(position);
        this.id = id;
        this.index = index;
    }

    GO(env: Envmnt): object {
        let idRef = this.id.Exe(env) as Cntnr;
        // if (!(idRef instanceof Reference)) {
        //     throw new SemanticException(`Llamada a Arreglo ${idRef} no definido.`);
        // }

        let index = this.index.Exe(env) as Cntnr;
        if (index instanceof Reference) {
            index = (index as Reference).getValue();
        }

        if (index instanceof STRING) {
            const val = parseInt((index as STRING).getValue());
            if (isNaN(val)) {
                throw new SemanticException("El indice para accesar debe ser de tipo NUMBER", this.position);
            }
            index = new NUMBER(val);
        }

        if (!(index instanceof NUMBER)) {
            throw new SemanticException("El indice para accesar debe ser de tipo NUMBER", this.position);
        }

        let ref = idRef instanceof Reference ? (idRef as Reference).getValue() : idRef;

        if (!(ref instanceof ARRAY)) {
            return new UNDEFINED();
        }

        return (ref as ARRAY).getValue((index as NUMBER).getValue());
    }

    GetGraph(env: Envmnt): GraphvizNode {
        return new GraphvizNode('ARR_ELEMENT', [this.id.GetGraph(env), this.index.GetGraph(env)]);
    }

    GetTSGraph(): string {
        return "";
    }
}
