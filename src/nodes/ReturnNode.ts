import {Op} from "../utils/Op";
import {Envmnt} from "../utils/Envmnt";
import {ReturnObj} from "./ReturnObj";
import {Cntnr} from "../utils/Cntnr";
import {UNDEFINED} from "../utils/PrimitiveTypoContainer";
import {GraphvizNode} from "../utils/GraphvizNode";

export class ReturnNode extends Op{
    private readonly value: Op;

    constructor(position: any, value: Op) {
        super(position);
        this.value = value;
    }

    GO(env: Envmnt): object {
        if(this.value !== null) {
            const value = this.value.Exe(env);
            return new ReturnObj(value as Cntnr);
        }
        return new ReturnObj(new UNDEFINED());
    }

    GetGraph(env: Envmnt): GraphvizNode {
        return new GraphvizNode('RETURN', this.value ? [this.value.GetGraph(env)]: []);
    }

    GetTSGraph(): string {
        return "";
    }

}
