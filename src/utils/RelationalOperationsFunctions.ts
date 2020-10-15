import {Cntnr} from "./Cntnr";
import {Reference} from "./Reference";
import {SemanticException} from "./Utils";
import {ARRAY, BOOLEAN, NAN, NULL, NUMBER, OBJECT, STRING, UNDEFINED} from "./PrimitiveTypoContainer";
import {Position} from "./ErrorsControl";

export function Igual(lf: Cntnr, rt: Cntnr, position: Position = new Position()): Cntnr {
    lf instanceof Reference ? lf = (lf as Reference).getValue() : lf;
    rt instanceof Reference ? rt = (rt as Reference).getValue() : rt;

    try {
        return Eq(lf, rt);
    } catch (e) {
        throw new SemanticException(`Operacion entre tipos ( ${lf.typo} == ${rt.typo} ) no permitida.`, position)
    }

    function Eq(lf: any, rt: any): Cntnr {
        switch (true) {
            case lf instanceof NUMBER:
                switch (true) {
                    case rt instanceof NUMBER:
                        return new BOOLEAN((lf as NUMBER).getValue() === (rt as NUMBER).getValue());
                    case rt instanceof BOOLEAN:
                        return new BOOLEAN((lf as NUMBER).getValue() === (rt as BOOLEAN).getValueNumber());
                    case rt instanceof NULL:
                        return new BOOLEAN(false);
                    case rt instanceof UNDEFINED:
                        return new BOOLEAN(false);
                    case rt instanceof NAN:
                        return new BOOLEAN(false);
                    default:
                        throw new Error();
                }
            case lf instanceof BOOLEAN:
                switch (true) {
                    case rt instanceof NUMBER:
                        return new BOOLEAN((lf as BOOLEAN).getValueNumber() == (rt as NUMBER).getValue());
                    case rt instanceof BOOLEAN:
                        return new BOOLEAN((lf as BOOLEAN).getValueNumber() == (rt as BOOLEAN).getValueNumber());
                    case rt instanceof NULL:
                        return new BOOLEAN(false);
                    case rt instanceof UNDEFINED:
                        return new BOOLEAN(false);
                    case rt instanceof NAN:
                        return new BOOLEAN(false);
                    default:
                        throw new Error();
                }
            case lf instanceof STRING:
                switch (true) {
                    case rt instanceof STRING:
                        return new BOOLEAN((lf as STRING).getValue() === (rt as STRING).getValue());
                    case rt instanceof NULL:
                        return new BOOLEAN(false);
                    case rt instanceof UNDEFINED:
                        return new BOOLEAN(false);
                    case rt instanceof NAN:
                        return new BOOLEAN(false);
                    default:
                        throw new Error();
                }
            case lf instanceof UNDEFINED:
                switch (true) {
                    case rt instanceof UNDEFINED:
                        return new BOOLEAN(true);
                    default:
                        return new BOOLEAN(false);
                }
            case lf instanceof NULL:
                switch (true) {
                    case rt instanceof NULL:
                        return new BOOLEAN(true);
                    default:
                        return new BOOLEAN(false);
                }
            case lf instanceof NAN:
                switch (true) {
                    case rt instanceof NAN:
                        return new BOOLEAN(true);
                    default:
                        return new BOOLEAN(false);
                }
            case lf instanceof OBJECT:
                return new BOOLEAN(false);
            case lf instanceof ARRAY:
                return new BOOLEAN(true);
        }
    }
}

