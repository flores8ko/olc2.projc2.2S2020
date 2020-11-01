import {Op} from "../utils/Op";
import {Envmnt} from "../utils/Envmnt";
import {UNDEFINED} from "../utils/PrimitiveTypoContainer";
import {GraphvizNode} from "../utils/GraphvizNode";
import { Code } from "../utils/C3D/Code";

export class UndefinedNode extends Op {
    constructor() {
        super();
    }

    public GOCode(env: Envmnt): Code {
        const code = new Code();
        code.setValue(new UNDEFINED());
        code.setPointer(0);
        return code;
    }

    GO(env: Envmnt) {
        return new UNDEFINED();
    }

    GetGraph(env: Envmnt): GraphvizNode {
        return new GraphvizNode('UNDEFINED', [new GraphvizNode('undefined')]);
    }

    GetTSGraph(): string {
        return "";
    }

}
