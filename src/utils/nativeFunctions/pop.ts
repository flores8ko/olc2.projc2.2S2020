import {Native} from "../functions/Native";
import {ARRAY, UNDEFINED} from "../PrimitiveTypoContainer";
import {Envmnt} from "../Envmnt";
import {Cntnr} from "../Cntnr";
import {ReturnObj} from "../../nodes/ReturnObj";
import { Code } from "../C3D/Code";

export class Pop extends Native {
    public GetC3DCode(env0: Envmnt, name: string, code: Code = null): Code {
        throw new Error("Method not implemented.");
    }
    private readonly array: ARRAY;

    constructor(array: ARRAY) {
        super();
        this.array = array;
    }

    EXE(env0: Envmnt, args: Array<Cntnr>): Cntnr {
        let value = this.array.getValueList().pop();
        if (value === undefined) {
            return new ReturnObj(new UNDEFINED());
        }
        return new ReturnObj(value);
    }
}
