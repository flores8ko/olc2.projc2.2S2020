import {Envmnt} from "../utils/Envmnt";
import {NUMBER} from "../utils/PrimitiveTypoContainer";
import {Op} from "../utils/Op";
import {GraphvizNode} from "../utils/GraphvizNode";

export class NumberNode extends Op{
    private readonly val: number;

    constructor(position: any, val: number) {
        super(position);
        this.val = val;
    }

    GO(env: Envmnt){
        return new NUMBER(this.val);
    }

    GetGraph(env: Envmnt): GraphvizNode {
        return new GraphvizNode('NUMBER', [new GraphvizNode(this.val + '')]);
    }

    GetTSGraph(): string {
        return "";
    }
}
