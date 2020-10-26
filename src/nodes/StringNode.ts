import {Op} from "../utils/Op";
import {Envmnt} from "../utils/Envmnt";
import {ARRAY, STRING} from "../utils/PrimitiveTypoContainer";
import {GraphvizNode} from "../utils/GraphvizNode";
import { Code } from "../utils/C3D/Code";
import {Tmp} from "../utils/C3D/Tmp";

export class StringNode extends Op {
    private readonly val: string;

    constructor(position: any, val: string) {
        super(position);
        this.val = val.replace(/\\n/g, "&#13;&#10;       ").replace(/\\t/g, "&#9;");
    }

    public GOCode(env: Envmnt): Code {
        const codeAns = new Code();


        codeAns.appendSplitComment("start string asign");
        codeAns.setPointer(Tmp.newTmp());
        codeAns.appendValueToPointer("H", "string start");


        const codePos = new Code();
        codePos.setPointer(Tmp.newTmp());
        codePos.appendSuma(codeAns.getPointer(), 0 + "", "str["+0+"]");
        let newVal = this.val.substring(1, this.val.length - 1);
        let chCode = newVal.length;
        codePos.appendAsignToHeapPosition(codePos.getPointer(), chCode, "str["+0+"]="+chCode+" (strLth)");
        codeAns.append(codePos);
        for(let i = 1; i<=newVal.length; i++){
            const codePos = new Code();
            codePos.setPointer(Tmp.newTmp());
            codePos.appendSuma(codeAns.getPointer(), i + "", "str["+i+"]");
            chCode = newVal.charCodeAt(i-1);
            codePos.appendAsignToHeapPosition(codePos.getPointer(), chCode, "str["+i+"]="+String.fromCharCode(chCode));
            codeAns.append(codePos);
        }

        codeAns.appendAddToHeapPointer(newVal.length+1+"", "string size");
        codeAns.appendSplitComment("end string asign");
        codeAns.setValue(new STRING(newVal));

        //TODO Tmpmanager ??
        return codeAns;
    }

    GO(env: Envmnt) {
        return new STRING(this.val.substring(1, this.val.length - 1));
    }

    GetGraph(env: Envmnt): GraphvizNode {
        return new GraphvizNode('STRING', [new GraphvizNode(this.val.substring(1, this.val.length - 1))]);
    }

    GetTSGraph(): string {
        return "";
    }

}
