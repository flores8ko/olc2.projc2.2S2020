import {Op} from "../utils/Op";
import {Envmnt} from "../utils/Envmnt";
import {MyMap, ObjectsStructures, ObjectStructure} from "../utils/Utils";
import {GraphvizNode} from "../utils/GraphvizNode";

export class DeclareTypeStructureNode extends Op{
    private readonly name: string;
    private readonly properties: Map<string, string>;

    constructor(position: any, name: string, properties: MyMap) {
        super(position);
        this.name = name;
        this.properties = (properties as MyMap).getMap();
    }

    GO(env: Envmnt): object {
        const structure = new ObjectStructure(this.properties);
        ObjectsStructures.objects.set(this.name.toUpperCase(), structure);
        return undefined;
    }

    GetGraph(env: Envmnt): GraphvizNode {
        let values: GraphvizNode[] = [];
        this.properties.forEach((v, k) => {
            values.push(new GraphvizNode(k));
            values.push(new GraphvizNode(v));
        });
        return new GraphvizNode('NEW_TYPE', [new GraphvizNode(this.name), new GraphvizNode('VALUES', values)]);
    }

    GetTSGraph(): string {
        return "";
    }
}
