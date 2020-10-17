import {Op} from "../utils/Op";
import {Envmnt} from "../utils/Envmnt";
import {ContinueObj} from "./ContinueObj";
import {GraphvizNode} from "../utils/GraphvizNode";
import { Code } from "../utils/C3D/Code";

export class ContinueNode extends Op {
    public GOCode(env: Envmnt): Code {
        throw new Error("Method not implemented.");
    }
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
