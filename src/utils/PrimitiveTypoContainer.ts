import {Cntnr} from "./Cntnr";
import {Reference} from "./Reference";
import {Length} from "./nativeFunctions/length";
import {Push} from "./nativeFunctions/push";
import {Pop} from "./nativeFunctions/pop";
import {ArrayRange} from "./C3D/ArrayRange";
import {Code} from "./C3D/Code";
import {ArrayMemorySize, ArrayPosition, ArrayPositionCode} from "./Utils";
import {Stringlenght} from "./nativeFunctions/stringlenght";
import {StringUperCase} from "./nativeFunctions/stringUpperCase";
import {StringLowrCase} from "./nativeFunctions/stringLowerCase";
import {Charat} from "./nativeFunctions/charat";

export class BOOLEAN extends Cntnr {
    private readonly value: boolean;

    constructor(value?: boolean) {
        super();
        this.value = value;
        this.typo = "BOOLEAN";
    }

    public toString = (): string => {
        return this.value ? "true" : "false";
    };

    public getValueNumber = (): number => {
        return this.value ? 1 : 0;
    }

    public getValue = (): boolean => {
        return this.value;
    };
}

export class STRING extends Cntnr {
    private readonly value: string;

    constructor(value?: string) {
        super();
        this.value = value || '';
        this.typo = "STRING";
        try{
            this.Declare("length", new Stringlenght(this));
            this.Declare("touppercase", new StringUperCase(this));
            this.Declare("tolowercase", new StringLowrCase(this));
            this.Declare("charat", new Charat(this));
        }catch (e) {
            throw new Error();
        }
    }

    public toString = (): string => {
        return this.value;
    };

    public getValue = (): string => {
        return this.value;
    };
}

export class NUMBER extends Cntnr {
    private readonly value: number;

    constructor(value?: number) {
        super();
        this.value = value || 0;
        this.typo = "NUMBER";
    }

    public toString = (): string => {
        return this.value + '';
    };

    public getValue = (): number => {
        return this.value;
    };
}

export class UNDEFINED extends Cntnr {
    private readonly value: any = undefined;
    constructor() {
        super();
        this.typo = "UNDEFINED";
    }

    public toString = (): string => {
        return "undefined";
    };

    public getValue = (): any => {
        return this.value;
    };
}

export class NAN extends Cntnr {
    constructor() {
        super();
        this.typo = "NAN";
    }

    public toString = (): string => {
        return "NaN";
    }
}

export class NULL extends Cntnr {
    constructor() {
        super();
        this.typo = "NULL";
    }

    public toString = (): string => {
        return null;
    };

    public getValue = (): object => {
        return null;
    };
}

export class ARRAY extends Cntnr {
    private readonly value: Array<Cntnr>;
    private readonly contentType: string;
    private ranges: Array<ArrayRange>;

    constructor(value?: Array<Cntnr> | string, contentType: string = 'ANY', ranges: Array<ArrayRange> = null) {
        super();
        this.typo = `ARRAY`;
        this.contentType = contentType;
        this.ranges = ranges;

        if (value instanceof String) {
            this.value = new Array<Cntnr>();
            this.ranges.push(new ArrayRange(0, value.length - 1));
            for (let i = 0; i < value.length; i++) {
                let ref = new Reference("NUMBER");
                ref.PutValueOnReference(new NUMBER(value.charCodeAt(i)));
                this.value.push(ref);
            }
        }else{
            this.value = value as Array<Cntnr> || new Array<Cntnr>();
            let ranges = new Array<ArrayRange>();
            ranges.push(new ArrayRange(0, this.value.length-1));
            this.ranges = this.ranges ? this.ranges : ranges;
        }

        try{
            this.Declare("length", new Length(this));
            this.Declare("push", new Push(this));
            this.Declare("pop", new Pop(this));
        }catch (e) {
            throw new Error();
        }
    }

    public toString = (): string => {
        const size = this.value.length;
        let log = `Array (${size}) [`;
        for (let i = 0; i < size; i++) {
            log += `${(this.value[i] as Reference).getValue()}`;
            if (size - 1 !== i) {
                log += ', ';
            }
        }
        log += ']';
        return log;
    };

    public GetLinearMemorySize(): number {
        return ArrayMemorySize(this.ranges);
    }

    public GetPosition(indexes: Array<number>): number {
        return ArrayPosition(this.ranges, indexes);
    }

    public GetPositionCode(codes: Array<Code>): Code {
        return ArrayPositionCode(this.ranges, codes);
    }

    public getValue = (index: number): object => {
        let val = this.value[index];
        if (val !== undefined) {
            return val;
        }
        let size = this.value.length;
        while (size <= index) {
            this.value.push(new Reference());
            size++;
        }
        return this.value[index];
    };

    public addValue(value: Cntnr) {
        this.value.push(value);
    }

    public getValueList = (): Array<Cntnr> => {
        return this.value;
    };
}

export class OBJECT extends Cntnr {
    private readonly attributes: Map<string, Cntnr>;

    constructor(attributes?: Map<string, Cntnr>) {
        super();
        this.attributes = attributes || new Map<string, Cntnr>();
        this.attributes.forEach((v, k) => {
            let value = v;
            if (value instanceof Reference) {
                value = (value as Reference).getValue();
            }
            const reference = new Reference();
            reference.PutValueOnReference(value);
            this.Declare(k, reference);
        });
        this.typo = "OBJECT";
    }

    public toString = (): string => {
        let log = '{';
        let count = 1;
        this.props.forEach((v, k) => {
            let value = v;
            if (value instanceof Reference) {
                value = (value as Reference).getValue();
            }
            log += `"${k}" : ${value}`;
            if (count < this.props.size) {
                log += ', ';
            }
            count++;
        });
        log += '}';
        return log;
    };
}
