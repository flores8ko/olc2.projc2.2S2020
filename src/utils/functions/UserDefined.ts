import {FunctionRepresent} from "./FunctionRepresent";
import {Op} from "../Op";
import {Envmnt} from "../Envmnt";
import {Cntnr} from "../Cntnr";
import {Reference} from "../Reference";
import {TSGraphControl} from "../TSGraphControl";
import {DeclareFunParamNode} from "../../nodes/DeclareFunParamNode";
import {Code} from "../C3D/Code";
import {Lbl} from "../C3D/Lbl";
import {DeclareVarNode} from "../../nodes/DeclareVarNode";
import {DeclareVarListNode} from "../../nodes/DeclareVarListNode";

export class UserDefined extends FunctionRepresent {
    private readonly src: Array<Op>;
    private readonly params: Array<Op>;
    public readonly type: string;

    constructor(src: Array<Op>, params: Array<Op>, type: string) {
        super();
        this.src = src;
        this.params = params;
        this.type = type.toUpperCase();
    }

    public getType(): string{
        return this.type;
    }

    public getSrc(): Array<Op> {
        return this.src;
    }

    EXE(env0: Envmnt, args: Array<Cntnr>): Cntnr {
        let env = new Envmnt(env0, this.src);
        const references: Array<Reference> = new Array<Reference>();
        for (let param of this.params) {
            references.push(param.Exe(env) as Reference);
        }
        for (let i = 0; i < args.length && i < references.length; i++) {
            references[i].PutValueOnReference(args[i]);
        }
        return env.GO_ALL();
    }

    public GetC3DCode(env: Envmnt, name: string) : Code{
        const codeAns = new Code();
        const exitLbl = Lbl.newLbl();
        const funEnv = new Envmnt(env, this.src, "", "", exitLbl, `$${name.toUpperCase()}`);
        codeAns.appendMethodStart(name, `start ${name}`);

        const l = new Array<Op>();
        l.push(new DeclareVarNode(null, `$${name}`));
        const a = new DeclareVarListNode(null, this.type.toUpperCase(), l);
        codeAns.append(a.ExeCode(funEnv));
        for (let p of this.params) {
            codeAns.append(p.ExeCode(funEnv))
        }
        codeAns.append(funEnv.GO_ALL_CODE());
        codeAns.appendLabel(exitLbl);
        codeAns.appendMethodEnd(`end ${name}`);
        codeAns.setValue(new Reference(this.type));
        return codeAns;
    }

    public GetTSGraph(owner: string = ''): string {
        let value = '';
        const graphId = TSGraphControl.GetGraphId();
        value += `subgraph cluster_${graphId} { \n`;
        value += 'style=filled;\n' +
            'color="#2BBBAD";\n' +
            'fillcolor="#1E222A";\n';
        value += 'node [color="#2BBBAD" fontcolor="#2BBBAD" shape="rectangle"] \n';
        this.params.forEach((v) => {
            value += `n${TSGraphControl.GetNodeId()} [label="${(v as DeclareFunParamNode).GetName()}"]\n`
        });
        value += `label = "${owner.toUpperCase()}";\n`;
        this.props.forEach((v, k) => {
            let vv = v;
            if (vv instanceof Reference) {
                vv = (vv as Reference).getValue();
            }
            console.log(vv);
            value += vv.GetTSGraph(k);
        });
        value += `}\n`;
        return value;
    }
}
