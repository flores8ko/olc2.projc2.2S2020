export class ErrorsControl {
    private static errors: Array<Error> = new Array<Error>();

    public static clearStructures() {
        ErrorsControl.errors = new Array<Error>();
    }

    public static GetErrors(): Array<Error> {
        return ErrorsControl.errors;
    }

    public static AddError(
        row: number,
        column: number,
        expected: string,
        obtained: string,
        typo: string,
    ): void {
        this.errors.push(new Error(
            row,
            column,
            expected,
            obtained,
            typo
        ));
    }
}

export class Error {
    private readonly row: number;
    private readonly column: number;
    private readonly expected: string;
    private readonly obtained: string;
    private readonly typo: string;

    constructor(
        row: number,
        column: number,
        expected: string,
        obtained: string,
        typo: string,
    ) {
        this.row = row;
        this.column = column;
        this.expected = expected;
        this.obtained = obtained;
        this.typo = typo;
    }
}

export class Position {
    public first_line: number;
    public last_line: number;
    public first_column: number;
    public last_column: number;

    constructor() {
        this.first_column = -1;
        this.first_line = -1;
        this.last_column = -1;
        this.last_line = -1;
    }
}