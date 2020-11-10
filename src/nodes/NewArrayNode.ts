import { Op } from "../utils/Op";
import {GraphvizNode} from "../utils/GraphvizNode";
import {Code} from "../utils/C3D/Code";
import {Reference} from "../utils/Reference";
import {ARRAY, NUMBER, UNDEFINED} from "../utils/PrimitiveTypoContainer";
import {GetReferenceValueCode, SemanticException} from "../utils/Utils";
import {Envmnt} from "../utils/Envmnt";
import {Tmp} from "../utils/C3D/Tmp";
import {Cntnr} from "../utils/Cntnr";

export class NewArrayNode extends Op{
    private readonly size: Op;

    constructor(position: any, size: Op) {
        super(position);
        this.size = size;
    }

    GO(env: Envmnt): object {
        let sizeVal = this.size.Exe(env);
        if (sizeVal instanceof Reference) {
            sizeVal = (sizeVal as Reference).getValue();
        }

        if (!(sizeVal instanceof NUMBER)) {
            throw new SemanticException("Se esperaba un valor numerico como argumento");
        }

        let vals = new Array<Reference>();
        for (let i = 0; i < sizeVal.getValue(); i++) {
            vals.push(new Reference());
        }

        return new ARRAY(vals);
    }

    GOCode(env: Envmnt): Code {
        const codeAns = new Code();
        codeAns.appendSplitComment("satart Declaración de Arreglo");


        let size = this.size.ExeCode(env);
        size = GetReferenceValueCode(size);
        let sizeVal = size.getValue();
        if (!(sizeVal instanceof NUMBER)) {
            throw new SemanticException("Se esperaba un valor numerico como argumento");
        }
        codeAns.append(size);


        const codeHeap = new Code();
        codeHeap.setPointer(Tmp.newTmp());
        codeHeap.appendValueToPointer("H");

        const codeValues = new Code();
        codeValues.setPointer(Tmp.newTmp());
        codeValues.appendValueToPointer(codeHeap.getPointer());


        let real = new Array<Cntnr>();
        for (let i = 0; i<sizeVal.getValue(); i++) {
            let reference = new Reference();
            real.push(reference);
            const codeVal = new Code();
            codeVal.setPointer(Tmp.newTmp());
            codeVal.appendValueToPointer("-1");
            codeVal.setValue(new UNDEFINED());
            codeValues.append(codeVal);
            codeValues.appendAsignToHeapPosition(codeValues.getPointer(), codeVal.getPointer());
            codeValues.appendSuma(codeValues.getPointer(), "1", "next position");
        }

        let value = new ARRAY(real);

        //TODO array memory size calculate and use
        let memorySize = (value as ARRAY).GetLinearMemorySize();
        codeHeap.appendAddToHeapPointer(memorySize, "tamaño de arreglo");
        codeAns.append(codeHeap);
        codeAns.append(codeValues);
        codeAns.setValue(value as ARRAY);
        codeAns.appendSplitComment("end Declaración de Arreglo");
        codeAns.setPointer(codeHeap.getPointer());
        return codeAns;
    }

    GetGraph(env: Envmnt): GraphvizNode {
        return new GraphvizNode('NEW ARRAY', [this.size.GetGraph(env)]);
    }

    GetTSGraph(): string {
        return "";
    }


}