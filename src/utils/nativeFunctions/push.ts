import {Native} from "../functions/Native";
import {ARRAY, NUMBER} from "../PrimitiveTypoContainer";
import {Envmnt} from "../Envmnt";
import {Cntnr} from "../Cntnr";
import {ReturnObj} from "../../nodes/ReturnObj";
import {Reference} from "../Reference";
import {SemanticException} from "../Utils";

export class Push extends Native{
    private readonly array: ARRAY;

    constructor(array: ARRAY) {
        super();
        this.array = array;
    }

    EXE(env0: Envmnt, args: Array<Cntnr>): Cntnr {
        let size = this.array.getValueList().length;
        for (let i in args) {
            let ref = new Reference();
            ref.setValue(args[i]);
            this.array.addValue(ref);
        }
        return new ReturnObj(new NUMBER(size));
    }
}