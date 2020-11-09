import {Native} from "../functions/Native";
import {NUMBER, STRING} from "../PrimitiveTypoContainer";
import {Code} from "../C3D/Code";
import {SemanticException} from "../Utils";
import {ReturnObj} from "../../nodes/ReturnObj";
import {Envmnt} from "../Envmnt";
import {Cntnr} from "../Cntnr";

export class Concat extends Native{
    EXE(env0: Envmnt, args: Array<Cntnr>): Cntnr {
        let value = args.pop();
        if (value === undefined) {
            throw new SemanticException("char at requiere un argumento");
        }
        if (!(value instanceof STRING)) {
            throw new SemanticException("se esperaba un argumento de tipo string");
        }
        let retVal = this.str.getValue() + value.getValue();
        return new ReturnObj(new STRING(retVal));
    }

    GetC3DCode(env0: Envmnt, name: string, ...code: Code[]): Code {
        const codeAns = new Code();
        codeAns.setValue(new STRING());
        return codeAns;
    }

    private readonly str: STRING;

    constructor(str: STRING) {
        super();
        this.str = str;
    }

}