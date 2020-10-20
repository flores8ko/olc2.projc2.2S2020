import {Op} from "../utils/Op";
import {Envmnt} from "../utils/Envmnt";
import {GetReferenceValueCode, LogicWhile, SemanticException} from "../utils/Utils";
import {GraphvizNode} from "../utils/GraphvizNode";
import {TSGraphControl} from "../utils/TSGraphControl";
import { Code } from "../utils/C3D/Code";
import {BOOLEAN} from "../utils/PrimitiveTypoContainer";
import {Lbl} from "../utils/C3D/Lbl";

export class WhileNode extends Op {
    private readonly condition: Op;
    private readonly sentences: Array<Op>;

    constructor(position: any, condition: Op, sentences: Array<Op>) {
        super(position);
        this.condition = condition;
        this.sentences = sentences;
    }

    public GOCode(env: Envmnt): Code {
        const cond = GetReferenceValueCode(this.condition.ExeCode(env));
        if(!(cond.getValue() instanceof BOOLEAN))
            throw new SemanticException("condicion utilizada como parametro no soportada por sentencia if");

        const startLbl = Lbl.newLbl(); //while start lbl
        const endLbl = Lbl.newLbl(); // while end lbl
        const codeWhile = new Code();
        codeWhile.appendSplitComment("WHILE START");
        codeWhile.appendLabel(startLbl);
        codeWhile.append(cond);
        codeWhile.appendJE(cond.getPointer(), "0", endLbl);

        const envWhile = new Envmnt(env, this.sentences, startLbl, endLbl);
        //Utils.PassPropsAndFuncs(env, envWhile);
        const whileCode = envWhile.GO_ALL_CODE();
        codeWhile.append(whileCode);
        codeWhile.appendJMP(startLbl);
        codeWhile.appendLabel(endLbl);
        codeWhile.appendSplitComment("WHILE END");

        return codeWhile;
    }

    GO(env: Envmnt): object {
        return LogicWhile(env, this.condition, this.sentences, null);
    }

    GetGraph(env: Envmnt): GraphvizNode {
        return new GraphvizNode('WHILE', [this.condition.GetGraph(env), new GraphvizNode('WHILE_BODY', this.sentences.map(sentence => sentence.GetGraph(env)))]);
    }

    GetTSGraph(): string {
        let value = '';
        const graphId = TSGraphControl.GetGraphId();
        value += `subgraph cluster_${graphId} { \n`;
        value += 'style=filled;\n' +
            'color="#2BBBAD";\n' +
            'fillcolor="#1E222A";\n';
        value += 'node [color="#2BBBAD" fontcolor="#2BBBAD" shape="rectangle"] \n';
        value += this.condition.GetTSGraph();
        this.sentences.forEach(sentence => {
            value += sentence.GetTSGraph();
        });
        value += `label = "${"WHILE_SENTENCE"}";\n`;
        value += `}\n`;
        return value;
    }
}
