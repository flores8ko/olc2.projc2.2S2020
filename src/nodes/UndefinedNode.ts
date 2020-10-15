import {Op} from "../utils/Op";
import {Envmnt} from "../utils/Envmnt";
import {UNDEFINED} from "../utils/PrimitiveTypoContainer";
import {GraphvizNode} from "../utils/GraphvizNode";

export class UndefinedNode extends Op{
    constructor() {
        super();
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
