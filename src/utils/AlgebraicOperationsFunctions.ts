import {Cntnr} from "./Cntnr";
import {Reference} from "./Reference";
import {SemanticException} from "./Utils";
import {BOOLEAN, NAN, NULL, NUMBER, STRING, UNDEFINED} from "./PrimitiveTypoContainer";
import {Position} from "./ErrorsControl";

export function Suma(lf: Cntnr, rt: Cntnr, position: Position = new Position()): Cntnr {
    lf instanceof Reference ? lf = (lf as Reference).getValue() : lf;
    rt instanceof Reference ? rt = (rt as Reference).getValue() : rt;

    try {
        return Sumar(lf, rt);
    } catch (e) {
        throw new SemanticException(`Operacion entre tipos ( ${lf.typo} + ${rt.typo} ) no permitida.`, position)
    }

    function Sumar(lf: any, rt: any): Cntnr {
        switch (true) {
            case lf instanceof NUMBER:
                switch (true) {
                    case rt instanceof NUMBER:
                        return new NUMBER((lf as NUMBER).getValue() + (rt as NUMBER).getValue());
                    case rt instanceof BOOLEAN:
                        return new NUMBER((lf as NUMBER).getValue() + (rt as BOOLEAN).getValueNumber());
                    case rt instanceof STRING:
                        return new STRING((lf as NUMBER).getValue() + (rt as STRING).getValue());
                    default:
                        throw new Error();
                }
            case lf instanceof BOOLEAN:
                switch (true) {
                    case rt instanceof NUMBER:
                        return new NUMBER((lf as BOOLEAN).getValueNumber() + (rt as NUMBER).getValue());
                    case rt instanceof BOOLEAN:
                        return new NUMBER((lf as BOOLEAN).getValueNumber() + (rt as BOOLEAN).getValueNumber());
                    case rt instanceof STRING:
                        return new STRING((lf as BOOLEAN).getValue() + (rt as STRING).getValue());
                    default:
                        throw new Error();
                }
            case lf instanceof STRING:
                switch (true) {
                    case rt instanceof NUMBER:
                        return new STRING((lf as STRING).getValue() + (rt as NUMBER).getValue());
                    case rt instanceof BOOLEAN:
                        return new STRING((lf as STRING).getValue() + (rt as BOOLEAN).getValue());
                    case rt instanceof STRING:
                        return new STRING((lf as STRING).getValue() + (rt as STRING).getValue());
                    case rt instanceof UNDEFINED:
                        return new STRING((lf as STRING).getValue() + (rt as UNDEFINED));
                    case rt instanceof NULL:
                        return new STRING((lf as STRING).getValue() + (rt as NULL));
                    default:
                        throw new Error();
                }
            case lf instanceof UNDEFINED:
                switch (true) {
                    case rt instanceof STRING:
                        return new STRING((lf as UNDEFINED) + (rt as STRING).getValue());
                    default:
                        throw new Error();
                }
            case lf instanceof NULL:
                switch (true) {
                    case rt instanceof STRING:
                        return new STRING((lf as NULL) + (rt as STRING).getValue());
                    default:
                        throw new Error();
                }
            default:
                throw new Error();
        }
    }
}

export function Resta(lf: Cntnr, rt: Cntnr, position: Position = new Position()): Cntnr {
    lf instanceof Reference ? lf = (lf as Reference).getValue() : lf;
    rt instanceof Reference ? rt = (rt as Reference).getValue() : rt;

    try {
        return Restar(lf, rt);
    } catch (e) {
        throw new SemanticException(`Operacion entre tipos ( ${lf.typo} - ${rt.typo} ) no permitida.`, position)
    }

    function Restar(lf: any, rt: any): Cntnr {
        switch (true) {
            case lf instanceof NUMBER:
                switch (true) {
                    case rt instanceof NUMBER:
                        return new NUMBER((lf as NUMBER).getValue() - (rt as NUMBER).getValue());
                    case rt instanceof BOOLEAN:
                        return new NUMBER((lf as NUMBER).getValue() - (rt as BOOLEAN).getValueNumber());
                    default:
                        throw new Error();
                }
            case lf instanceof BOOLEAN:
                switch (true) {
                    case rt instanceof NUMBER:
                        return new NUMBER((lf as BOOLEAN).getValueNumber() - (rt as NUMBER).getValue());
                    case rt instanceof BOOLEAN:
                        return new NUMBER((lf as BOOLEAN).getValueNumber() - (rt as BOOLEAN).getValueNumber());
                    default:
                        throw new Error();
                }
            default:
                throw new Error();
        }
    }
}

