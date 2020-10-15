import {Op} from "../utils/Op";
import {Envmnt} from "../utils/Envmnt";
import {LogicWhile} from "../utils/Utils";
import {GraphvizNode} from "../utils/GraphvizNode";
import {TSGraphControl} from "../utils/TSGraphControl";

export class WhileNode extends Op {
    private readonly condition: Op;
    private readonly sentences: Array<Op>;

    constructor(position: any, condition: Op, sentences: Array<Op>) {
        super(position);
        this.condition = condition;
        this.sentences = sentences;
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
