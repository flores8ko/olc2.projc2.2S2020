import {Op} from "../utils/Op";
import {Envmnt} from "../utils/Envmnt";
import {NULL} from "../utils/PrimitiveTypoContainer";
import {GraphvizNode} from "../utils/GraphvizNode";
import { Code } from "../utils/C3D/Code";

export class NullNode extends Op {
    constructor() {
        super();
    }

    public GOCode(env: Envmnt): Code {
        const code = new Code();
        code.setValue(new NULL());
        code.setPointer(0);

        //TODO tmpmanager ???
        return code;
    }

    GO(env: Envmnt) {
        return new NULL();
    }

    GetGraph(env: Envmnt): GraphvizNode {
        return new GraphvizNode('NULL', [new GraphvizNode('null')]);
    }

    GetTSGraph(): string {
        return "";
    }
}
