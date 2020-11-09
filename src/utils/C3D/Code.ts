import {Cntnr} from "../Cntnr";
import {Tmp} from "./Tmp";
import {Lbl} from "./Lbl";
import {OptimizationRecords} from "../OptimizationRecords";

export class Code {
    private readonly lines: Array<string> = new Array<string>();
    private readonly asmLines: Array<string> = new Array<string>();
    private readonly asmProcLines: Array<string> = new Array<string>();
    public static optimizado = false;
    public isProc: boolean = false;
    public isHeap: boolean;
    private value: Cntnr;
    private pointer: string;

    constructor(...codes: Code[]) {
        for (let code of codes) {
            this.append(code);
        }
    }

    private RemoveTmpIfItsUsed(...tmps: any[]) {
        for (let tmp of tmps) {
            if (!`${tmp}`.startsWith("t")) {
                return;
            }
            Tmp.removeUsedTmp(`${tmp}`);
        }
    }

    public appendLine(line: string, comment: string = "") {
        comment = comment !== "" ? `\t// ${comment}` : "";
        this.lines.push(`${line} ${comment}`);
    }

    public appendSplitComment(comment: string) {
        this.lines.push(
            `${comment.toUpperCase().includes("START ") ? '\n' : ''}// --------------------- ${comment.toUpperCase()} ---------------------${comment.toUpperCase().includes("END ") ? '\n' : ''}`);
    }

    public appendLabel(label: string, comment: string = "") {
        this.appendLine(`${label}:`, comment); // label:
    }

    public appendValueToPointer(
        value: string | number,
        comment: string = "") {
        this.appendLine(`${this.pointer} = ${value};`, comment); //pointer = value;
        this.RemoveTmpIfItsUsed(value);
    }

    public appendSuma(
        pointer1: string,
        pointer2: string,
        comment: string = ""
    ) {
        if (Code.optimizado
            && (this.pointer === pointer1 && pointer2 === "0")
            || (this.pointer === pointer2 && pointer1 === "0")
        ) {
            this.appendLine(`// ELIMINADO POR REGLA 6 ${this.pointer} = ${pointer1} + ${pointer2};`, comment); // pointer = pointer1 + pointer2;
            OptimizationRecords.AddRecord(
                `${this.pointer} = ${pointer1} + ${pointer2};`,
                'DELETED',
                6
            );
            //this.RemoveTmpIfItsUsed(pointer1, pointer2);
            return
        }
        if (Code.optimizado
            && (pointer1 === "0" || pointer2 === "0")
        ) {
            let val = pointer1 === "0" ? pointer2 : pointer1;
            this.appendLine(`// OPTIMIZADO POR REGLA 10 ${this.pointer} = ${pointer1} + ${pointer2};`, comment); // pointer = pointer1 + pointer2;
            this.appendLine(`${this.pointer} = ${val};`);
            OptimizationRecords.AddRecord(
                `${this.pointer} = ${pointer1} + ${pointer2};`,
                `${this.pointer} = ${val};`,
                10
            );
            //this.RemoveTmpIfItsUsed(pointer1, pointer2);
            return
        }
        this.appendLine(`${this.pointer} = ${pointer1} + ${pointer2};`, comment); // pointer = pointer1 + pointer2;
        this.RemoveTmpIfItsUsed(pointer1, pointer2);
    }

    public appendResta(
        pointer1: string,
        pointer2: string,
        comment: string = ""
    ) {
        if (Code.optimizado
            && (this.pointer === pointer1 && pointer2 === "0")
            || (this.pointer === pointer2 && pointer1 === "0")
        ) {
            this.appendLine(`// ELIMINADO POR REGLA 7 ${this.pointer} = ${pointer1} - ${pointer2};`, comment); // pointer = pointer1 + pointer2;
            //this.RemoveTmpIfItsUsed(pointer1, pointer2);
            OptimizationRecords.AddRecord(
                `${this.pointer} = ${pointer1} - ${pointer2};`,
                'DELETED',
                7
            );
            return
        }
        if (Code.optimizado
            && (pointer2 === "0")
        ) {
            this.appendLine(`// OPTIMIZADO POR REGLA 11 ${this.pointer} = ${pointer1} - ${pointer2};`, comment); // pointer = pointer1 + pointer2;
            this.appendLine(`${this.pointer} = ${pointer1};`);
            OptimizationRecords.AddRecord(
                `${this.pointer} = ${pointer1} - ${pointer2};`,
                `${this.pointer} = ${pointer1};`,
                11
            );
            //this.RemoveTmpIfItsUsed(pointer1, pointer2);
            return
        }
        this.appendLine(`${this.pointer} = ${pointer1} - ${pointer2};`, comment); // pointer = pointer1 - pointer2;
        this.RemoveTmpIfItsUsed(pointer1, pointer2);
    }

