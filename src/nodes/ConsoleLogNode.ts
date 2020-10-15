import {Op} from "../utils/Op";
import {Envmnt} from "../utils/Envmnt";
import {Reference} from "../utils/Reference";
import {Console} from "../utils/Console";
import {GraphvizNode} from "../utils/GraphvizNode";

export class ConsoleLogNode extends Op{
    private expression: Array<Op>;

    constructor(position: any, expression: Array<Op>) {
        super(position);
        this.expression = expression;
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
