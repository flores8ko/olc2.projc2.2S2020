import {Op} from "../utils/Op";
import {Envmnt} from "../utils/Envmnt";
import {LogicDoWhile} from "../utils/Utils";
import {GraphvizNode} from "../utils/GraphvizNode";
import {TSGraphControl} from "../utils/TSGraphControl";

export class DoWhileNode extends Op {
    private readonly condition: Op;
    private readonly sentences: Array<Op>;

    constructor(position: any, condition: Op, sentences: Array<Op>) {
        super(position);
        this.condition = condition;
        this.sentences = sentences;
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
