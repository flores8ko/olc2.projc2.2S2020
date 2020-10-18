import {Code} from "./Code";

export class ArrayRange extends Code{
    public sIndex: number;
    public eIndex: number;

    constructor(sIndex: number, eIndex: number) {
        super();
        this.sIndex = sIndex;
        this.eIndex = eIndex;
    }
}