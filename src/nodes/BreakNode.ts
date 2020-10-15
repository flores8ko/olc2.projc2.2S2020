import {Op} from "../utils/Op";
import {Envmnt} from "../utils/Envmnt";
import {BreakObj} from "./BreakObj";
import {GraphvizNode} from "../utils/GraphvizNode";

export  class BreakNode extends Op{
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
