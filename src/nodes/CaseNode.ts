import {Op} from "../utils/Op";
import {Position} from "../utils/ErrorsControl";

export class CaseNode {
    private readonly conditionValue: Op;
    private readonly sentences: Array<Op>;
    private readonly position: Position;

    constructor(position: any, conditionValue: Op, sentences: Array<Op>) {
        this.conditionValue = conditionValue;
        this.sentences = sentences;
        this.position = position;
    }

    public getConditionValue(): Op {
        return this.conditionValue;
    }

    public getSentences(): Array<Op> {
        return this.sentences;
    }
}