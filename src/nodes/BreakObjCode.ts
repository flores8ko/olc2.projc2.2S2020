import {Code} from "../utils/C3D/Code";

export class BreakObjCode extends Code{
    constructor(endLbl: string) {
        super();
        this.appendJMP(endLbl, "BREAK");
    }
}