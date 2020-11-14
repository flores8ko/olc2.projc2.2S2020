export class BlocksControlReport{
    private static blocks: Array<string> = new Array<string>();

    public static clearSTrucutres() {
        BlocksControlReport.blocks = new Array<string>();
    }

    public static GetBlocks(): Array<string> {
        return BlocksControlReport.blocks;
    }

    public static AddBlock(
        block: string
    ) {
        if (block == "") {
            return;
        }
        this.blocks.push(block.replace(/\\n/g, "&#13;&#10;       ").replace(/\\t/g, "&#9;"));
    }
}