    public appendMulti(
        pointer1: string,
        pointer2: string,
        comment: string = ""
    ) {
        if (Code.optimizado
            && (this.pointer === pointer1 && pointer2 === "1")
            || (this.pointer === pointer2 && pointer1 === "1")
        ) {
            this.appendLine(`// ELIMINADO POR REGLA 8 ${this.pointer} = ${pointer1} * ${pointer2};`, comment); // pointer = pointer1 + pointer2;
            OptimizationRecords.AddRecord(
                `${this.pointer} = ${pointer1} * ${pointer2};`,
                'DELETED',
                8
            );
            //this.RemoveTmpIfItsUsed(pointer1, pointer2);
            return
        }
        if (Code.optimizado
            && (pointer1 === "1" || pointer2 === "1")
        ) {
            let val = pointer1 === "1" ? pointer2 : pointer1;
            this.appendLine(`// OPTIMIZADO POR REGLA 12 ${this.pointer} = ${pointer1} * ${pointer2};`, comment); // pointer = pointer1 + pointer2;
            this.appendLine(`${this.pointer} = ${val};`);
            OptimizationRecords.AddRecord(
                `${this.pointer} = ${pointer1} * ${pointer2};`,
                `${this.pointer} = ${val};`,
                12
            );
            //this.RemoveTmpIfItsUsed(pointer1, pointer2);
            return
        }
        if (Code.optimizado
            && (pointer1 === "2" || pointer2 === "2")
        ) {
            let val = pointer1 === "2" ? pointer2 : pointer1;
            this.appendLine(`// OPTIMIZADO POR REGLA 14 ${this.pointer} = ${pointer1} * ${pointer2};`, comment); // pointer = pointer1 + pointer2;
            this.appendSuma(val, val, comment);
            //this.RemoveTmpIfItsUsed(pointer1, pointer2);
            OptimizationRecords.AddRecord(
                `${this.pointer} = ${pointer1} * ${pointer2};`,
                `${this.pointer} = ${val} + ${val};`,
                14
            );
            return
        }
        if (Code.optimizado
            && (pointer1 === "0" || pointer2 === "0")
        ) {
            let val = pointer1 === "0" ? pointer2 : pointer1;
            this.appendLine(`// OPTIMIZADO POR REGLA 15 ${this.pointer} = ${pointer1} * ${pointer2};`, comment); // pointer = pointer1 + pointer2;
            this.appendLine(`${this.pointer} = 0;`, comment);
            //this.RemoveTmpIfItsUsed(pointer1, pointer2);
            OptimizationRecords.AddRecord(
                `${this.pointer} = ${pointer1} * ${pointer2};`,
                `${this.pointer} = 0;`,
                15
            );
            return
        }
        this.appendLine(`${this.pointer} = ${pointer1} * ${pointer2};`, comment); // pointer = pointer1 * pointer2;
        this.RemoveTmpIfItsUsed(pointer1, pointer2);
    }

    public appendDiv(
        pointer1: string,
        pointer2: string,
        comment: string = ""
    ) {
        if (Code.optimizado
            && (this.pointer === pointer1 && pointer2 === "1")
        ) {
            this.appendLine(`// ELIMINADO POR REGLA 9 ${this.pointer} = ${pointer1} / ${pointer2};`, comment); // pointer = pointer1 + pointer2;
            //this.RemoveTmpIfItsUsed(pointer1, pointer2);
            OptimizationRecords.AddRecord(
                `${this.pointer} = ${pointer1} / ${pointer2};`,
                'DELETED',
                9
            );
            return
        }
        if (Code.optimizado
            && (pointer2 === "1")
        ) {
            this.appendLine(`// OPTIMIZADO POR REGLA 13 ${this.pointer} = ${pointer1} / ${pointer2};`, comment); // pointer = pointer1 + pointer2;
            this.appendLine(`${this.pointer} = ${pointer1};`);
            //this.RemoveTmpIfItsUsed(pointer1, pointer2);
            OptimizationRecords.AddRecord(
                `${this.pointer} = ${pointer1} / ${pointer2};`,
                `${this.pointer} = ${pointer1};`,
                13
            );
            return
        }
        if (Code.optimizado
            && (pointer1 === "0" || pointer2 === "0")
        ) {
            let val = pointer1 === "0" ? pointer2 : pointer1;
            this.appendLine(`// OPTIMIZADO POR REGLA 16 ${this.pointer} = ${pointer1} / ${pointer2};`, comment); // pointer = pointer1 + pointer2;
            this.appendLine(`${this.pointer} = 0;`, comment);
            //this.RemoveTmpIfItsUsed(pointer1, pointer2);
            OptimizationRecords.AddRecord(
                `${this.pointer} = ${pointer1} / ${pointer2};`,
                `${this.pointer} = 0;`,
                16
            );
            return
        }
        this.appendLine(`${this.pointer} = ${pointer1} / ${pointer2};`, comment); // pointer = pointer1 / pointer2;
        this.RemoveTmpIfItsUsed(pointer1, pointer2);
    }

