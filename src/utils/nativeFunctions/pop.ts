import {Native} from "../functions/Native";
import {ARRAY, UNDEFINED} from "../PrimitiveTypoContainer";
import {Envmnt} from "../Envmnt";
import {Cntnr} from "../Cntnr";
import {ReturnObj} from "../../nodes/ReturnObj";

export class Pop extends Native{
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