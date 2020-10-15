import {Envmnt} from "../Envmnt";
import {Cntnr} from "../Cntnr";


export abstract class FunctionRepresent extends Cntnr{
    public abstract EXE(env0: Envmnt, args: Array<Cntnr>): Cntnr;
}