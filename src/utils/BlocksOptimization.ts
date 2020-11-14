import {Code} from "./C3D/Code";
import {BlocksControlReport} from "./BlocksControlReport";

export function OpimizarionByBlocks(code: Code): Code {
    const Blocks = new Array<Code>();

    let blockLines = new Array<string>();

    let index = 0;
    let codeLines = code.getLines();
    while (index < codeLines.length) {
        let line = codeLines[index];

        if (line.startsWith("goto")) {
            Blocks.push(new Code(...blockLines));
            blockLines = new Array<string>();
            Blocks.push(new Code(...[line]));
        } else if (line.startsWith("if")) {
            Blocks.push(new Code(...blockLines));
            blockLines = new Array<string>();
            Blocks.push(new Code(...[line]));
        }
        else if (!line.startsWith("L")) {
            blockLines.push(line);
        } else {
            Blocks.push(new Code(...blockLines));
            blockLines = new Array<string>();
            blockLines.push(line);
        }
        index++;
        if (index == codeLines.length) {
            Blocks.push(new Code(...blockLines));
        }
    }

    //REGLA 1
    for (let i = 0; i<Blocks.length; i++) {
        let block = Blocks[i];
        if (block.getText().startsWith("goto")) {
            let tmpBlock = Blocks[i + 1];
            let containsLabel = false;
            for (let line of tmpBlock.getLines()) {
                if (line.startsWith("L")) {
                    containsLabel = true;
                }
            }
            if (!containsLabel) {
                Blocks[i + 1].CommentMe(1);
            }
        }
    }

    for (let i = 0; i<Blocks.length; i++) {
        let block = Blocks[i];
        if (block.getText().startsWith("if")) {
            let header = block.getLines()[0]
            let parts = header.split(" ");
            let p1 = parts[0].split("(")[1];
            let sign = parts[1];
            let p2 = parts[2].split(")")[0];
            let lbl = parts[4].split(";")[0];
            if (p1.startsWith("t") || p2.startsWith("t")) {

            }
            else if (compare(p1, p2, sign)) {
                block.CommentMe(3, true);
            }else{
                block.CommentMe(4);
            }
        }
    }

    function compare(p1s: string, p2s: string, sign: string): boolean {
        let p1 = +p1s;
        let p2 = +p2s;
        switch (sign) {
            case "==":
                return p1 == p2;
            case "!=":
                return p1 != p2;
            case "<":
                return p1 < p2;
            case ">":
                return p1 > p2;
            case "<=":
                return p1 <= p2;
            case ">=":
                return p1 >= p2;
            default:
                return false;
        }
    }

    for (let block of Blocks) {
        BlocksControlReport.AddBlock(block.getText());
    }

    const retCode = new Code(...Blocks);
    return retCode;
}
