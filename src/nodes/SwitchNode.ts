import {Op} from "../utils/Op";
import {Envmnt} from "../utils/Envmnt";
import {Igual} from "../utils/RelationalOperationsFunctions";
import {Cntnr} from "../utils/Cntnr";
import {BOOLEAN} from "../utils/PrimitiveTypoContainer";
import {BreakNode} from "./BreakNode";
import {BreakObj} from "./BreakObj";
import {ReturnObj} from "./ReturnObj";
import {ContinueObj} from "./ContinueObj";
import {CaseNode} from "./CaseNode";
import {SemanticException} from "../utils/Utils";
import {GraphvizNode} from "../utils/GraphvizNode";

export class SwitchNode extends Op {
    private readonly condition: Op;
    private readonly cases: Array<CaseNode>;

    constructor(position: any, condition: Op, cases: Array<CaseNode>) {
        super(position);
        this.condition = condition;
        this.cases = cases;
    }

    GO(env: Envmnt): object {
        let condition = this.condition.Exe(env);
        let ret: Cntnr = undefined;
        let hasEnter = false;

        let defaultCount = 0;
        for (let Case of this.cases) {
            if (Case.getConditionValue() === null) {
                defaultCount++;
            }
        }

        if (defaultCount > 1) {
            throw new SemanticException("No pueden exisistir mas de una sentencia 'default' dentro de un ciclo switch", this.position);
        }

        for (let Case of this.cases) {
            if (ret instanceof BreakObj) {
                break;
            }
            if (ret instanceof ReturnObj) {
                return ret;
            }
            if (ret instanceof ContinueObj) {
                continue;
            }

            if(Case.getConditionValue() !== null) {
                let caseValue = Case.getConditionValue().Exe(env);
                if (!(Igual(condition as Cntnr, caseValue as Cntnr, this.position) as BOOLEAN).getValue() && !hasEnter) {
                    continue;
                }
            }

            const env0 = new Envmnt(env, Case.getSentences());
            ret = env0.GO_ALL();
            hasEnter = true;

            if (ret instanceof BreakObj) {
                break;
            }
            if (ret instanceof ReturnObj) {
                return ret;
            }
        }
        return undefined;
    }

    GetGraph(env: Envmnt): GraphvizNode {
        return new GraphvizNode('SWTICH', [
            this.condition.GetGraph(env),
            new GraphvizNode('SWITCH_BODY', this.cases.map(casee =>
                new GraphvizNode('CASE', [
                    casee.getConditionValue() ? casee.getConditionValue().GetGraph(env) : new GraphvizNode('UNDEFINED'),
                    new GraphvizNode('SENTENCES', casee.getSentences().map(sentence => sentence.GetGraph(env)))
                ])))
        ]);
    }

    GetTSGraph(): string {
        return "";
    }

}
