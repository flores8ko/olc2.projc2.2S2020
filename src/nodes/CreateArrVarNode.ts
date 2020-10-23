import {Op} from "../utils/Op";
import {Envmnt} from "../utils/Envmnt";
import {Cntnr} from "../utils/Cntnr";
import {Reference} from "../utils/Reference";
import {GetReferenceValueCode, SemanticException} from "../utils/Utils";
import {ARRAY, NUMBER, STRING, UNDEFINED} from "../utils/PrimitiveTypoContainer";
import {GraphvizNode} from "../utils/GraphvizNode";
import { Code } from "../utils/C3D/Code";
import {Tmp} from "../utils/C3D/Tmp";

export class CreateArrVarNode extends Op {
    private readonly id: Op;
    private readonly index: Op;

    constructor(position: any, id: Op, index: Op) {
        super(position);
        this.id = id;
        this.index = index;
    }

    public GOCode(env: Envmnt): Code {
        let codeVar = new Code();
        codeVar.setPointer(Tmp.newTmp());


        let idRefVal = this.id.Exe(env) as Cntnr;
        let idRefCode = this.id.ExeCode(env);

        let index = this.index.Exe(env) as Cntnr;
        let indexCode = this.index.ExeCode(env);

        if (index instanceof Reference) {
            index = (index as Reference).getValue();
        }

        if (index instanceof STRING) {
            const val = parseInt((index as STRING).getValue());
            if (isNaN(val)) {
                throw new SemanticException("El indice para accesar debe ser de tipo NUMBER", this.position);
            }
            index = new NUMBER(val);
        }

        if (!(index instanceof NUMBER)) {
            throw new SemanticException("El indice para accesar debe ser de tipo NUMBER", this.position);
        }

        let ref = idRefVal instanceof Reference ? (idRefVal as Reference).getValue() : idRefVal;
        idRefCode = GetReferenceValueCode(idRefCode);

        indexCode = GetReferenceValueCode(indexCode);

        const indexNumberVal = (index as NUMBER).getValue();

        if (!(ref instanceof ARRAY)) {
            codeVar.setValue(new UNDEFINED());
        }else{
            codeVar.setValue((ref as ARRAY).getValue(indexNumberVal) as Cntnr);
        }
        codeVar.append(idRefCode);
        codeVar.appendValueToPointer(idRefCode.getPointer());

        const memberPos = new Code(codeVar);
        memberPos.appendSplitComment("start position code");
        memberPos.append(indexCode);
        memberPos.appendSplitComment("end position code");
        memberPos.setPointer(Tmp.newTmp());
        memberPos.appendSuma(codeVar.getPointer(), indexCode.getPointer(), "ARR position");

        const arrayStart = new Code(memberPos);
        arrayStart.setPointer(Tmp.newTmp());
        arrayStart.appendValueToPointer(memberPos.getPointer());
        arrayStart.setValue(codeVar.getValue());
        arrayStart.isHeap = true;

        //TODO tmpmanager ??
        return arrayStart;
    }

    GO(env: Envmnt): object {
        let idRef = this.id.Exe(env) as Cntnr;
        // if (!(idRef instanceof Reference)) {
        //     throw new SemanticException(`Llamada a Arreglo ${idRef} no definido.`);
        // }

        let index = this.index.Exe(env) as Cntnr;
        if (index instanceof Reference) {
            index = (index as Reference).getValue();
        }

        if (index instanceof STRING) {
            const val = parseInt((index as STRING).getValue());
            if (isNaN(val)) {
                throw new SemanticException("El indice para accesar debe ser de tipo NUMBER", this.position);
            }
            index = new NUMBER(val);
        }

        if (!(index instanceof NUMBER)) {
            throw new SemanticException("El indice para accesar debe ser de tipo NUMBER", this.position);
        }

        let ref = idRef instanceof Reference ? (idRef as Reference).getValue() : idRef;

        if (!(ref instanceof ARRAY)) {
            return new UNDEFINED();
        }

        return (ref as ARRAY).getValue((index as NUMBER).getValue());
    }

    GetGraph(env: Envmnt): GraphvizNode {
        return new GraphvizNode('ARR_ELEMENT', [this.id.GetGraph(env), this.index.GetGraph(env)]);
    }

    GetTSGraph(): string {
        return "";
    }
}
