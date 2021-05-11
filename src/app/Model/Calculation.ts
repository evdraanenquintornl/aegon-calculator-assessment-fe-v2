export class Calculation {
    prefix: number;
    operator: string;
    suffix: number;

    constructor(prefix: number, operator: string, suffix: number) {
        this.prefix = prefix;
        this.operator = operator;
        this.suffix = suffix;
    }
}
