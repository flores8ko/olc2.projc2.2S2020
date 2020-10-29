import {Reference} from "./Reference";
import {TSGraphControl} from "./TSGraphControl";

export abstract class Cntnr {
    private readonly owner: Cntnr;
    public readonly props = new Map<string, Cntnr>();
    public readonly propsOrder: Array<string> = new Array<string>();
    public typo: string;
    public returnVarRefName: string;
    public StartLabel: string;
    public EndLabel: string;
    public ExitLabel: string;

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
        const val = this.props.get(id);
        if (val !== null && val !== undefined) {
            return val;
        }

        //this.props.set(id, new Reference());
        //return this.props.get(id);
        return undefined;
    }

    public FatherPropertiesSize(): number {
        let propertiesTotal = 0;
        let ownerCntnr = this.owner;
        while (ownerCntnr != null) {
            propertiesTotal += ownerCntnr.propsOrder.length;
            ownerCntnr = ownerCntnr.GetOwner();
        }
        return propertiesTotal;
    }

    public GetPropertyIndex(id: string): number{
        id = id.toUpperCase();
        const val = this.propsOrder.indexOf(id);
        return val !== -1 ? val + this.FatherPropertiesSize() : this.owner.GetPropertyIndex(id);
    }

    public GetEnvmtOfset() {
        let val = this.propsOrder.length;
        let ownerCntnr = this.owner;
        while (ownerCntnr != null) {
            val += ownerCntnr.propsOrder.length;
            ownerCntnr = ownerCntnr.GetOwner();
        }
        return val;
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

    public Declare(id: string, cntnr: Cntnr, isFun = false): void {
        id = id.toUpperCase();
        this.props.set(id, cntnr);
        if(!isFun) {
            this.propsOrder.push(id);
        }
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
