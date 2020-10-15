import {Op} from "../utils/Op";
import {Cntnr} from '../utils/Cntnr';
import {Envmnt} from "../utils/Envmnt";
import {UNDEFINED} from "../utils/PrimitiveTypoContainer";
import {Reference} from "../utils/Reference";
import {GraphvizNode} from "../utils/GraphvizNode";
import {TSGraphControl} from "../utils/TSGraphControl";

export class DeclareVarNode extends Op {
    private readonly name: string;
    private value: Cntnr = new UNDEFINED();
    private valueOp: Op;
    private isConst: boolean;
    private tipoNombre: string;

    constructor(position: any, name: string, value: Op = null) {
        super(position);
        this.name = name;
        this.valueOp = value;
    }

    GO(env: Envmnt): object {
        this.AddVarOnDeclare(env, this.name);
        return null;
    }

    public AddValue(value: Cntnr = new UNDEFINED(), isConst: boolean = false, tipoNombre: string = 'ANY') {
        this.value = value;
        this.isConst = isConst;
        if (tipoNombre === '') {
            tipoNombre = 'ANY';
        }
        this.tipoNombre = tipoNombre.toUpperCase();
    }

    private AddVarOnDeclare(env: Envmnt, identifier: string): void {
        let value: Cntnr = this.value;
        if(this.valueOp != null) {
            value = this.valueOp.Exe(env) as Cntnr;
        }
        const reference: Reference = new Reference(this.tipoNombre, this.isConst);
        reference.PutValueOnReference(value);
        env.Declare(identifier, reference);
    }

    GetGraph(env: Envmnt): GraphvizNode {
        return new GraphvizNode('DECLARE_VAR', [new GraphvizNode(this.name), new GraphvizNode(this.tipoNombre?this.tipoNombre:'ANY'),
            this.valueOp !== null ? this.valueOp.GetGraph(env) : new GraphvizNode('undefined')]);
    }

    GetTSGraph(): string {
        return `n${TSGraphControl.GetNodeId()} [label="${this.name}"]\n`;
    }
}
