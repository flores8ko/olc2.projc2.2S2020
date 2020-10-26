import {Op} from "../utils/Op";
import {Envmnt} from "../utils/Envmnt";
import {Cntnr} from "../utils/Cntnr";
import {Reference} from "../utils/Reference";
import {FunctionRepresent} from "../utils/functions/FunctionRepresent";
import {ReturnObj} from "./ReturnObj";
import {UNDEFINED} from "../utils/PrimitiveTypoContainer";
import {IsPrimitiveTypo, SemanticException} from "../utils/Utils";
import {UserDefined} from "../utils/functions/UserDefined";
import {GraphvizNode} from "../utils/GraphvizNode";
import { Code } from "../utils/C3D/Code";
import {CreateIdVarNode} from "./CreateIdVarNode";
import {Tmp} from "../utils/C3D/Tmp";

export class FunctionCallNode extends Op {
    private readonly name: Op;
    private readonly args: Array<Op>;

    constructor(position: any, name: Op, args: Array<Op>) {
        super(position);
        this.name = name;
        this.args = args;
    }

    public GOCode(env: Envmnt): Code {
        const codeAns = new Code();

        let id = this.name.Exe(env);
        if (id instanceof Reference) {
            id = (id as Reference).getValue();
        }
        if (id instanceof FunctionRepresent) {
            let funct = (id as UserDefined);
            let functName = (this.name as CreateIdVarNode).GetId();
            let positions = env.GetEnvmtOfset();
            codeAns.appendSplitComment(`start call ${functName}`);
            codeAns.setPointer("P");
            codeAns.appendSuma("P", positions+"");
            codeAns.appendMethodCall(functName, "llamada a funcion");
            codeAns.setPointer(Tmp.newTmp());
            codeAns.appendValueToPointer("P", "valor de retorno");
            codeAns.appendResta("P", positions+"");
            codeAns.appendSplitComment(`end call ${functName}`);
            codeAns.setValue(new Reference(funct.type));
        }
        return codeAns;
    }

    GO(env: Envmnt): object {
        let id = this.name.Exe(env);
        if (id instanceof Reference) {
            id = (id as Reference).getValue();
        }

        const argsValues = new Array<Cntnr>();
        for (let arg of this.args) {
            let ans = arg.Exe(env);
            if (ans instanceof Reference) {
                ans = (ans as Reference).getValue();
            }
            argsValues.push(ans as Cntnr);
        }

        if (id instanceof FunctionRepresent) {
            let funct = (id as UserDefined);
            let ans = funct.EXE(env, argsValues);
            if (ans instanceof ReturnObj) {
                let ret = (ans as ReturnObj).getValue();
                if (ret instanceof Reference) {
                    ret = (ret as Reference).getValue();
                }
                if(funct.getType() !== ret.typo
                    && funct.getType() !== 'ANY'
                    && ret.typo !== 'NULL'
                    && ret.typo !== 'UNDEFINED'
                    && ret.typo !== 'OBJECT'
                    || (IsPrimitiveTypo(funct.getType()) && ret.typo === 'OBJECT')
                ) {
                    throw new SemanticException(`Se esperaba retorno de tipo ${funct.getType()}, se retorno tipo ${ret.typo}`, this.position);
                }
                return (ans as ReturnObj).getValue();
            }
        }
        return new UNDEFINED();
    }

    GetGraph(env: Envmnt): GraphvizNode {
        return new GraphvizNode('FUNCTION_CALL', [this.name.GetGraph(env), new GraphvizNode('ARGS', this.args.map(arg => arg.GetGraph(env)))]);
    }

    GetTSGraph(): string {
        return "";
    }
}