export function Multiplicacion(lf: Cntnr, rt: Cntnr, position: Position = new Position()): Cntnr {
    lf instanceof Reference ? lf = (lf as Reference).getValue() : lf;
    rt instanceof Reference ? rt = (rt as Reference).getValue() : rt;

    try {
        return Multiplicar(lf, rt);
    } catch (e) {
        throw new SemanticException(`Operacion entre tipos ( ${lf.typo} * ${rt.typo} ) no permitida.`, position)
    }

    function Multiplicar(lf: any, rt: any): Cntnr {
        switch (true) {
            case lf instanceof NUMBER:
                switch (true) {
                    case rt instanceof NUMBER:
                        return new NUMBER((lf as NUMBER).getValue() * (rt as NUMBER).getValue());
                    case rt instanceof BOOLEAN:
                        return new NUMBER((lf as NUMBER).getValue() * (rt as BOOLEAN).getValueNumber());
                    default:
                        throw new Error();
                }
            case lf instanceof BOOLEAN:
                switch (true) {
                    case rt instanceof NUMBER:
                        return new NUMBER((lf as BOOLEAN).getValueNumber() * (rt as NUMBER).getValue());
                    case rt instanceof BOOLEAN:
                        return new NUMBER((lf as BOOLEAN).getValueNumber() * (rt as BOOLEAN).getValueNumber());
                    default:
                        throw new Error();
                }
            default:
                throw new Error();
        }
    }
}

export function Division(lf: Cntnr, rt: Cntnr, position: Position = new Position()): Cntnr {
    lf instanceof Reference ? lf = (lf as Reference).getValue() : lf;
    rt instanceof Reference ? rt = (rt as Reference).getValue() : rt;

    if(rt instanceof NUMBER){
        if((rt as NUMBER).getValue() === 0){
            throw new SemanticException('Operación no válida, no se puede dividir entre 0', position);
        }
    } else if(rt instanceof BOOLEAN){
        if((rt as BOOLEAN).getValueNumber() === 0){
            throw new SemanticException('Operación no válida, no se puede dividir entre 0', position);
        }
    }
    try {
        return Dividir(lf, rt);
    } catch (e) {
        throw new SemanticException(`Operacion entre tipos ( ${lf.typo} / ${rt.typo} ) no permitida.`)
    }

    function Dividir(lf: any, rt: any): Cntnr {
        switch (true) {
            case lf instanceof NUMBER:
                switch (true) {
                    case rt instanceof NUMBER:
                        return new NUMBER((lf as NUMBER).getValue() / (rt as NUMBER).getValue());
                    case rt instanceof BOOLEAN:
                        return new NUMBER((lf as NUMBER).getValue() / (rt as BOOLEAN).getValueNumber());
                    default:
                        throw new Error();
                }
            case lf instanceof BOOLEAN:
                switch (true) {
                    case rt instanceof NUMBER:
                        return new NUMBER((lf as BOOLEAN).getValueNumber() / (rt as NUMBER).getValue());
                    case rt instanceof BOOLEAN:
                        return new NUMBER((lf as BOOLEAN).getValueNumber() / (rt as BOOLEAN).getValueNumber());
                    default:
                        throw new Error();
                }
            default:
                throw new Error();
        }
    }
}

