import {Op} from "../utils/Op";
import {Envmnt} from "../utils/Envmnt";
import {Cntnr} from "../utils/Cntnr";
import {Reference} from "../utils/Reference";
import {OBJECT} from "../utils/PrimitiveTypoContainer";
import {GraphvizNode} from "../utils/GraphvizNode";
import { Code } from "../utils/C3D/Code";
import {Tmp} from "../utils/C3D/Tmp";
import {Lbl} from "../utils/C3D/Lbl";
import {GetReferenceValueCode} from "../utils/Utils";

export class CreateObjNode extends Op {
    private readonly attrs: Map<string, Op>;

    constructor(position: any, attrs: Map<string, Op>) {
        super(position);
        this.attrs = attrs;
    }

    public GOCode(env: Envmnt): Code {
        const codeAns = new Code();
        codeAns.setPointer(Tmp.newTmp());
        codeAns.appendSplitComment("start OBJECT INITIALIZATION");
        codeAns.appendValueToPointer("H");
        codeAns.appendAddToHeapPointer(this.attrs.size, "tamaño de objeto");

        const codeClear = new Code();
        codeClear.appendSplitComment("empieza limpiando heap");
        codeClear.setPointer(Tmp.newTmp());
        codeClear.appendValueToPointer("H");
        const lbl = Lbl.newLbl();
        codeClear.appendLabel(lbl);
        codeClear.appendAsignToHeapPosition(codeClear.getPointer(), 0);
        codeClear.appendResta(codeClear.getPointer(), "1");
        codeClear.appendJGE(codeClear.getPointer(), codeAns.getPointer(), lbl);
        codeClear.appendSplitComment("termina limpiar heap")

        codeAns.append(codeClear);

        const real: Map<string, Cntnr> = new Map<string, Cntnr>();
        const codeAsignValues = new Code();
        codeAsignValues.setPointer(Tmp.newTmp());
        codeAsignValues.appendValueToPointer(codeAns.getPointer());
        codeAns.append(codeAsignValues);
        this.attrs.forEach((v: Op, k: string) => {
            let value = v.ExeCode(env);
            value = GetReferenceValueCode(value);
            const reference = new Reference();
            reference.PutValueOnReference(value.getValue());
            real.set(k, reference);
            codeAns.append(value);
            codeAns.appendAsignToHeapPosition(codeAsignValues.getPointer(), value.getPointer(), `puntero a ${k}`);
            codeAns.appendLine(`${codeAsignValues.getPointer()} = ${codeAsignValues.getPointer()} + 1;`);
        });

        codeAns.setValue(new OBJECT(real));
        codeAns.appendSplitComment("start OBJECT INITIALIZATION");
        return codeAns;
    }

    GO(env: Envmnt): object {
        const real: Map<string, Cntnr> = new Map<string, Cntnr>();
        this.attrs.forEach((v, k) => {
            let value = v.Exe(env);
            if (value instanceof Reference) {
                value = (value as Reference).getValue();
            }
            const reference = new Reference();
            reference.PutValueOnReference(value as Cntnr);
            real.set(k, reference);
        });
        return new OBJECT(real);
    }

    GetGraph(env: Envmnt): GraphvizNode {
        let values: GraphvizNode[] = [];
        this.attrs.forEach((v, k) => {
            values.push(new GraphvizNode(k));
            values.push(v.GetGraph(env));
        });
        return new GraphvizNode('TYPE_VALUE', values);
    }

    GetTSGraph(): string {
        return "";
    }
}
