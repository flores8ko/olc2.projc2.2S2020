import {Op} from "../utils/Op";
import {Envmnt} from "../utils/Envmnt";
import {ReturnObj} from "./ReturnObj";
import {Cntnr} from "../utils/Cntnr";
import {UNDEFINED} from "../utils/PrimitiveTypoContainer";
import {GraphvizNode} from "../utils/GraphvizNode";
import { Code } from "../utils/C3D/Code";
import {Tmp} from "../utils/C3D/Tmp";
import {GetReferenceValueCode} from "../utils/Utils";
import {Reference} from "../index";

export class ReturnNode extends Op {
    private readonly value: Op;

    constructor(position: any, value: Op) {
        super(position);
        this.value = value;
    }

    public GOCode(env: Envmnt): Code {
        //let val = new UNDEFINED();
        const codeAns = new Code();
        codeAns.setPointer(Tmp.newTmp());

        let valCode = new Code();

        if(this.value !== null) {
            //val = this.value.Exe(env) as Cntnr;
            valCode = this.value.ExeCode(env);
            valCode = GetReferenceValueCode(valCode);
        }else{
            valCode.setPointer(Tmp.newTmp());
        }

        codeAns.setValue(new ReturnObj(valCode.getValue()));
        //TODO asignar valor de return a punto de retorno en funcion.
        let index = env.GetPropertyIndex(env.returnVarRefName);

        const codeAsign = new Code(valCode);
        codeAns.appendStackPointerPlusValue(index, "return pointer to stack");
        codeAsign.appendLine(`${codeAns.getPointer()} = P;`);
        codeAsign.appendAsignToStackPosition(codeAns.getPointer(), valCode.getPointer());
        codeAns.append(codeAsign);
        codeAns.appendJMP(env.ExitLabel !== "" ? env.ExitLabel: env.EndLabel);
        return codeAns;
    }

    GO(env: Envmnt): object {
        if(this.value !== null) {
            let value = this.value.Exe(env);
            if (value instanceof Reference) {
                value = (value as Reference).getValue();
            }
            return new ReturnObj(value as Cntnr);
        }
        return new ReturnObj(new UNDEFINED());
    }

    GetGraph(env: Envmnt): GraphvizNode {
        return new GraphvizNode('RETURN', this.value ? [this.value.GetGraph(env)]: []);
    }

    GetTSGraph(): string {
        return "";
    }

}
