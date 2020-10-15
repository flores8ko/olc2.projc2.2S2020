export class TSGraphControl {
    private static graphIdCount = 0;
    public static GetGraphId = () => TSGraphControl.graphIdCount++;

    private static nodeIdCount = 0;
    public static GetNodeId = () => TSGraphControl.nodeIdCount++;

    private static graphStrings = new Array<string>();
    public static AddGraphString = (graph: string) => TSGraphControl.graphStrings.push(graph);
    public static GetGetGraphsString = (): string => TSGraphControl.graphStrings.join('\n');

    public static clearStructures() {
        TSGraphControl.graphIdCount = 0;
        TSGraphControl.nodeIdCount = 0;
        TSGraphControl.graphStrings = new Array<string>();
    }
}
