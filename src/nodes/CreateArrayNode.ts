import { Op } from "../utils/Op";
import {Envmnt} from "../utils/Envmnt";
import {Cntnr} from "../utils/Cntnr";
import {Reference} from "../utils/Reference";
import {ARRAY} from "../utils/PrimitiveTypoContainer";
import {GraphvizNode} from "../utils/GraphvizNode";
import { Code } from "../utils/C3D/Code";
import {Tmp} from "../utils/C3D/Tmp";
import {GetReferenceValueCode} from "../utils/Utils";

export class CreateArrayNode extends Op {
    private readonly vals: Array<Op>;

    constructor(position: any, vals: Array<Op>) {
        super(position);
        this.vals = vals;
    }

    public GOCode(env: Envmnt): Code {
        const codeAns = new Code();
        codeAns.appendSplitComment("satart Declaración de Arreglo");
        const codeHeap = new Code();
        codeHeap.setPointer(Tmp.newTmp());
        codeHeap.appendValueToPointer("H");

        const codeValues = new Code();
        codeValues.setPointer(Tmp.newTmp());
        codeValues.appendValueToPointer(codeHeap.getPointer());

        let real = new Array<Cntnr>();
        for (let op of this.vals) {
            let reference = new Reference();
            reference.PutValueOnReference(op.Exe(env) as Cntnr);
            real.push(reference);

            const codeVal = GetReferenceValueCode(op.ExeCode(env));
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

    GO(env: Envmnt): object {
        let real = new Array<Cntnr>();
        for (let op of this.vals) {
            let reference = new Reference();
            reference.PutValueOnReference(op.Exe(env) as Cntnr);
            real.push(reference);
        }
        return new ARRAY(real);
    }

    GetGraph(env: Envmnt): GraphvizNode {
        return new GraphvizNode('ARRAY', this.vals.map(val => val.GetGraph(env)));
    }

    GetTSGraph(): string {
        return "";
    }
}
