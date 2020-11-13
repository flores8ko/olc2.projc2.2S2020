import {Native} from "../functions/Native";
import {ARRAY, NUMBER} from "../PrimitiveTypoContainer";
import {Envmnt} from "../Envmnt";
import {Cntnr} from "../Cntnr";
import {ReturnObj} from "../../nodes/ReturnObj";
import { Code } from "../C3D/Code";
import {GetReferenceValueCode} from "../Utils";
import {Tmp} from "../C3D/Tmp";

export class Length extends Native {
    public GetC3DCode(env0: Envmnt, name: string, ...codes: Code []): Code {
        let code = codes[0];
        code = GetReferenceValueCode(code);
        const codeAns = new Code(code);
        codeAns.setPointer(Tmp.newTmp());
        codeAns.appendValueToPointer(this.array.getValueList().length);
        codeAns.setValue(new NUMBER(this.array.getValueList().length));
        return codeAns;
    }
    private readonly array: ARRAY;

    constructor(array: ARRAY) {
        super();
        this.array = array;
    }

    EXE(env0: Envmnt, args: Array<Cntnr>): Cntnr {
        let size = this.array.getValueList().length;
        return new ReturnObj(new NUMBER(size));
    }
}
