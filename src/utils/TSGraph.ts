export class TSGraph{
    public tables: Array<TSTable>;
    constructor(tables = new Array<TSTable>()) {
        this.tables = tables;
    }

    AddTable(table: TSTable) {
        this.tables.push(table);
    }
}

class TSTable{
    public rows: Array<TSRow>;
    constructor(rows = new Array<TSRow>()) {
        this.rows = rows;
    }

    AddRow(row: TSRow) {
        this.rows.push(row);
    }
}

class TSRow {
    public simbolo: string;
    public padre: string;

    constructor(padre: string, simbolo: string) {
        this.simbolo = simbolo;
        this.padre = padre;
    }
}