    public appendMod(
        pointer1: string,
        pointer2: string,
        comment: string = ""
    ) {
        this.appendLine(`${this.pointer} = (int) ${pointer1} %  (int)${pointer2};`, comment); // pointer = pointer1 % pointer2;
        this.RemoveTmpIfItsUsed(pointer1, pointer2);
    }

    public appendStackPointerPlusValue(
        value: string | number | any[],
        comment: string = "") {
        if (value instanceof String || value instanceof Number) {
            this.appendSuma("P", `${value}`, comment);
        } else {
            let index = (value as any[])[0];
            let isConst = (value as any[])[1];
            if (isConst) {
                this.appendLine(`${this.pointer} = ${index};`, comment);
            } else {
                this.appendSuma("P", `${index}`, comment);
            }
        }
        this.RemoveTmpIfItsUsed(value);
    }

    public appendHeapPointerPlusValue(
        value: string | number,
        comment: string = ""
    ) {
        this.appendSuma("H", `${value}`, comment);
        this.RemoveTmpIfItsUsed(value);
    }

    public appendJMP(
        label: string,
        comment: string = ""
    ) {
        this.appendLine(`goto ${label};`, comment); //goto label;
    }

    public appendJE(
        pointer1: string,
        pointer2: string,
        label: string,
        comment: string = ""
    ) {
        this.appendLine(`if(${pointer1} == ${pointer2}) goto ${label};`, comment); //if(pointer1 == pointer2) goto label;
        this.RemoveTmpIfItsUsed(pointer1, pointer2);
    }

    public appendJNE(
        pointer1: string,
        pointer2: string,
        label: string,
        comment: string = ""
    ) {
        this.appendLine(`if(${pointer1} != ${pointer2}) goto ${label};`, comment); //if(pointer1 != pointer2) goto label;
        this.RemoveTmpIfItsUsed(pointer1, pointer2);
    }

    public appendJG(
        pointer1: string,
        pointer2: string,
        label: string,
        comment: string = ""
    ) {
        this.appendLine(`if(${pointer1} > ${pointer2}) goto ${label};`, comment); //if(pointer1 > pointer2) goto label;
        this.RemoveTmpIfItsUsed(pointer1, pointer2);
    }

    public appendJL(
        pointer1: string,
        pointer2: string,
        label: string,
        comment: string = ""
    ) {
        this.appendLine(`if(${pointer1} < ${pointer2}) goto ${label};`, comment); //if(pointer1 < pointer2) goto label;
        this.RemoveTmpIfItsUsed(pointer1, pointer2);
    }

    public appendJGE(
        pointer1: string,
        pointer2: string,
        label: string,
        comment: string = ""
    ) {
        this.appendLine(`if(${pointer1} >= ${pointer2}) goto ${label};`, comment); //if(pointer1 >= pointer2) goto label;
        this.RemoveTmpIfItsUsed(pointer1, pointer2);
    }

    public appendJLE(
        pointer1: string,
        pointer2: string,
        label: string,
        comment: string = ""
    ) {
        this.appendLine(`if(${pointer1} <= ${pointer2}) goto ${label};`, comment); //if(pointer1 <= pointer2) goto label;
        this.RemoveTmpIfItsUsed(pointer1, pointer2);
    }

    public appendAsignToStackPosition(
        position: string,
        value: string | number,
        comment: string = ""
    ) {
        this.appendLine(`STACK[(int)${position}] = ${value};`, comment); // STACK [position] = value;
        this.RemoveTmpIfItsUsed(position, value);
    }

    public appendAsignToHeapPosition(
        position: string,
        value: string | number,
        comment: string = ""
    ) {
        this.appendLine(`HEAP[(int)${position}] = ${value};`, comment); // HEAP [position] = value;
        this.RemoveTmpIfItsUsed(position, value);
    }

    public appendAddToStackPointer(
        value: string | number,
        comment: string = ""
    ) {
        this.appendLine(`P = P + ${value};`, comment);
        this.RemoveTmpIfItsUsed(value);
    }

    public appendAddToHeapPointer(
        value: string | number,
        comment: string = ""
    ) {
        this.appendLine(`H = H + ${value};`, comment);
        this.RemoveTmpIfItsUsed(value);
    }

