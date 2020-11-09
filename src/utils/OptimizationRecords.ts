export class OptimizationRecords {
    private static records: Array<OptimizationRecord> = new Array<OptimizationRecord>();

    public static clearRecords() {
        OptimizationRecords.records = new Array<OptimizationRecord>();
    }

    public static GetRecords(): Array<OptimizationRecord> {
        return OptimizationRecords.records;
    }

    public static AddRecord(
        prevLine: string,
        newLine: string,
        rule: number,
        lineNo: number = 0
    ): void{
        OptimizationRecords.records.push(
            new OptimizationRecord(
                prevLine,
                newLine,
                rule,
                lineNo
            )
        );
    }
}

export class OptimizationRecord {
    private readonly prevLine: string;
    private readonly newLine: string;
    private rule: number;
    private lineNo: number;

    constructor(
        prevLine: string,
        newLine: string,
        rule: number,
        lineNo: number = 0
    ) {
        this.prevLine = prevLine;
        this.newLine = newLine;
        this.rule = rule;
        this.lineNo = lineNo;
    }
}
