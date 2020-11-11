import {Code} from "./C3D/Code";

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
        } else if (!line.startsWith("L")) {
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


    const retCode = new Code(...Blocks);
    return retCode;
}
