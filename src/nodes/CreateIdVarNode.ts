import {Op} from "../utils/Op";
import {Envmnt} from "../utils/Envmnt";
import {FindVar} from "../utils/Utils";
import {GraphvizNode} from "../utils/GraphvizNode";
import { Code } from "../utils/C3D/Code";
import {Tmp} from "../utils/C3D/Tmp";

export class CreateIdVarNode extends Op {
    private readonly id: string;

    constructor(position: any, id: string) {
        super(position);
        this.id = id;
    }

    public GOCode(env: Envmnt): Code {
        const code = new Code();
        code.appendSplitComment(`start obtiene variable: ${this.id}`);
        code.setValue(FindVar(env, this.id));
        code.setPointer(Tmp.newTmp());
        code.appendStackPointerPlusValue(env.GetPropertyIndex(this.id) + "", "obtiene " + this.id);
        code.appendSplitComment(`end obtiene variable: ${this.id}`);
        //TODO tmpmanager ??
        return code;
    }

    public GetId() {
        return this.id;
    }

    GO(env: Envmnt) : object{
        return FindVar(env, this.id);
    }

    GetGraph(env: Envmnt): GraphvizNode {
        return new GraphvizNode('VAR', [new GraphvizNode(this.id)]);
    }

    GetTSGraph(): string {
        return "";
    }
}
