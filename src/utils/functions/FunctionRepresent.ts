import {Envmnt} from "../Envmnt";
import {Cntnr} from "../Cntnr";
import {Code} from "../C3D/Code";


export abstract class FunctionRepresent extends Cntnr{
    public abstract EXE(env0: Envmnt, args: Array<Cntnr>): Cntnr;

    public abstract GetC3DCode(env0: Envmnt, name: string, ...code: Code []): Code;
}
