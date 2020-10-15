import {Op} from "../utils/Op";
import {Envmnt} from "../utils/Envmnt";
import {Reference} from "../utils/Reference";
import {BOOLEAN} from "../utils/PrimitiveTypoContainer";
import {SemanticException} from "../utils/Utils";
import {GraphvizNode} from "../utils/GraphvizNode";

export class SentenceTernaryNode extends Op{
    private readonly condicion: Op;
    private readonly trueSentence: Op;
    private readonly falseSentence: Op;

    constructor(position: any, condition: Op, trueSentence: Op, falseSentence: Op) {
        super(position);
        this.condicion = condition;
        this.trueSentence = trueSentence;
        this.falseSentence = falseSentence;
    }

    GO(env: Envmnt): object {
        let ans = this.condicion.Exe(env);
        if (ans instanceof Reference) {
            ans = (ans as Reference).getValue();
        }

        if (!(ans instanceof BOOLEAN)) {
            throw new SemanticException("Condicion utilizada con parametro no soportada por operador ternario", this.position);
        }

        if ((ans as BOOLEAN).getValue()) {
            return this.trueSentence.Exe(env);
        }
        return this.falseSentence.Exe(env);
    }

    GetGraph(env: Envmnt): GraphvizNode {
        return new GraphvizNode('TERNARY', [this.condicion.GetGraph(env), this.trueSentence.GetGraph(env), this.falseSentence.GetGraph(env)]);
    }

    GetTSGraph(): string {
        return "";
    }

}
