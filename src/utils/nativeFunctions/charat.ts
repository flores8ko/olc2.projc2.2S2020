import {Native} from "../functions/Native";
import { Envmnt } from "../Envmnt";
import { Cntnr } from "../Cntnr";
import { Code } from "../C3D/Code";
import {NUMBER, STRING} from "../PrimitiveTypoContainer";
import {GetReferenceValueCode, SemanticException} from "../Utils";
import {ReturnObj} from "../../nodes/ReturnObj";
import {Tmp} from "../C3D/Tmp";
import {Lbl} from "../C3D/Lbl";

export class Charat extends Native {
    public EXE(env0: Envmnt, args: Cntnr[]): Cntnr {
        let value = args.pop();
        if (value === undefined) {
            throw new SemanticException("char at requiere un argumento");
        }
        if (!(value instanceof NUMBER)) {
            throw new SemanticException("se esperaba un argumento de tipo number");
        }
        let index = (value as NUMBER).getValue();
        let retVal = this.str.getValue().charAt(index);
        return new ReturnObj(new STRING(retVal));
    }

    public GetC3DCode(env0: Envmnt, name: string, ...codes: Code[]): Code {
        let code = codes[0];
        code = GetReferenceValueCode(code);
        const codeAns = new Code(code);
        codeAns.setPointer(Tmp.newTmp());
        codeAns.appendValueToPointer("H");

        const str1Code = new Code();
        const str2Code = new Code();

        str1Code.setPointer(Tmp.newTmp());
        str1Code.appendValueToPointer("1", "largo cadena a tratar");

        str2Code.setPointer(Tmp.newTmp());
        str2Code.appendValueToPointer("H", "puntero a char");

        const codeCicle = new Code(str1Code, str2Code);
        codeCicle.setPointer(Tmp.newTmp());
        codeCicle.appendValueToPointer(1);

        let cref = GetReferenceValueCode(codes[1]);
        codeCicle.append(cref);
        codeCicle.appendSuma(codeCicle.getPointer(), cref.getPointer(), "char on position");


        const char = new Code();
        char.setPointer(Tmp.newTmp());
        char.GetFromHeap(codeCicle.getPointer());
        char.appendAsignToHeapPosition(str2Code.getPointer(), "1");
        char.appendLine(`${str2Code.getPointer()} = ${str2Code.getPointer()} + 1;`);
        char.appendAsignToHeapPosition(str2Code.getPointer(), char.getPointer());
        codeCicle.append(char);
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