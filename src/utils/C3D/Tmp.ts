export class Tmp {
    private static tmpCount: number = 0;
    private static onFunction: boolean = false;
    private static tmpsForSave: Array<string> = new Array<string>();

    public static newTmp = function (): string {
        let tmp = `t${Tmp.tmpCount++}`;
        if (Tmp.onFunction) {
            Tmp.tmpsForSave.push(tmp);
        }
        return tmp;
    };

    public static getCount = (): number => Tmp.tmpCount;

    public static resetCount = () => Tmp.tmpCount = 0;

    public static isGodeOfFunction = (): boolean => Tmp.onFunction;

    public static isOnFunction = function () {
        Tmp.onFunction = true;
        Tmp.tmpsForSave = new Array<string>();
    };

    public static getTempsForSave = (): Array<string> => Tmp.tmpsForSave;

    public static removeUsedTmp = function (tmp: string) {
        Tmp.tmpsForSave = Tmp.tmpsForSave.filter(t => t !== tmp);
    };

    public static isNotOnFunction = function () {
        Tmp.onFunction = false;
        Tmp.tmpsForSave = new Array<string>();
    }
}