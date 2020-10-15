import {Op} from "../utils/Op";
import {Envmnt} from "../utils/Envmnt";
import {NULL} from "../utils/PrimitiveTypoContainer";
import {GraphvizNode} from "../utils/GraphvizNode";

export class NullNode extends Op{
    constructor() {
        super();
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
