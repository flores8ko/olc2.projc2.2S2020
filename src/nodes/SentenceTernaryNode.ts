import {Op} from "../utils/Op";
import {Envmnt} from "../utils/Envmnt";
import {Reference} from "../utils/Reference";
import {BOOLEAN} from "../utils/PrimitiveTypoContainer";
import {GetReferenceValueCode, SemanticException} from "../utils/Utils";
import {GraphvizNode} from "../utils/GraphvizNode";
import { Code } from "../utils/C3D/Code";
import { Lbl } from "../utils/C3D/Lbl";
import {Tmp} from "../utils/C3D/Tmp";

export class SentenceTernaryNode extends Op {
    private readonly condicion: Op;
    private readonly trueSentence: Op;
    private readonly falseSentence: Op;

    constructor(position: any, condition: Op, trueSentence: Op, falseSentence: Op) {
        super(position);
        this.condicion = condition;
        this.trueSentence = trueSentence;
        this.falseSentence = falseSentence;
    }

    public GOCode(env: Envmnt): Code {
        const cond = GetReferenceValueCode(this.condicion.ExeCode(env));
        if(!(cond.getValue() instanceof BOOLEAN))
            throw new SemanticException("condicion utilizada como parametro no soportada por sentencia if");

        const codeTernary = new Code(cond);
        codeTernary.setPointer(Tmp.newTmp());
        codeTernary.appendSplitComment("Start Ternary");
        const lblEnd = Lbl.newLbl();
        const lblFalse = Lbl.newLbl();
        codeTernary.appendJE(cond.getPointer(), "0", lblFalse);

        codeTernary.appendSplitComment("Start True Sentence");
        let codeTrue = this.trueSentence.ExeCode(env);
        codeTrue = GetReferenceValueCode(codeTrue);
        codeTernary.append(codeTrue);
        codeTernary.appendValueToPointer(codeTrue.getPointer());
        codeTernary.appendJMP(lblEnd);
        codeTernary.appendSplitComment("End True Sentence");

        codeTernary.appendLabel(lblFalse);
        codeTernary.appendSplitComment("Start False Sentence");
        let codeFalse = this.falseSentence.ExeCode(env);
        codeFalse = GetReferenceValueCode(codeFalse);
        codeTernary.append(codeFalse);
        codeTernary.appendValueToPointer(codeFalse.getPointer());
        codeTernary.appendSplitComment("End False Sentence");

        codeTernary.appendLabel(lblEnd);
        codeTernary.appendSplitComment("End Ternary");

        return codeTernary;
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
