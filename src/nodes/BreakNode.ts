import {Op} from "../utils/Op";
import {Envmnt} from "../utils/Envmnt";
import {BreakObj} from "./BreakObj";
import {GraphvizNode} from "../utils/GraphvizNode";
import { Code } from "../utils/C3D/Code";

export class BreakNode extends Op {
    public GOCode(env: Envmnt): Code {
        throw new Error("Method not implemented.");
    }
    GO(env: Envmnt): object {
        return new BreakObj();
    }
    GetGraph(env: Envmnt): GraphvizNode {
        return new GraphvizNode('BREAK', [new GraphvizNode('break')]);
    }

    GetTSGraph(): string {
        return "";
    }
}
