import {Cntnr} from "../utils/Cntnr";

export class ReturnObj extends Cntnr {
    private readonly returnn: Cntnr;

    constructor(returnn: Cntnr) {
        super();
        this.returnn = returnn;
    }

    toString = (): string => {
        return "mi objeto return (ReturnObj)";
    };

    public getValue(): Cntnr {
        return this.returnn;
    }
}