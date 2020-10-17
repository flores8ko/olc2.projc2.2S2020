import {Reference} from "./Reference";
import {UNDEFINED} from "./PrimitiveTypoContainer";
import {TSGraphControl} from "./TSGraphControl";
import {FunctionRepresent} from "./functions/FunctionRepresent";
import {Native} from "./functions/Native";
import {UserDefined} from "./functions/UserDefined";

export abstract class Cntnr {
    private readonly owner: Cntnr;
    public readonly props = new Map<string, Cntnr>();
    public readonly propsOrder: Array<string> = new Array<string>();
    public typo: string;

    protected constructor(owner?: Cntnr) {
        this.owner = owner || null;
    }

    public AsObjectProps(): string {
        let ans = "--------------------------------\n";
        this.props.forEach((v, k) => {
            ans += k + ' => ' + v + '\n';
        });
        ans += "--------------------------------\n";
        return ans;
    }

    public AddProperty(id: string, cntnr: Cntnr): void {
        id = id.toUpperCase();
        this.props.set(id, cntnr);
        this.propsOrder.push(id);
    }

    public GetProperty(id: string): Cntnr {
        id = id.toUpperCase();
        console.log(id);
        console.log(this);
        const val = this.props.get(id);
        if (val !== null && val !== undefined) {
            return val;
        }

        //this.props.set(id, new Reference());
        //return this.props.get(id);
        return undefined;
    }

    public GetPropertyIndex(id: string): number{
        id = id.toUpperCase();
        const val = this.propsOrder.indexOf(id);
        return val !== -1 ? val : this.owner.GetPropertyIndex(id);
    }

    public GetTSGraph(owner: string = ''): string {
        let value = '';
        const graphId = TSGraphControl.GetGraphId();
        value += `subgraph cluster_${graphId} { \n`;
        value += 'style=filled;\n' +
                 'color=black;\n' +
                 'fillcolor="#1E222";\n';
        value += 'node [fillcolor="yellow" shape="rectangle"] \n';
        this.props.forEach((v, k) => {
            value += `n${TSGraphControl.GetNodeId()} [label="${k}"]\n`
        });
        value += `label = "${owner}";\n`;
        this.props.forEach((v, k) => {
            let vv = v;
            if (vv instanceof Reference) {
                vv = (vv as Reference).getValue();
            }
            value += vv.GetTSGraph(k);
        });
        value += `}\n`
        return value;
    }

    public Declare(id: string, cntnr: Cntnr): void {
        id = id.toUpperCase();
        this.props.set(id, cntnr);
        this.propsOrder.push(id);
    }

    public GetTypo(): string {
        return this.typo
    }

    public SetTypo(typo: string): void {
        this.typo = typo;
    }

    public GetOwner(): Cntnr {
        return this.owner;
    }
}