export function Modulo(lf: Cntnr, rt: Cntnr, position: Position = new Position()): Cntnr {
    lf instanceof Reference ? lf = (lf as Reference).getValue() : lf;
    rt instanceof Reference ? rt = (rt as Reference).getValue() : rt;

    try {
        return Mod(lf, rt);
    } catch (e) {
        throw new SemanticException(`Operacion entre tipos ( ${lf.typo} % ${rt.typo} ) no permitida.`, position)
    }

    function Mod(lf: any, rt: any): Cntnr {
        switch (true) {
            case lf instanceof NUMBER:
                switch (true) {
                    case rt instanceof NUMBER:
                        return new NUMBER((lf as NUMBER).getValue() % (rt as NUMBER).getValue());
                    case rt instanceof BOOLEAN:
                        return new NUMBER((lf as NUMBER).getValue() % (rt as BOOLEAN).getValueNumber());
                    default:
                        throw new Error();
                }
            case lf instanceof BOOLEAN:
                switch (true) {
                    case rt instanceof NUMBER:
                        return new NUMBER((lf as BOOLEAN).getValueNumber() % (rt as NUMBER).getValue());
                    case rt instanceof BOOLEAN:
                        return new NUMBER((lf as BOOLEAN).getValueNumber() % (rt as BOOLEAN).getValueNumber());
                    default:
                        throw new Error();
                }
            default:
                throw new Error();
        }
    }
}

export function Potencia(lf: Cntnr, rt: Cntnr, position: Position = new Position()): Cntnr {
    lf instanceof Reference ? lf = (lf as Reference).getValue() : lf;
    rt instanceof Reference ? rt = (rt as Reference).getValue() : rt;

    try {
        return Pot(lf, rt);
    } catch (e) {
        throw new SemanticException(`Operacion entre tipos ( ${lf.typo} ** ${rt.typo} ) no permitida.`, position)
    }

    function Pot(lf: any, rt: any): Cntnr {
        switch (true) {
            case lf instanceof NUMBER:
                switch (true) {
                    case rt instanceof NUMBER:
                        return new NUMBER((lf as NUMBER).getValue() ** (rt as NUMBER).getValue());
                    case rt instanceof BOOLEAN:
                        return new NUMBER((lf as NUMBER).getValue() **  (rt as BOOLEAN).getValueNumber());
                    default:
                        throw new Error();
                }
            case lf instanceof BOOLEAN:
                switch (true) {
                    case rt instanceof NUMBER:
                        return new NUMBER((lf as BOOLEAN).getValueNumber() ** (rt as NUMBER).getValue());
                    case rt instanceof BOOLEAN:
                        return new NUMBER((lf as BOOLEAN).getValueNumber() ** (rt as BOOLEAN).getValueNumber());
                    default:
                        throw new Error();
                }
            default:
                throw new Error();
        }
    }
}

export function Add(lf: Cntnr, position: Position = new Position()): Cntnr {
    if (!(lf instanceof Reference)) {
        throw new SemanticException("Operacion {ref++} permitida solamente sobre referencas", position);
    }

    const val = (lf as Reference).getValue();
    if (val instanceof NUMBER) {
        (lf as Reference).setValue(new NUMBER((val as NUMBER).getValue() + 1));
        return val as NUMBER;
    }

    throw new SemanticException("Operacion {ref++} No se puede realizar sobre variables distintas de tipo number", position);
}

export function Sub(lf: Cntnr, position: Position = new Position()): Cntnr {
    if (!(lf instanceof Reference)) {
        throw new SemanticException("Operacion {ref--} permitida solamente sobre referencas", position);
    }

    const val = (lf as Reference).getValue();
    if (val instanceof NUMBER) {
        (lf as Reference).setValue(new NUMBER((val as NUMBER).getValue() - 1));
        return val as NUMBER;
    }

    throw new SemanticException("Operacion {ref--} No se puede realizar sobre variables distintas de tipo number", position);
}
