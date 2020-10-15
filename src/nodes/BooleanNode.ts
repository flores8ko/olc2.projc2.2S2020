import {Op} from "../utils/Op";
import {Envmnt} from "../utils/Envmnt";
import {BOOLEAN} from "../utils/PrimitiveTypoContainer";
import {GraphvizNode} from "../utils/GraphvizNode";

export class BooleanNode extends Op{
    private readonly val: boolean;

    constructor(position: any, val: boolean) {
        super(position);
        this.val = val;
    }

    GO(env: Envmnt) {
        return new BOOLEAN(this.val);
    }

    GetGraph(env: Envmnt): GraphvizNode {
        return new GraphvizNode('BOOLEAN', [new GraphvizNode(this.val + '', [])]);
    }

    GetTSGraph(): string {
        return "";
    }
}
