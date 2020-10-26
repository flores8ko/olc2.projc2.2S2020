import {Op} from "../utils/Op";
import {Envmnt} from "../utils/Envmnt";
import {Reference} from "../utils/Reference";
import {GraphvizNode} from "../utils/GraphvizNode";
import {TSGraphControl} from "../utils/TSGraphControl";
import {Code} from "../utils/C3D/Code";

export class DeclareFunParamNode extends Op {
    private readonly name: string;
    private readonly type: string;

    constructor(position: any, name: string, type = 'ANY') {
        super(position);
        this.name = name;
        this.type = type.toUpperCase();
    }

    GetName() {
        return this.name.toUpperCase();
    }

    GO(env: Envmnt): object {
        const reference = new Reference(this.type, false, true);
        env.Declare(this.name, reference);
        return reference;
    }

    public GOCode(env: Envmnt): Code {
        let val = this.GO(env);
        // const codeStack = new Code();
        // codeStack.setPointer(Tmp.newTmp());
        // codeStack.appendStackPointerPlusValue(env.GetPropertyIndex(this.name) + "", this.name);
        //
        // codeAns.append(codeStack);
        // codeAns.appendAsignToStackPosition(codeStack.getPointer(), 0 + "");
        // codeAns.setValue(val as Cntnr);
        return new Code();
    }

    GetGraph(env: Envmnt): GraphvizNode {
        return new GraphvizNode('NEW_FUN_PARAM', [new GraphvizNode(this.name), new GraphvizNode(this.type)]);
    }

    GetTSGraph(): string {
        return `n${TSGraphControl.GetNodeId()} [label="${this.name}"]\n`;;
    }
}
