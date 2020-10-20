import {Op} from "../utils/Op";
import {Envmnt} from "../utils/Envmnt";
import {BreakObj} from "./BreakObj";
import {GraphvizNode} from "../utils/GraphvizNode";
import { Code } from "../utils/C3D/Code";
import {BreakObjCode} from "./BreakObjCode";

export class BreakNode extends Op {
    GO(env: Envmnt): object {
        return new BreakObj();
    }

    public GOCode(env: Envmnt): Code {
        return new BreakObjCode(env.EndLabel);
    }

    GetGraph(env: Envmnt): GraphvizNode {
        return new GraphvizNode('BREAK', [new GraphvizNode('break')]);
    }

    GetTSGraph(): string {
        return "";
    }
}
