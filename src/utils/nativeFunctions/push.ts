import {Native} from "../functions/Native";
import {ARRAY, NUMBER} from "../PrimitiveTypoContainer";
import {Envmnt} from "../Envmnt";
import {Cntnr} from "../Cntnr";
import {ReturnObj} from "../../nodes/ReturnObj";
import {Reference} from "../Reference";
import {SemanticException} from "../Utils";
import { Code } from "../C3D/Code";

export class Push extends Native {
    public GetC3DCode(env0: Envmnt, name: string, code: Code = null): Code {
        throw new Error("Method not implemented.");
    }
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