export function Diferente(lf: Cntnr, rt: Cntnr, position: Position = new Position()): Cntnr {
    lf instanceof Reference ? lf = (lf as Reference).getValue() : lf;
    rt instanceof Reference ? rt = (rt as Reference).getValue() : rt;

    try {
        return Dif(lf, rt);
    } catch (e) {
        throw new SemanticException(`Operacion entre tipos ( ${lf.typo} != ${rt.typo} ) no permitida.`, position)
    }

    function Dif(lf: any, rt: any): Cntnr {
        switch (true) {
            case lf instanceof NUMBER:
                switch (true) {
                    case rt instanceof NUMBER:
                        return new BOOLEAN((lf as NUMBER).getValue() !== (rt as NUMBER).getValue());
                    case rt instanceof BOOLEAN:
                        return new BOOLEAN((lf as NUMBER).getValue() !== (rt as BOOLEAN).getValueNumber());
                    case rt instanceof NULL:
                        return new BOOLEAN(true);
                    case rt instanceof UNDEFINED:
                        return new BOOLEAN(true);
                    case rt instanceof NAN:
                        return new BOOLEAN(true);
                    default:
                        throw new Error();
                }
            case lf instanceof BOOLEAN:
                switch (true) {
                    case rt instanceof NUMBER:
                        return new BOOLEAN((lf as BOOLEAN).getValueNumber() != (rt as NUMBER).getValue());
                    case rt instanceof BOOLEAN:
                        return new BOOLEAN((lf as BOOLEAN).getValueNumber() != (rt as BOOLEAN).getValueNumber());
                    case rt instanceof NULL:
                        return new BOOLEAN(true);
                    case rt instanceof UNDEFINED:
                        return new BOOLEAN(true);
                    case rt instanceof NAN:
                        return new BOOLEAN(true);
                    default:
                        throw new Error();
                }
            case lf instanceof STRING:
                switch (true) {
                    case rt instanceof STRING:
                        return new BOOLEAN((lf as STRING).getValue() !== (rt as STRING).getValue());
                    case rt instanceof NULL:
                        return new BOOLEAN(true);
                    case rt instanceof UNDEFINED:
                        return new BOOLEAN(true);
                    default:
                        throw new Error();
                }
            case lf instanceof UNDEFINED:
                switch (true) {
                    case rt instanceof UNDEFINED:
                        return new BOOLEAN(false);
                    default:
                        return new BOOLEAN(true);
                }
            case lf instanceof NULL:
                switch (true) {
                    case rt instanceof NULL:
                        return new BOOLEAN(false);
                    default:
                        return new BOOLEAN(true);
                }
            case lf instanceof NAN:
                switch (true) {
                    case rt instanceof NAN:
                        return new BOOLEAN(false);
                    default:
                        return new BOOLEAN(true);
                }
            case lf instanceof OBJECT:
                return new BOOLEAN(true);
            case lf instanceof ARRAY:
                return new BOOLEAN(true);
            default:
                throw new Error();
        }
    }
}

export function Mayor(lf: Cntnr, rt: Cntnr, position: Position = new Position()): Cntnr {
    lf instanceof Reference ? lf = (lf as Reference).getValue() : lf;
    rt instanceof Reference ? rt = (rt as Reference).getValue() : rt;

    try {
        return May(lf, rt);
    } catch (e) {
        throw new SemanticException(`Operacion entre tipos ( ${lf.typo} > ${rt.typo} ) dddno permitida.`, position)
    }

    function May(lf: any, rt: any): Cntnr {
        switch (true) {
            case lf instanceof NUMBER:
                switch (true) {
                    case rt instanceof NUMBER:
                        return new BOOLEAN((lf as NUMBER).getValue() > (rt as NUMBER).getValue());
                    case rt instanceof BOOLEAN:
                        return new BOOLEAN((lf as NUMBER).getValue() > (rt as BOOLEAN).getValueNumber());
                    case rt instanceof NAN:
                        return new BOOLEAN(false);
                    default:
                        return new BOOLEAN(false);
                }
            case lf instanceof BOOLEAN:
                switch (true) {
                    case rt instanceof NUMBER:
                        return new BOOLEAN((lf as BOOLEAN).getValueNumber() > (rt as NUMBER).getValue());
                    case rt instanceof BOOLEAN:
                        return new BOOLEAN((lf as BOOLEAN).getValueNumber() > (rt as BOOLEAN).getValueNumber());
                    default:
                        return new BOOLEAN(false);
                }
            case lf instanceof STRING:
                switch (true) {
                    case rt instanceof STRING:
                        return new BOOLEAN((lf as STRING).getValue() > (rt as STRING).getValue());
                    default:
                        return new BOOLEAN(false);
                }
            case lf instanceof NAN:
                switch (true) {
                    case rt instanceof NUMBER:
                        return new BOOLEAN(false);
                    default:
                        return new BOOLEAN(false);
                }
            default:
                return new BOOLEAN(false);
        }
    }
}

export function Menor(lf: Cntnr, rt: Cntnr, position: Position = new Position()): Cntnr {
    lf instanceof Reference ? lf = (lf as Reference).getValue() : lf;
    rt instanceof Reference ? rt = (rt as Reference).getValue() : rt;

    try {
        return Min(lf, rt);
    } catch (e) {
        throw new SemanticException(`Operacion entre tipos ( ${lf.typo} < ${rt.typo} ) ndadfao permitida.`, position)
    }

    function Min(lf: any, rt: any): Cntnr {
        switch (true) {
            case lf instanceof NUMBER:
                switch (true) {
                    case rt instanceof NUMBER:
                        return new BOOLEAN((lf as NUMBER).getValue() < (rt as NUMBER).getValue());
                    case rt instanceof BOOLEAN:
                        return new BOOLEAN((lf as NUMBER).getValue() < (rt as BOOLEAN).getValueNumber());
                    case rt instanceof NAN:
                        return new BOOLEAN(false);
                    default:
                        return  new BOOLEAN(false);
                }
            case lf instanceof BOOLEAN:
                switch (true) {
                    case rt instanceof NUMBER:
                        return new BOOLEAN((lf as BOOLEAN).getValueNumber() < (rt as NUMBER).getValue());
                    case rt instanceof BOOLEAN:
                        return new BOOLEAN((lf as BOOLEAN).getValueNumber() < (rt as BOOLEAN).getValueNumber());
                    default:
                        return  new BOOLEAN(false);
                }
            case lf instanceof STRING:
                switch (true) {
                    case rt instanceof STRING:
                        return new BOOLEAN((lf as STRING).getValue() < (rt as STRING).getValue());
                    default:
                        return new BOOLEAN(false);
                }
            case lf instanceof NAN:
                switch (true) {
                    case rt instanceof NUMBER:
                        return new BOOLEAN(false);
                    default:
                        return new BOOLEAN(false);
                }
            default:
                return new BOOLEAN(false);
        }
    }
}

