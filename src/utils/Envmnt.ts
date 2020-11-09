import {Cntnr} from "./Cntnr";
import {Op} from "./Op";
import {BreakObj} from "../nodes/BreakObj";
import {ReturnObj} from "../nodes/ReturnObj";
import {ContinueObj} from "../nodes/ContinueObj";
import {DeclareFunNode} from "../nodes/DeclareFunNode";
import {DeclareTypeStructureNode} from "../nodes/DeclareTypeStructureNode";
import {GraphvizNode} from "./GraphvizNode";
import {Graficar_ts} from "./nativeFunctions/graficar_ts";
import {Code} from "./C3D/Code";
import {DeclareVarListNode} from "../nodes/DeclareVarListNode";

export class Envmnt extends Cntnr {
    public readonly Extra = new Map<string, any>();
    private readonly operations: Array<Op>;

    constructor(owner: Cntnr, operations: Array<Op>, startLabel: string = "", endLabel: string = "", exitLabel = "", returnVarRefName = "") {
        super(owner);
        this.operations = operations;
        this.StartLabel = startLabel;
        this.EndLabel = endLabel;
        this.ExitLabel = owner ? owner.ExitLabel !== "" ? owner.ExitLabel : exitLabel : exitLabel;
        this.returnVarRefName = owner ? owner.returnVarRefName !== "" ? owner.returnVarRefName : returnVarRefName : returnVarRefName;
        this.typo = "Ambito";
        if(returnVarRefName!="") {
            this.Declare("graficar_ts", new Graficar_ts(), true);
        }
    }

    public GO_ALL(): Cntnr {
        for (let op of this.operations) {
            if (op instanceof DeclareFunNode || op instanceof DeclareTypeStructureNode) {
                try {
                    op.Exe(this);
                } catch (e) {
                    console.log(e.message)
                }
            }
        }
        for (let op of this.operations) {
            if (!(op instanceof DeclareFunNode || op instanceof DeclareTypeStructureNode)) {
                try {
                    let result = op.Exe(this);
                    if (result instanceof BreakObj || result instanceof ReturnObj || result instanceof ContinueObj) {
                        return result as Cntnr;
                    }
                } catch (e) {
                    console.log(e.message, op)
                }
            }
        }
        return null;
    }

    public GetGraph(): GraphvizNode {
        console.log('aver');
        return new GraphvizNode('ROOT', this.operations.map(operation => operation.GetGraph(this)));
    }

    public GetSentences(): Array<Op> {
        return this.operations;
    }

    public GO_ALL_TYPES(env: Envmnt = null): Code {
        const codeAns = new Code();
        for (let op of this.operations) {
            if (op instanceof DeclareTypeStructureNode) {
                try {
                    const result = op.ExeCode(env ? env : this);
                    codeAns.append(result);
                } catch (e) {
                    console.log(e.message)
                }
            }
        }
        return codeAns;
    }

    public GO_ALL_GLOBAL_VAR(env: Envmnt = null): Code {
        const codeAns = new Code();
        for (let op of this.operations) {
            if (op instanceof DeclareVarListNode && env === null) {
                try {
                    const result = op.ExeCode(env ? env : this);
                    codeAns.append(result);
                } catch (e) {
                    console.log(e.message)
                }
            }
        }
        return codeAns;
    }

    public GO_ALL_CODE_FUN(env: Envmnt = null): Code {
        const codeFunctions = new Code();
        for (let op of this.operations) {
            if (op instanceof DeclareFunNode) {
                try {
                    const result = op.ExeCode(env ? env : this);
                    codeFunctions.append(result);
                } catch (e) {
                    console.log(e.message)
                }
            }
        }
        return codeFunctions;
    }

    public GO_ALL_CODE(env: Envmnt = null): Code {
        const codeMain = new Code();
        for (let op of this.operations) {
            if (!(op instanceof DeclareFunNode || op instanceof DeclareTypeStructureNode)) {
                try {
                    const result = op.ExeCode(env ? env : this);
                    codeMain.append(result);
                } catch (e) {
                    console.log(e.message, op);
                }
            }
        }
        return codeMain;
    }
}
