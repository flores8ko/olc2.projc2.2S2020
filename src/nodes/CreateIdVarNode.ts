import {Op} from "../utils/Op";
import {Envmnt} from "../utils/Envmnt";
import {FindVar} from "../utils/Utils";
import {GraphvizNode} from "../utils/GraphvizNode";

export class CreateIdVarNode extends Op{
    private readonly id: string;

    constructor(position: any, id: string) {
        super(position);
        this.id = id;
    }

    GO(env: Envmnt) : object{
        return FindVar(env, this.id);
    }

    GetGraph(env: Envmnt): GraphvizNode {
        return new GraphvizNode('VAR', [new GraphvizNode(this.id)]);
    }

    GetTSGraph(): string {
        return "";
    }
}
