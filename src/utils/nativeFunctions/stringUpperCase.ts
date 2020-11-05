import {Native} from "../functions/Native";
import {STRING} from "../PrimitiveTypoContainer";
import {Envmnt} from "../Envmnt";
import {Cntnr} from "../Cntnr";
import {Code} from "../C3D/Code";
import {ReturnObj} from "../../nodes/ReturnObj";
import {GetReferenceValueCode} from "../Utils";
import {Tmp} from "../C3D/Tmp";
import {Lbl} from "../C3D/Lbl";

export class StringUperCase extends Native {
    EXE(env0: Envmnt, args: Array<Cntnr>): Cntnr {
        let base = this.str.getValue();
        return new ReturnObj(new STRING(base.toUpperCase()));
    }

    GetC3DCode(env0: Envmnt, name: string, code: Code): Code {
        code = GetReferenceValueCode(code);
        const codeAns = new Code(code);
        codeAns.setPointer(Tmp.newTmp());
        codeAns.appendValueToPointer("H");

        const str1Code = new Code();
        const str2Code = new Code();

        str1Code.setPointer(Tmp.newTmp());
        str1Code.GetFromHeap(code.getPointer(), "largo cadena a tratar");

        str2Code.setPointer(Tmp.newTmp());
        str2Code.appendValueToPointer("H", "puntero a nueva cadena upper");

        const codeCicle = new Code(str1Code, str2Code);
        codeCicle.setPointer(Tmp.newTmp());
        codeCicle.appendValueToPointer(code.getPointer());
        const startLbl = Lbl.newLbl();
        const endLbl = Lbl.newLbl();
        const cicleCode = Tmp.newTmp();


        codeCicle.appendLine(`${cicleCode} = ${0};`, "punto de partida");
        codeCicle.appendAsignToHeapPosition("H", str1Code.getPointer(), "tamaño de cadena para copia");
        codeCicle.appendLabel(startLbl);
        codeCicle.appendJGE(cicleCode, str1Code.getPointer(), endLbl);
        codeCicle.appendSuma(codeCicle.getPointer(), "1");
        codeCicle.appendLine(`${str2Code.getPointer()} = ${str2Code.getPointer()} + 1;`);
        codeCicle.appendLine(`${cicleCode} = ${cicleCode} + 1;`);

        const comp = Lbl.newLbl();

        const char = new Code();
        char.setPointer(Tmp.newTmp());
        char.GetFromHeap(codeCicle.getPointer());
        char.appendJL(char.getPointer(), `${"a".charCodeAt(0)}` , comp);
        char.appendJG(char.getPointer(), `${"z".charCodeAt(0)}`, comp);
        char.appendLine(`${char.getPointer()} = ${char.getPointer()} - 32;`);
        char.appendLabel(comp);
        char.appendAsignToHeapPosition(str2Code.getPointer(), char.getPointer());

        codeCicle.append(char);
        codeCicle.appendJMP(startLbl);
        codeCicle.appendLabel(endLbl);
        codeCicle.appendLine(`H = H + ${str1Code.getPointer()};`);

        codeAns.append(codeCicle);
        codeAns.setValue(this.str);
        return codeAns;
    }

    private readonly str: STRING;

    constructor(str: STRING) {
        super();
        this.str = str;
    }
}
