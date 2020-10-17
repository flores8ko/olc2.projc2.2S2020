import {Op} from "../utils/Op";
import {Cntnr} from '../utils/Cntnr';
import {Envmnt} from "../utils/Envmnt";
import {ARRAY, NULL, NUMBER, UNDEFINED} from "../utils/PrimitiveTypoContainer";
import {Reference} from "../utils/Reference";
import {GraphvizNode} from "../utils/GraphvizNode";
import {TSGraphControl} from "../utils/TSGraphControl";
import { Code } from "../utils/C3D/Code";
import {Tmp} from "../utils/C3D/Tmp";

export class DeclareVarNode extends Op {
    private readonly name: string;
    private value: Cntnr = new UNDEFINED();
    private valueOp: Op;
    private valueCode: Code = new Code();
    private isConst: boolean;
    private tipoNombre: string;

    constructor(position: any, name: string, value: Op = null) {
        super(position);
        this.name = name;
        this.valueOp = value;
    }

    public GOCode(env: Envmnt): Code {
        this.GO(env);
        const codeAns = new Code();

        if (this.value instanceof NULL) {
            const codeStack = new Code();
            codeStack.setPointer(Tmp.newTmp());
            codeStack.appendStackPointerPlusValue(env.GetPropertyIndex(this.name) + "");

            codeAns.append(codeStack);
            codeAns.appendAsignToStackPosition(codeStack.getPointer(), 0 + "");
            codeAns.setValue(this.value);
            return codeAns;
        }
        if (this.valueOp) {
            const codeStack = new Code();
            codeStack.setPointer(Tmp.newTmp());
            codeStack.appendStackPointerPlusValue(env.GetPropertyIndex(this.name));

            codeAns.append(codeStack);
            codeAns.append(this.valueCode);
            codeAns.appendAsignToStackPosition(codeStack.getPointer(), this.valueCode.getPointer());
            codeAns.setValue(this.value);
            return codeAns;
        }
        if (this.value instanceof ARRAY) {
            codeAns.appendSplitComment("Declaración de Arreglo");
            const codeHeap = new Code();
            codeHeap.setPointer(Tmp.newTmp());
            codeHeap.appendValueToPointer("H");
            //TODO array memory size calculate and use
            codeHeap.appendAddToHeapPointer("100");
            codeAns.append(codeHeap);

            const codeStack = new Code();
            codeStack.setPointer(Tmp.newTmp());
            codeStack.appendStackPointerPlusValue(env.GetPropertyIndex(this.name));

            codeAns.append(codeStack);
            codeAns.appendAsignToStackPosition(codeStack.getPointer(), codeHeap.getPointer());
            codeAns.setValue(this.value);
            return codeAns;
        }
        return codeAns;
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
            this.valueCode = this.valueOp.ExeCode(env);
            this.value = value;
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
