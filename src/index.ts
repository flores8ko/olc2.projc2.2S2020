import {Reference} from "./utils/Reference";
import {UNDEFINED, NULL} from "./utils/PrimitiveTypoContainer";
import {Envmnt} from "./utils/Envmnt";
import {Cntnr} from "./utils/Cntnr";
import {Op} from "./utils/Op";
import {Console} from "./utils/Console";

import {ConsoleLogNode} from "./nodes/ConsoleLogNode";
import {NumberNode} from "./nodes/NumberNode";
import {StringNode} from "./nodes/StringNode";
import {BooleanNode} from "./nodes/BooleanNode";
import {NullNode} from "./nodes/NullNode";
import {UndefinedNode} from "./nodes/UndefinedNode";
import {DeclareVarNode} from "./nodes/DeclareVarNode";
import {DeclareVarListNode} from "./nodes/DeclareVarListNode";
import {CreateIdVarNode} from "./nodes/CreateIdVarNode";
import {AsignNode} from "./nodes/AsignNode";
import {SumNode} from "./nodes/SumNode";
import {SubNode} from "./nodes/SubNode";
import {MulNode} from "./nodes/MulNode";
import {DivNode} from "./nodes/DivNode";
import {ModNode} from "./nodes/ModNode";
import {ExpNode} from "./nodes/ExpNode";
import {EqNode} from "./nodes/EqNode";
import {DifNode} from "./nodes/DifNode";
import {HigherNode} from "./nodes/HigherNode";
import {MinorNode} from "./nodes/MinorNode";
import {HigherEqNode} from "./nodes/HigherEqNode";
import {MinorEqNode} from "./nodes/MinorEqNode";
import {OrNode} from "./nodes/OrNode";
import {AndNode} from "./nodes/AndNode";
import {NotNode} from "./nodes/NotNode";
import {ReAsignAddNode} from "./nodes/ReAsignAddNode";
import {ReAsignSubNode} from "./nodes/ReAsignSubNode";
import {ReAsignMulNode} from "./nodes/ReAsignMulNode";
import {ReAsignDivNode} from "./nodes/ReAsignDivNode";
import {ReAsignModNode} from "./nodes/ReAsignModNode";
import {ReAddNode} from "./nodes/ReAddNode";
import {ReSubNode} from "./nodes/ReSubNode";
import {CreateArrayNode} from "./nodes/CreateArrayNode";
import {CreateArrVarNode} from "./nodes/CreateArrVarNode";
import {ReturnObj} from "./nodes/ReturnObj";
import {CreateObjVarNode} from "./nodes/CreateObjVarNode";
import {CreateObjFunNode} from "./nodes/CreateObjFunNode";
import {SentenceTernaryNode} from "./nodes/SentenceTernaryNode";
import {BreakNode} from "./nodes/BreakNode";
import {ContinueNode} from "./nodes/ContinueNode";
import {IfNode} from "./nodes/IfNode";
import {WhileNode} from "./nodes/WhileNode";
import {DoWhileNode} from "./nodes/DoWhileNode";
import {CaseNode} from "./nodes/CaseNode";
import {SwitchNode} from "./nodes/SwitchNode";
import {ForInNode} from "./nodes/ForInNode";
import {ForOfNode} from "./nodes/ForOfNode";
import {ForNode} from "./nodes/ForNode";
import {MyMap, ObjectsStructures, ObjectStructure, TSGraph, TSGraph2} from "./utils/Utils";
import {CreateObjNode} from "./nodes/CreateObjNode";
import {DeclareTypeStructureNode} from "./nodes/DeclareTypeStructureNode";
import {DeclareFunNode} from "./nodes/DeclareFunNode";
import {DeclareFunParamNode} from "./nodes/DeclareFunParamNode";
import {ReturnNode} from "./nodes/ReturnNode";
import {FunctionCallNode} from "./nodes/FunctionCallNode";
import {TSGraphControl} from "./utils/TSGraphControl";
import {NodesControl} from "./utils/NodesControl";
import { ErrorsControl } from "./utils/ErrorsControl";

export {
    Console,
    Cntnr,
    Envmnt,
    Op,
    NULL,
    UNDEFINED,
    Reference,

    ConsoleLogNode,
    NumberNode,
    StringNode,
    BooleanNode,
    NullNode,
    UndefinedNode,

    DeclareVarNode,
    DeclareVarListNode,

    CreateIdVarNode,

    AsignNode,

    SumNode,
    SubNode,
    MulNode,
    DivNode,
    ModNode,
    ExpNode,

    EqNode,
    DifNode,
    HigherNode,
    MinorNode,
    HigherEqNode,
    MinorEqNode,

    OrNode,
    AndNode,
    NotNode,

    ReAsignAddNode,
    ReAsignSubNode,
    ReAsignMulNode,
    ReAsignDivNode,
    ReAsignModNode,

    ReAddNode,
    ReSubNode,

    CreateArrayNode,
    CreateArrVarNode,

    ReturnObj,

    CreateObjVarNode,
    CreateObjFunNode,

    SentenceTernaryNode,

    BreakNode,
    ContinueNode,

    IfNode,
    WhileNode,
    DoWhileNode,

    CaseNode,
    SwitchNode,

    ForInNode,
    ForOfNode,
    ForNode,

    CreateObjNode,
    MyMap,

    DeclareTypeStructureNode,

    DeclareFunNode,
    DeclareFunParamNode,
    ReturnNode,

    FunctionCallNode,
    ErrorsControl,
}

export function ExecuteAST(sentences: Array<Op>) {
    Console.log = '';
    NodesControl.clearStructures();
    TSGraphControl.clearStructures();
    ObjectsStructures.objects = new Map<string, ObjectStructure>();
    const env = new Envmnt(null, sentences);
    env.GO_ALL();
    const graphString = TSGraphControl.GetGetGraphsString();
    if (graphString !== '') {
        const win = window.open('./graph.html#' + TSGraphControl.GetGetGraphsString(), '_blank');
        if(win !== null)
            win.focus();
    }
}

export function GraphAST(sentences: Array<Op>): string {
    let graph =
        'digraph G {\n' +
        '        bgcolor="#1E222A"\n' +
        '        node [fillcolor="#2E3440"; style=filled; fontcolor="#2BBBAD"; color="#2BBBAD"];\n' +
        '        edge [color="#2BBBAD"];';
    const env = new Envmnt(null, sentences);
    graph += env.GetGraph().toString();
    graph += '}';
    console.log(graph);
    return graph;
}

export function TranslateStringsCompose(text: string) {
    return text.replace(/`([^̣`]*)`/g, (text) =>
        text.replace(/`/g, '"').replace(/\${[^}]*}/g, (text) => "\"+" + text.substring(2, text.length - 1) + "+\"")
    );
}

if (module && module.hot) module.hot.accept();
