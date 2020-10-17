import {Op} from "../utils/Op";
import {Envmnt} from "../utils/Envmnt";
import {BOOLEAN} from "../utils/PrimitiveTypoContainer";
import {GraphvizNode} from "../utils/GraphvizNode";
import { Code } from "../utils/C3D/Code";

export class BooleanNode extends Op {
    private readonly val: boolean;

    constructor(position: any, val: boolean) {
        super(position);
        this.val = val;
    }

    public GOCode(env: Envmnt): Code {
        const code = new Code();
        code.setValue(new BOOLEAN(this.val));
        code.setPointer(this.val ? 1 : 0);

        //TODO tmpmanager ??
        return code;
    }

    GO(env: Envmnt) {
        return new BOOLEAN(this.val);
    }

    GetGraph(env: Envmnt): GraphvizNode {
        return new GraphvizNode('BOOLEAN', [new GraphvizNode(this.val + '', [])]);
    }

    GetTSGraph(): string {
        return "";
    }
}
