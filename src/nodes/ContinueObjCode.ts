import {Code} from "../utils/C3D/Code";

export class ContinueObjCode extends Code{
    constructor(startLbl: string) {
        super();
        this.appendJMP(startLbl, "CONTINUE");
    }
}