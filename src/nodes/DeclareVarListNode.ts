import {Op} from "../utils/Op";
import {Envmnt} from "../utils/Envmnt";
import {DeclareVarNode} from "./DeclareVarNode";
import {Cntnr} from "../utils/Cntnr";
import {UNDEFINED} from "../utils/PrimitiveTypoContainer";
import {GraphvizNode} from "../utils/GraphvizNode";

export class DeclareVarListNode extends Op {
    private readonly tipoNombre: string;
    private readonly value: Op;
    private readonly declarationOps: Array<Op>;
    private readonly isConst: boolean;

    constructor(position: any, tipoNombre: string, declarationOps: Array<Op>, value?: Op, isConst: boolean = false) {
        super(position);
        this.tipoNombre = tipoNombre;
        this.declarationOps = declarationOps;
        this.value = value || null;
        this.isConst = isConst;
    }

    GO(env: Envmnt): object {
        for (let op of this.declarationOps) {
            try {
                if (this.value !== null) {
                    (op as DeclareVarNode).AddValue(this.value.Exe(env) as Cntnr, this.isConst, this.tipoNombre);
                }else{
                    (op as DeclareVarNode).AddValue(new UNDEFINED(), this.isConst, this.tipoNombre);
                }
                op.Exe(env);
            } catch (e) {
                console.log(e.message);
            }
        }
        return null;
    }

    GetGraph(env: Envmnt): GraphvizNode {
        return new GraphvizNode('DECLARE_VAR_LIST', [new GraphvizNode(this.tipoNombre? this.tipoNombre: 'ANY'), this.value === null ? new GraphvizNode('UNDEFINED') : this.value.GetGraph(env)]
            .concat(this.declarationOps.map(op => op.GetGraph(env))));
    }

    GetTSGraph(): string {
        let val = '';
        this.declarationOps.forEach(declare => {
            val += declare.GetTSGraph();
        });
        return val;
    }
}
