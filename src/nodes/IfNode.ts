import {Op} from "../utils/Op";
import {Envmnt} from "../utils/Envmnt";
import {BOOLEAN} from "../utils/PrimitiveTypoContainer";
import {Reference} from "../utils/Reference";
import {PassPropsAndFuncs, SemanticException} from "../utils/Utils";
import {GraphvizNode} from "../utils/GraphvizNode";
import {TSGraphControl} from "../utils/TSGraphControl";

export class IfNode extends Op{
    private readonly condition: Op;
    private readonly operationsTrue: Array<Op>;
    private readonly operationsFalse: Array<Op>;

    constructor(position: any, condition: Op, operationsTrue: Array<Op>, operationsFalse: Array<Op>) {
        super(position);
        this.condition = condition;
        this.operationsTrue = operationsTrue;
        this.operationsFalse = operationsFalse;
    }

    GO(env: Envmnt): object {
        let condition = this.condition.Exe(env);
        if (condition instanceof Reference) {
            condition = (condition as Reference).getValue();
        }
        if(!(condition instanceof BOOLEAN)){
            throw new SemanticException("Condicion utilizada como parametro no soportada por sentencia If", this.position);
        }

        if (condition.getValue()) {
            const envTrue = new Envmnt(env, this.operationsTrue);
            PassPropsAndFuncs(env, envTrue);
            return envTrue.GO_ALL();
        }

        const envFalse = new Envmnt(env, this.operationsFalse);
        PassPropsAndFuncs(env, envFalse);
        return envFalse.GO_ALL();
    }

    GetGraph(env: Envmnt): GraphvizNode {
        return new GraphvizNode('IF', [
            this.condition.GetGraph(env),
            new GraphvizNode('IF_BODY_TRUE', this.operationsTrue.map(sentence => sentence.GetGraph(env))),
            new GraphvizNode('IF_BODY_FALSE', this.operationsFalse.map(sentence => sentence.GetGraph(env)))
        ]);
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


        value += `subgraph cluster_${TSGraphControl.GetGraphId()} { \n`;
        value += 'style=filled;\n' +
            'color=black;\n' +
            'fillcolor="yellow";\n';
        value += 'node [fillcolor="yellow" shape="rectangle"] \n';
        this.operationsTrue.forEach(sentence => {
            value += sentence.GetTSGraph();
        });
        value += `label = "${"IF_SENTENCE_TRUE"}";\n`;
        value += `}\n`;

        value += `subgraph cluster_${TSGraphControl.GetGraphId()} { \n`;
        value += 'style=filled;\n' +
            'color=black;\n' +
            'fillcolor="yellow";\n';
        value += 'node [fillcolor="yellow" shape="rectangle"] \n';
        this.operationsFalse.forEach(sentence => {
            value += sentence.GetTSGraph();
        });
        value += `label = "${"IF_SENTENCE_FALSE"}";\n`;
        value += `}\n`;


        value += `label = "${"IF_SENTENCE"}";\n`;
        value += `}\n`;
        return value;
    }
}
