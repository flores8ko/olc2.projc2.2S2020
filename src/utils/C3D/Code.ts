import {Cntnr} from "../Cntnr";
import {Tmp} from "./Tmp";
import {Lbl} from "./Lbl";

export class Code {
    private readonly lines: Array<string> = new Array<string>();
    private readonly asmLines: Array<string> = new Array<string>();
    private readonly asmProcLines: Array<string> = new Array<string>();
    public isProc: boolean = false;
    public isHeap: boolean;
    private value: Cntnr;
    private pointer: string;

    constructor(...codes: Code[]) {
        for (let code of codes) {
            this.append(code);
        }
    }

    public appendLine(line: string, comment: string = "") {
        this.lines.push(`${line} \t// ${comment}`);
    }

    public appendSplitComment(comment: string) {
        this.lines.push(`// --------------------- ${comment} --------------------- `);
    }

    public appendLabel(label: string, comment: string = "") {
        this.appendLine(`${label}:`, comment); // label:
    }

    public appendValueToPointer(value: string, comment: string = "") {
        this.appendLine(`${this.pointer} = ${value};`, comment); //pointer = value;
    }

    public appendSuma(
        pointer1: string,
        pointer2: string,
        comment: string = ""
    ) {
        this.appendLine(`${this.pointer} = ${pointer1} + ${pointer2};`, comment); // pointer = pointer1 + pointer2;
    }

    public appendResta(
        pointer1: string,
        pointer2: string,
        comment: string = ""
    ) {
        this.appendLine(`${this.pointer} = ${pointer1} - ${pointer2};`, comment); // pointer = pointer1 - pointer2;
    }

    public appendMulti(
        pointer1: string,
        pointer2: string,
        comment: string = ""
    ) {
        this.appendLine(`${this.pointer} = ${pointer1} * ${pointer2};`, comment); // pointer = pointer1 * pointer2;
    }

    public appendDiv(
        pointer1: string,
        pointer2: string,
        comment: string = ""
    ) {
        this.appendLine(`${this.pointer} = ${pointer1} / ${pointer2};`, comment); // pointer = pointer1 / pointer2;
    }

    public appendMod(
        pointer1: string,
        pointer2: string,
        comment: string = ""
    ) {
        this.appendLine(`${this.pointer} = ${pointer1} % ${pointer2};`, comment); // pointer = pointer1 % pointer2;
    }

    public appendStackPointerPlusValue(
        value: string,
        comment: string = "") {
        this.appendLine(`${this.pointer} = P + ${value};`, comment); // pointer = P + value;
    }

    public appendHeapPointerPlusValue(
        value: string,
        comment: string = ""
    ) {
        this.appendLine(`${this.pointer} = H + ${value}`, comment); // pointer = H + value;
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
    }

    public appendJNE(
        pointer1: string,
        pointer2: string,
        label: string,
        comment: string = ""
    ) {
        this.appendLine(`if(${pointer1} != ${pointer2}) goto ${label};`, comment); //if(pointer1 != pointer2) goto label;
    }

    public appendJG(
        pointer1: string,
        pointer2: string,
        label: string,
        comment: string = ""
    ) {
        this.appendLine(`if(${pointer1} > ${pointer2}) goto ${label};`, comment); //if(pointer1 > pointer2) goto label;
    }

    public appendJL(
        pointer1: string,
        pointer2: string,
        label: string,
        comment: string = ""
    ) {
        this.appendLine(`if(${pointer1} < ${pointer2}) goto ${label};`, comment); //if(pointer1 < pointer2) goto label;
    }

    public appendJGE(
        pointer1: string,
        pointer2: string,
        label: string,
        comment: string = ""
    ) {
        this.appendLine(`if(${pointer1} >= ${pointer2}) goto ${label};`, comment); //if(pointer1 >= pointer2) goto label;
    }

    public appendJLE(
        pointer1: string,
        pointer2: string,
        label: string,
        comment: string = ""
    ) {
        this.appendLine(`if(${pointer1} <= ${pointer2}) goto ${label};`, comment); //if(pointer1 <= pointer2) goto label;
    }

    public appendAsignToStackPosition(
        position: string,
        value: string,
        comment: string = ""
    ) {
        this.appendLine(`STACK[${position}] = ${value};`, comment); // STACK [position] = value;
    }

    public appendAsignToHeapPosition(
        position: string,
        value: string,
        comment: string = ""
    ) {
        this.appendLine(`HEAP[${position}] = ${value};`, comment); // HEAP [position] = value;
    }

    public appendAddToStackPointer(
        value: string,
        comment: string = ""
    ) {
        this.appendLine(`P = P + ${value};`, comment);
    }

    public appendAddToHeapPointer(
        value: string,
        comment: string = ""
    ) {
        this.appendLine(`H = H + ${value};`, comment);
    }

    public appendSubToStackPointer(
        value: string,
        comment: string = ""
    ) {
        this.appendLine(`P = P - ${value};`, comment);
    }

    public appendSubToHeapPointer(
        value: string,
        comment: string = ""
    ) {
        this.appendLine(`H = H - ${value};`, comment);
    }

    public GetFromStack(
        position: string,
        comment: string = ""
    ) {
        this.appendLine(`${this.pointer} = STACK[${position}];`, comment); // pointer = STACK [position];
    }

    public GetFromHeap(
        position: string,
        comment: string = ""
    ) {
        this.appendLine(`${this.pointer} = HEAP[${position}];`, comment); // pointer = STACK [position];
    }

    public appendMethodStart(
        name: string,
        comment: string = ""
    ) {
        this.isProc = true;
        this.appendLine(`void ${name}(){`, comment);
    }

    public appendMethodEnd(
        comment: string = ""
    ) {
        this.appendLine(`return;`);
        this.appendLine(`}`, comment);
        this.isProc = false;
    }

    public appendMethodCall(
        name: string,
        comment: string = ""
    ) {
        this.appendLine(`${name}();`, comment);
    }

    public appendPrintChar(
        char: any,
        comment: string = ""
    ) {
        this.appendLine(`print(%c, ${char});`, comment);
    }

    public appendPrintInt(
        int: any,
        comment: string = ""
    ) {
        this.appendLine(`print(%e, ${int});`, comment);
    }

    public appendPrintDouble(
        double: any,
        comment: string = ""
    ) {
        this.appendLine(`print(%d, ${double});`, comment);
    }

    public ValueToStringCode(): Code {
        const toStringCode = new Code(this);
        let type = this.value.typo;
        type = type.toUpperCase();
        switch (type) {
            case "NUMBER":
                toStringCode.appendPrintInt(this.getPointer());
                break;
            case "BOOLEAN":
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
        }
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
    public setPointer = (pointer: string) => this.pointer = pointer;

    public getText = () => this.lines.join('\n').trim();
    public getASMText = () => this.asmLines.join('\n').trim();
    public getASMProcText = () => this.asmProcLines.join('\n').trim();

    public getLines = () => this.lines;
    public getASMLines = () => this.asmLines;
    public getASMProcLines = () => this.asmProcLines;
}