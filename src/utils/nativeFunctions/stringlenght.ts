import {Native} from "../functions/Native";
import {NUMBER, STRING} from "../PrimitiveTypoContainer";
import {Envmnt} from "../Envmnt";
import {Cntnr} from "../Cntnr";
import {ReturnObj} from "../../nodes/ReturnObj";
import { Code } from "../C3D/Code";
import {Tmp} from "../C3D/Tmp";
import {GetReferenceValueCode} from "../Utils";

export class Stringlenght extends Native {
    public GetC3DCode(env0: Envmnt, name: string, code: Code = null): Code {
        code = GetReferenceValueCode(code);
        const codeAns = new Code(code);
        codeAns.setPointer(Tmp.newTmp());
        codeAns.GetFromHeap(code.getPointer());
        codeAns.setValue(new NUMBER());
        return codeAns;
    }

    private readonly str: STRING;

    constructor(str: STRING) {
        super();
        this.str = str;
    }

    EXE(env0: Envmnt, args: Array<Cntnr>): Cntnr {
        let size = this.str.getValue().length;
        return new ReturnObj(new NUMBER(size));
    }
}
