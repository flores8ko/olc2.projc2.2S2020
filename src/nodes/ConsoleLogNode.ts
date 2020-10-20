import {Op} from "../utils/Op";
import {Envmnt} from "../utils/Envmnt";
import {Reference} from "../utils/Reference";
import {Console} from "../utils/Console";
import {GraphvizNode} from "../utils/GraphvizNode";
import { Code } from "../utils/C3D/Code";
import {GetReferenceValueCode} from "../utils/Utils";

export class ConsoleLogNode extends Op {
    private expression: Array<Op>;

    constructor(position: any, expression: Array<Op>) {
        super(position);
        this.expression = expression;
    }

    public GOCode(env: Envmnt): Code {
        const codeAns = new Code();
        for(let expr of this.expression){
            let codeExpr = expr.ExeCode(env);
            codeExpr = GetReferenceValueCode(codeExpr);
            //System.out.println(codeExpr.getValue().typo);
            codeAns.append(codeExpr.ValueToStringCode());
            codeAns.appendPrintChar(32);
        }
        codeAns.appendPrintChar("'\\n'");
        return codeAns;
    }

    GO(env: Envmnt) : object {
        let finalLog = '[LOG]: ';
        for(let expression of this.expression) {
            let val = expression.Exe(env);
            if (val instanceof Reference) {
                val = (val as Reference).getValue();
            }
            finalLog += `${val} `;
        }
        Console.log += `${finalLog}\n`;
        console.log(`${finalLog}`);
        return null;
    };

    GetGraph(env: Envmnt): GraphvizNode {
        return new GraphvizNode('CONSOLE.LOG', this.expression.map(expression => expression.GetGraph(env)));
    }

    GetTSGraph(): string {
        return "";
    }
}
