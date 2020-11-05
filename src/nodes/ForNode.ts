import {Op} from "../utils/Op";
import {Envmnt} from "../utils/Envmnt";
import {GetReferenceValueCode, LogicWhile, SemanticException} from "../utils/Utils";
import {GraphvizNode} from "../utils/GraphvizNode";
import {TSGraphControl} from "../utils/TSGraphControl";
import { Code } from "../utils/C3D/Code";
import {BOOLEAN} from "../utils/PrimitiveTypoContainer";
import {Lbl} from "../utils/C3D/Lbl";

export class ForNode extends Op {
    private readonly condition0: Op;
    private readonly condition1: Op;
    private readonly condition2: Op;

    private readonly sentences: Array<Op>;
    constructor(position: any, condition0: Op, condition1: Op, condition2: Op, sentences: Array<Op>) {
        super(position);
        this.condition0 = condition0;
        this.condition1 = condition1;
        this.condition2 = condition2;
        this.sentences = sentences;
    }

    public GOCode(env: Envmnt): Code {
        const dec = GetReferenceValueCode(this.condition0.ExeCode(env));

        const cond = GetReferenceValueCode(this.condition1.ExeCode(env));
        if(!(cond.getValue() instanceof BOOLEAN))
            throw new SemanticException("condicion utilizada como parametro no soportada por sentencia while");

        const startLbl = Lbl.newLbl(); //while start lbl
        const endLbl = Lbl.newLbl(); // while end lbl
        const codeWhile = new Code();
        codeWhile.append(dec);
        codeWhile.appendSplitComment("FOR START");
        codeWhile.appendLabel(startLbl);
        codeWhile.append(cond);
        codeWhile.appendJE(cond.getPointer(), "0", endLbl);

        const envWhile = new Envmnt(env, this.sentences.concat(this.condition2), startLbl, endLbl);
        //Utils.PassPropsAndFuncs(env, envWhile);
        const whileCode = envWhile.GO_ALL_CODE();
        codeWhile.append(whileCode);
        codeWhile.appendJMP(startLbl);
        codeWhile.appendLabel(endLbl);
        codeWhile.appendSplitComment("FOR END");

        return codeWhile;
    }


    GO(env: Envmnt): object {
        const conditionEnv = new Envmnt(env, [this.condition0]);
        conditionEnv.GO_ALL();

        LogicWhile(conditionEnv, this.condition1, this.sentences, this.condition2);
        return undefined;
    }

    GetGraph(env: Envmnt): GraphvizNode {
        return new GraphvizNode('FOR', [
            this.condition0.GetGraph(env),
            this.condition1.GetGraph(env),
            this.condition2.GetGraph(env),
            new GraphvizNode('FOR_BODY', this.sentences.map(sentence => sentence.GetGraph(env)))]);
    }

    GetTSGraph(): string {
        let value = '';
        const graphId = TSGraphControl.GetGraphId();
        value += `subgraph cluster_${graphId} { \n`;
        value += 'style=filled;\n' +
            'color="#2BBBAD";\n' +
            'fillcolor="#1E222A";\n';
        value += 'node [color="#2BBBAD" fontcolor="#2BBBAD" shape="rectangle"] \n';
        value += this.condition0.GetTSGraph();
        value += this.condition1.GetTSGraph();
        value += this.condition2.GetTSGraph();
        this.sentences.forEach(sentence => {
            value += sentence.GetTSGraph();
        });
        value += `label = "${"FOR_SENTENCE"}";\n`;
        value += `}\n`;
        return value;
    }

}