    public appendSubToStackPointer(
        value: string | number,
        comment: string = ""
    ) {
        this.appendLine(`P = P - ${value};`, comment);
        this.RemoveTmpIfItsUsed(value);
    }

    public appendSubToHeapPointer(
        value: string | number,
        comment: string = ""
    ) {
        this.appendLine(`H = H - ${value};`, comment);
        this.RemoveTmpIfItsUsed(value);
    }

    public GetFromStack(
        position: string,
        comment: string = ""
    ) {
        this.appendLine(`${this.pointer} = STACK[(int)${position}];`, comment); // pointer = STACK [position];
        this.RemoveTmpIfItsUsed(position);
    }

    public GetFromHeap(
        position: string,
        comment: string = ""
    ) {
        this.appendLine(`${this.pointer} = HEAP[(int)${position}];`, comment); // pointer = HEAP [position];
        this.RemoveTmpIfItsUsed(position);
    }

    public appendMethodStart(
        name: string,
        comment: string = ""
    ) {
        Tmp.isOnFunction();
        this.isProc = true;
        this.appendLine(`void ${name.toLowerCase()}(){`, comment);
    }

    public appendMethodEnd(
        comment: string = ""
    ) {
        Tmp.isNotOnFunction();
        this.appendLine(`return;`);
        this.appendLine(`}`, comment);
        this.isProc = false;
    }

    public appendMethodCall(
        name: string,
        comment: string = ""
    ) {
        this.appendLine(`${name.toLowerCase()}();`, comment);
    }

    public appendPrintChar(
        char: any,
        comment: string = ""
    ) {
        this.appendLine(`printf("%c", (int)${char});`, comment);
        this.RemoveTmpIfItsUsed(char);
    }

    public appendPrintInt(
        int: any,
        comment: string = ""
    ) {
        this.appendLine(`printf("%f", (double)${int});`, comment);
        this.RemoveTmpIfItsUsed(int);
    }

    public appendPrintDouble(
        double: any,
        comment: string = ""
    ) {
        this.appendLine(`printf("%d", ${double});`, comment);
        this.RemoveTmpIfItsUsed(double);
    }

    public ValueToStringCode(): Code {
        const toStringCode = new Code(this);
        toStringCode.appendSplitComment("START IMPRIMIENDO VALOR");
        let type = this.value.typo;
        type = type.toUpperCase();
        switch (type) {
            case "NUMBER":
                toStringCode.appendPrintInt(this.getPointer());
                break;
            case "BOOLEAN":
                toStringCode.appendPrintInt(this.getPointer());
                break;
            case "STRING":
                const CodeTmp = new Code();
                CodeTmp.setPointer(Tmp.newTmp());
                CodeTmp.GetFromHeap(this.getPointer());
                CodeTmp.appendSuma(CodeTmp.getPointer(), this.getPointer());

                const controlCode = new Code(CodeTmp);
                controlCode.setPointer(Tmp.newTmp());
                controlCode.appendSuma(this.getPointer(), "1");

                const lbl = Lbl.newLbl();
                controlCode.appendLabel(lbl);

                const charCode = new Code();
                charCode.setPointer(Tmp.newTmp());
                charCode.GetFromHeap(controlCode.getPointer());
                charCode.appendPrintChar(charCode.getPointer());
                controlCode.append(charCode);
                controlCode.appendSuma(controlCode.getPointer(), "1");
                controlCode.appendJLE(controlCode.getPointer(), CodeTmp.getPointer(), lbl);

                toStringCode.append(controlCode);
                break;
            default:
                toStringCode.appendPrintInt(this.getPointer());
                break;
        }
        toStringCode.appendSplitComment("END IMPRIMIENDO VALOR");
        return toStringCode;
    }


    append(code: Code) {
        this.isProc = code.isProc;
        if (!code) {
            return
        }
        if (code.getText() != "") {
            this.lines.push(...code.getLines());
        }
        if (code.getASMText() != "") {
            this.asmLines.push(...code.getASMLines());
        }
        if (code.getASMProcText() != "") {
            this.asmProcLines.push(...code.getASMProcLines());
        }
    }

    public getValue = (): Cntnr => this.value;
    public setValue = (value: Cntnr) => this.value = value;

    public getPointer = () => this.pointer;
    public setPointer = (pointer: string | number) => this.pointer = pointer + "";

    public getText = () => this.lines.join('\n').trim();
    public getASMText = () => this.asmLines.join('\n').trim();
    public getASMProcText = () => this.asmProcLines.join('\n').trim();

    public getLines = () => this.lines;
    public getASMLines = () => this.asmLines;
    public getASMProcLines = () => this.asmProcLines;
}