export function MayorEq(lf: Cntnr, rt: Cntnr, position: Position = new Position()): Cntnr {
    lf instanceof Reference ? lf = (lf as Reference).getValue() : lf;
    rt instanceof Reference ? rt = (rt as Reference).getValue() : rt;

    try {
        return MayEq(lf, rt);
    } catch (e) {
        throw new SemanticException(`Operacion entre tipos ( ${lf.typo} >= ${rt.typo} ) no permitida.`, position)
    }

    function MayEq(lf: any, rt: any): Cntnr {
        switch (true) {
            case lf instanceof NUMBER:
                switch (true) {
                    case rt instanceof NUMBER:
                        return new BOOLEAN((lf as NUMBER).getValue() >= (rt as NUMBER).getValue());
                    case rt instanceof BOOLEAN:
                        return new BOOLEAN((lf as NUMBER).getValue() >= (rt as BOOLEAN).getValueNumber());
                    case rt instanceof NAN:
                        return new BOOLEAN(false);
                    default:
                        return new BOOLEAN(false);
                }
            case lf instanceof BOOLEAN:
                switch (true) {
                    case rt instanceof NUMBER:
                        return new BOOLEAN((lf as BOOLEAN).getValueNumber() >= (rt as NUMBER).getValue());
                    case rt instanceof BOOLEAN:
                        return new BOOLEAN((lf as BOOLEAN).getValueNumber() >= (rt as BOOLEAN).getValueNumber());
                    default:
                        return new BOOLEAN(false);
                }
            case lf instanceof STRING:
                switch (true) {
                    case rt instanceof STRING:
                        return new BOOLEAN((lf as STRING).getValue() >= (rt as STRING).getValue());
                    default:
                        return new BOOLEAN(false);
                }
            case lf instanceof NAN:
                switch (true) {
                    case rt instanceof NUMBER:
                        return new BOOLEAN(false);
                    default:
                        return new BOOLEAN(false);
                }
            default:
                return new BOOLEAN(false);
        }
    }
}

export function MenorEq(lf: Cntnr, rt: Cntnr, position: Position = new Position()): Cntnr {
    lf instanceof Reference ? lf = (lf as Reference).getValue() : lf;
    rt instanceof Reference ? rt = (rt as Reference).getValue() : rt;

    try {
        return MinEq(lf, rt);
    } catch (e) {
        throw new SemanticException(`Operacion entre tipos ( ${lf.typo} >= ${rt.typo} ) no permitida.`, position)
    }

    function MinEq(lf: any, rt: any): Cntnr {
        switch (true) {
            case lf instanceof NUMBER:
                switch (true) {
                    case rt instanceof NUMBER:
                        return new BOOLEAN((lf as NUMBER).getValue() <= (rt as NUMBER).getValue());
                    case rt instanceof BOOLEAN:
                        return new BOOLEAN((lf as NUMBER).getValue() <= (rt as BOOLEAN).getValueNumber());
                    case rt instanceof NAN:
                        return new BOOLEAN(false);
                    default:
                        return new BOOLEAN(false);
                }
            case lf instanceof BOOLEAN:
                switch (true) {
                    case rt instanceof NUMBER:
                        return new BOOLEAN((lf as BOOLEAN).getValueNumber() <= (rt as NUMBER).getValue());
                    case rt instanceof BOOLEAN:
                        return new BOOLEAN((lf as BOOLEAN).getValueNumber() <= (rt as BOOLEAN).getValueNumber());
                    default:
                        return new BOOLEAN(false);
                }
            case lf instanceof STRING:
                switch (true) {
                    case rt instanceof STRING:
                        return new BOOLEAN((lf as STRING).getValue() <= (rt as STRING).getValue());
                    default:
                        return new BOOLEAN(false);
                }
            case lf instanceof NAN:
                switch (true) {
                    case rt instanceof NUMBER:
                        return new BOOLEAN(false);
                    default:
                        return new BOOLEAN(false);
                }
            default:
                return new BOOLEAN(false);
        }
    }
}
