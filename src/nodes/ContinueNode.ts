import {Op} from "../utils/Op";
import {Envmnt} from "../utils/Envmnt";
import {ContinueObj} from "./ContinueObj";
import {GraphvizNode} from "../utils/GraphvizNode";

export class ContinueNode extends Op{
    GO(env: Envmnt): object {
        return new ContinueObj();
    }

    GetGraph(env: Envmnt): GraphvizNode {
        return new GraphvizNode('CONTINUE', [new GraphvizNode('continue')]);
    }

    GetTSGraph(): string {
        return "";
    }
}
