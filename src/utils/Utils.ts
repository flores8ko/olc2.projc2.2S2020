import {BOOLEAN, NULL, OBJECT, UNDEFINED} from "./PrimitiveTypoContainer";
import {Cntnr} from "./Cntnr";
import {Envmnt} from "./Envmnt";
import {Op} from "./Op";
import {Reference} from "./Reference";
import {BreakObj} from "../nodes/BreakObj";
import {ReturnObj} from "../nodes/ReturnObj";
import {ContinueObj} from "../nodes/ContinueObj";
import {TSGraphControl} from "./TSGraphControl";
import {ErrorsControl, Position} from "./ErrorsControl";

export class SemanticException extends Error {
    constructor(message?: string, position: Position = new Position()) {
        super(message);
        ErrorsControl.AddError(position.first_line, position.first_column, '', message, 'SEMANTIC');
    }
}

export class ErrorCompo extends Error {
    constructor(message?: string, position: Position = new Position()) {
        super(message);
        ErrorsControl.AddError(position.first_line, position.first_column, '', message, 'SEMANTIC');
    }
}

export function DefaultValue(typo: string): Cntnr {
    if (IsPrimitiveTypo(typo)) {
        return new UNDEFINED();
    }
    return GetObjectValue(typo);
}

export function IsPrimitiveTypo(typo: string): boolean {
    typo = typo.toUpperCase();
    switch (typo) {
        case "STRING":
        case "NUMBER":
        case "BOOLEAN":
        case "ANY":
        case "ARRAY":
        case "NULL":
        case "UNDEFINED":
            return true;
        default:
            return false;
    }
}

export function GetObjectValue(typo: string): Cntnr {
    typo = typo.toUpperCase();
    let structure: ObjectStructure = ObjectsStructures.objects.get(typo);
    if (structure === null || structure === undefined) {
        throw new SemanticException(`No existe una definicion para el tipo ${typo}`);
    }
    return structure.GetDefaultValue();
}

export function FindVar(cont: Cntnr, identifier: string): Cntnr {
    let ownerCntnr = cont;

    while (ownerCntnr != null){
        if(ownerCntnr.GetProperty(identifier) !== undefined){
            return ownerCntnr.GetProperty(identifier);
        }
        ownerCntnr = ownerCntnr.GetOwner();
    }

    throw  new SemanticException(`identificador ${identifier} no encontrado`);
}

export function TSGraph(envmnt: Cntnr): string {
    let ownerCntnr = envmnt;
    while (true) {
        if (ownerCntnr.GetOwner() == null) {
            break;
        }
        ownerCntnr = ownerCntnr.GetOwner();
    }
    return ownerCntnr.GetTSGraph('global');
}

export function TSGraph2(sentences: Array<Op>): string {
    let value = '';
    const graphId = TSGraphControl.GetGraphId();
    value += `subgraph cluster_${graphId} { \n`;
        value += 'style=filled;\n' +
            'color="#2BBBAD";\n' +
            'fillcolor="#1E222A";\n';
        value += 'node [color="#2BBBAD" fontcolor="#2BBBAD" shape="rectangle"] \n';
    sentences.forEach(sentence => {
        value += sentence.GetTSGraph();
    });
    value += `label = "${'GLOBAL'}";\n`;
    value += `}\n`
    return value;
}

export function PassPropsAndFuncs(father: Envmnt, son: Envmnt) {
    // father.props.forEach((v, k) => {
    //     son.Declare(k, v);
    // });
}

export function LogicWhile(env: Envmnt, condition: Op, sentences: Array<Op>, extra: Op) {
    let ans = condition.Exe(env);
    if (ans instanceof Reference) {
        ans = (ans as Reference).getValue();
    }

    if (!(ans instanceof BOOLEAN)) {
        throw new SemanticException("Condicion utilizada en ciclo while no soportada");
    }

    let tmp = ans as BOOLEAN;
    while (tmp.getValue()) {
        const env0 = new Envmnt(env, sentences);
        PassPropsAndFuncs(env, env0);
        const ret = env0.GO_ALL();

        if (ret instanceof BreakObj) {
            break;
        }
        if (ret instanceof ReturnObj) {
            return ret;
        }
        if(ret instanceof ContinueObj){
            continue;
        }

        if (extra !== null) {
            extra.Exe(env);
        }

        let ans0 = condition.Exe(env);
        if (ans0 instanceof Reference) {
            ans0 = (ans0 as Reference).getValue();
        }
        tmp = ans0 as BOOLEAN;
    }
    return null;
}

export function LogicDoWhile(env: Envmnt, condition: Op, sentences: Array<Op>, extra: Op) {
    let ans = condition.Exe(env);
    if (ans instanceof Reference) {
        ans = (ans as Reference).getValue();
    }

    if (!(ans instanceof BOOLEAN)) {
        throw new SemanticException("Condicion utilizada en ciclo while no soportada");
    }

    let env0 = new Envmnt(env, sentences);
    PassPropsAndFuncs(env, env0);
    env0.GO_ALL();

    let ans0 = condition.Exe(env);
    if (ans0 instanceof Reference) {
        ans0 = (ans0 as Reference).getValue();
    }
    let tmp = ans0 as BOOLEAN;

    while (tmp.getValue()) {
        const env0 = new Envmnt(env, sentences);
        PassPropsAndFuncs(env, env0);
        const ret = env0.GO_ALL();

        if (ret instanceof BreakObj) {
            break;
        }
        if (ret instanceof ReturnObj) {
            return ret;
        }
        if(ret instanceof ContinueObj){
            continue;
        }

        if (extra !== null) {
            extra.Exe(env);
        }

        let ans0 = condition.Exe(env);
        if (ans0 instanceof Reference) {
            ans0 = (ans0 as Reference).getValue();
        }
        tmp = ans0 as BOOLEAN;
    }
    return null;
}

export class MyMap {
    private readonly map: Map<any, any>;

    constructor() {
        this.map = new Map<any, any>();
    }

    getMap() {
        return this.map;
    }

    addEntry(key: any, value: any) {
        this.map.set(key, value);
    }
}

export class ObjectStructure {
    private readonly properties: Map<string, string>;

    constructor(properties: Map<string, string>) {
        this.properties = properties;
    }

    GetDefaultValue(): Cntnr{
        const attributes: Map<string, Cntnr> = new Map<string, Cntnr>();
        this.properties.forEach((v, k) => {
            attributes.set(k, new UNDEFINED());
        });
        return new OBJECT(attributes);
    }
}

export class ObjectsStructures{
    public static objects: Map<string, ObjectStructure> = new Map<string, ObjectStructure>();
}
