export class Tmp {
    private static tmpCount: number = 0;

    public static newTmp = (): string  => `t${Tmp.tmpCount++}`;

    public static getCount = (): number => Tmp.tmpCount;

    public static resetCount = () => Tmp.tmpCount = 0;
}