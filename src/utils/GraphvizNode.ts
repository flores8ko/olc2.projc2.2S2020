import {NodesControl} from "./NodesControl";

export class GraphvizNode {
    private readonly label: string;
    private readonly childs: GraphvizNode[];
    private readonly id: string;

    constructor(label: string, childs: GraphvizNode[] = []) {
        this.label = label;
        this.childs = childs;
        this.id = `n${NodesControl.GetNodeId()}`;
    }

    GetId = (): string => this.id;

    toString = (): string => {
        let value = `${this.id} [label="${this.label}"];\n`;
        this.childs.forEach(child => {
            value += `${this.id} -> ${child.GetId()};\n`;
        });
        this.childs.forEach(child => {
            value += child;
        });
        return value;
    };
}