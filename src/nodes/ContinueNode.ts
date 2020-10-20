import {Op} from "../utils/Op";
import {Envmnt} from "../utils/Envmnt";
import {ContinueObj} from "./ContinueObj";
import {GraphvizNode} from "../utils/GraphvizNode";
import { Code } from "../utils/C3D/Code";
import {ContinueObjCode} from "./ContinueObjCode";

export class ContinueNode extends Op {
    GO(env: Envmnt): object {
        return new ContinueObj();
    }

    public GOCode(env: Envmnt): Code {
        return new ContinueObjCode(env.StartLabel);
    }

    GetGraph(env: Envmnt): GraphvizNode {
        return new GraphvizNode('CONTINUE', [new GraphvizNode('continue')]);
    }

    GetTSGraph(): string {
        return "";
    }
}
