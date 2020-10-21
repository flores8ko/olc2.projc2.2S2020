import {Op} from "../utils/Op";
import {Envmnt} from "../utils/Envmnt";
import {BOOLEAN} from "../utils/PrimitiveTypoContainer";
import {Reference} from "../utils/Reference";
import {GetReferenceValueCode, PassPropsAndFuncs, SemanticException} from "../utils/Utils";
import {GraphvizNode} from "../utils/GraphvizNode";
import {TSGraphControl} from "../utils/TSGraphControl";
import { Code } from "../utils/C3D/Code";
import {Lbl} from "../utils/C3D/Lbl";

export class IfNode extends Op {
    private readonly condition: Op;
    private readonly operationsTrue: Array<Op>;
    private readonly operationsFalse: Array<Op>;

    constructor(position: any, condition: Op, operationsTrue: Array<Op>, operationsFalse: Array<Op>) {
        super(position);
        this.condition = condition;
        this.operationsTrue = operationsTrue;
        this.operationsFalse = operationsFalse;
    }

    public GOCode(env: Envmnt): Code {
        const cond = GetReferenceValueCode(this.condition.ExeCode(env));
        if(!(cond.getValue() instanceof BOOLEAN))
            throw new SemanticException("condicion utilizada como parametro no soportada por sentencia if");

        const codeIf = new Code(cond);
        const lblStart = Lbl.newLbl();
        const lblEnd = Lbl.newLbl();
        const lblFalse = Lbl.newLbl();
        codeIf.appendJE(cond.getPointer(), "0", lblFalse, "IF START"); // if condition value == 0 then jmp to lblFalse

        //true Sentences
        const evTrue = new Envmnt(env, this.operationsTrue);
        //Utils.PassPropsAndFuncs(env, evTrue);
        const codeTrue = evTrue.GO_ALL_CODE();
        codeIf.appendSplitComment("true statements");
        codeIf.append(codeTrue);
        codeIf.appendJMP(lblEnd);

        //false Sentences
        const evFalse = new Envmnt(env, this.operationsFalse);
        //Utils.PassPropsAndFuncs(env, evFalse);
        const codeFalse = evFalse.GO_ALL_CODE();
        codeIf.appendSplitComment("false statements");
        codeIf.appendLabel(lblFalse);
        codeIf.append(codeFalse);
        codeIf.appendLabel(lblEnd, "IF END");

        //TODO validate return, continue, break
        //TmpManager.FilterLines(codeIf.getLines());
        return codeIf;
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
