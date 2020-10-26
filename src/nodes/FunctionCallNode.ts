import {Op} from "../utils/Op";
import {Envmnt} from "../utils/Envmnt";
import {Cntnr} from "../utils/Cntnr";
import {Reference} from "../utils/Reference";
import {FunctionRepresent} from "../utils/functions/FunctionRepresent";
import {ReturnObj} from "./ReturnObj";
import {UNDEFINED} from "../utils/PrimitiveTypoContainer";
import {GetReferenceValueCode, IsPrimitiveTypo, SemanticException} from "../utils/Utils";
import {UserDefined} from "../utils/functions/UserDefined";
import {GraphvizNode} from "../utils/GraphvizNode";
import {Code} from "../utils/C3D/Code";
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

            const val = new Reference(funct.type, false, true);
            codeAns.setValue(val);



            codeAns.appendSplitComment(`start call ${functName}`);
            codeAns.setPointer("P");

            let codeArgs = new Code();
            const argsValues = new Array<Code>();
            codeArgs.setPointer(Tmp.newTmp());
            let argsIndex = 1;

            for (let arg of this.args) {
                let argValue = arg.ExeCode(env);
                argValue = GetReferenceValueCode(argValue);
                codeAns.append(argValue);
                argsValues.push(argValue);
            }

            codeAns.appendSuma("P", positions + "");
            codeArgs = new Code();
            codeArgs.setPointer(Tmp.newTmp());
            codeArgs.appendValueToPointer("P", "control de argumentos");
            argsIndex = 1;
            for (let arg of this.args) {
                let argValue = argsValues[argsIndex -1];
                codeArgs.appendSuma(codeArgs.getPointer(), "1", `argumento ${argsIndex}`);
                codeArgs.appendAsignToStackPosition(codeArgs.getPointer(), argValue.getPointer());
                argsIndex++;
            }

            codeAns.append(codeArgs);
            codeAns.appendMethodCall(functName, "llamada a funcion");
            const codeRet = new Code();
            codeRet.setPointer(Tmp.newTmp());
            codeRet.appendValueToPointer("P", "valor de retorno");
            codeAns.append(codeRet);
            codeAns.setPointer("P");
            codeAns.appendResta("P", positions + "");
            codeAns.setPointer(codeRet.getPointer());
            codeAns.appendSplitComment(`end call ${functName}`);
            codeAns.appendSplitComment("retorno " + funct.type);
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
                if (funct.getType() !== ret.typo
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
