import {Op} from "../utils/Op";
import {Envmnt} from "../utils/Envmnt";
import {GetReferenceValueCode, LogicDoWhile, SemanticException} from "../utils/Utils";
import {GraphvizNode} from "../utils/GraphvizNode";
import {TSGraphControl} from "../utils/TSGraphControl";
import { Code } from "../utils/C3D/Code";
import {BOOLEAN} from "../utils/PrimitiveTypoContainer";
import {Lbl} from "../utils/C3D/Lbl";

export class DoWhileNode extends Op {
    private readonly condition: Op;
    private readonly sentences: Array<Op>;

    constructor(position: any, condition: Op, sentences: Array<Op>) {
        super(position);
        this.condition = condition;
        this.sentences = sentences;
    }

    public GOCode(env: Envmnt): Code {

        const startLbl = Lbl.newLbl(); //while start lbl
        const endLbl = Lbl.newLbl(); // while end lbl
        const codeWhile = new Code();
        codeWhile.appendSplitComment("WHILE START");
        codeWhile.appendLabel(startLbl);


        const envWhile = new Envmnt(env, this.sentences, startLbl, endLbl);
        //Utils.PassPropsAndFuncs(env, envWhile);
        const whileCode = envWhile.GO_ALL_CODE();
        codeWhile.append(whileCode);
        codeWhile.appendLabel(endLbl);
        const cond = GetReferenceValueCode(this.condition.ExeCode(env));
        if(!(cond.getValue() instanceof BOOLEAN))
            throw new SemanticException("condicion utilizada como parametro no soportada por sentencia while");

        codeWhile.append(cond);
        codeWhile.appendJE(cond.getPointer(), "1", startLbl);
        codeWhile.appendSplitComment("WHILE END");

        return codeWhile;
    }

    GO(env: Envmnt): object {
        return LogicDoWhile(env, this.condition, this.sentences, null);
    }

    GetGraph(env: Envmnt): GraphvizNode {
        return new GraphvizNode('DO_WHILE', [new GraphvizNode('WHILE_BODY', this.sentences.map(sentence => sentence.GetGraph(env))), this.condition.GetGraph(env)]);
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
        value += `label = "${"DO_WHILE_SENTENCE"}";\n`;
        value += `}\n`;
        return value;
    }
}
