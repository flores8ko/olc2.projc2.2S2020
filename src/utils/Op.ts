import {Envmnt} from "./Envmnt";
import {ErrorCompo} from "./Utils";
import {GraphvizNode} from "./GraphvizNode";
import {Position} from "./ErrorsControl";

export abstract class Op {
    public Exe(env: Envmnt): object{
        try{
            return this.GO(env);
        }catch (e) {
            throw new ErrorCompo(e.message);
        }
    }
    public readonly position: Position;

    constructor(position: Position = new Position()) {
        this.position = position;
    }

    public abstract GO(env: Envmnt): object;

    public abstract GetGraph(env: Envmnt): GraphvizNode;

    public abstract GetTSGraph(): string;
}
