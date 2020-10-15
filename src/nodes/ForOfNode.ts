import {Op} from "../utils/Op";
import {Envmnt} from "../utils/Envmnt";
import {Reference} from "../utils/Reference";
import {ARRAY} from "../utils/PrimitiveTypoContainer";
import {FindVar, SemanticException} from "../utils/Utils";
import {GraphvizNode} from "../utils/GraphvizNode";
import {TSGraphControl} from "../utils/TSGraphControl";

export class ForOfNode extends Op {
    private readonly controlVar: string;
    private readonly newControlVar: boolean;
    private readonly array: Op;
    private readonly sentences: Array<Op>;

    constructor(position: any, controlVar: string, newControlVar: boolean, array: Op, sentences: Array<Op>) {
        super(position);
        this.controlVar = controlVar;
        this.newControlVar = newControlVar;
        this.array = array;
        this.sentences = sentences;
    }

    GO(env: Envmnt): object {
        let array = this.array.Exe(env);
        if (array instanceof Reference) {
            array = (array as Reference).getValue();
        }
        if (!(array instanceof ARRAY)) {
            throw new SemanticException("Se esperaba una referncia a un arreglo en ciclo For Of", this.position)
        }

        const env0 = new Envmnt(env, this.sentences);
        if (this.newControlVar) {
            env0.AddProperty(this.controlVar, new Reference());
        }

        for (let element of (array as ARRAY).getValueList()) {
            let val = element;
            if (val instanceof Reference) {
                val = (val as Reference).getValue();
            }
            (FindVar(env0, this.controlVar) as Reference).setValue(val);
            env0.GO_ALL();
        }
        return undefined;
    }

    GetGraph(env: Envmnt): GraphvizNode {
        return new GraphvizNode('FOR_OF', [new GraphvizNode(this.controlVar), new GraphvizNode('FOR_OF_BODY', this.sentences.map(sentence => sentence.GetGraph(env)))]);
    }

    GetTSGraph(): string {
        let value = '';
        const graphId = TSGraphControl.GetGraphId();
        value += `subgraph cluster_${graphId} { \n`;
        value += 'style=filled;\n' +
            'color="#2BBBAD";\n' +
            'fillcolor="#1E222A";\n';
        value += 'node [color="#2BBBAD" fontcolor="#2BBBAD" shape="rectangle"] \n';
        value += `n${TSGraphControl.GetNodeId()} [label="${this.controlVar}"]\n`;
        value += this.array.GetTSGraph();
        this.sentences.forEach(sentence => {
            value += sentence.GetTSGraph();
        });
        value += `label = "${"FOR_OF_SENTENCE"}";\n`;
        value += `}\n`;
        return value;
    }
}
