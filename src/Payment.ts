export class Payment {
    private _amount: number;
    private _round: number;

    constructor(amount: number, round: number) {
        this._amount = amount;
        this._round = round;
    }

    
    public get amount(): number {
        return this._amount;
    }
    
    public get round(): number {
        return this._round;
    }
}

export interface PaymentConstructor {
    
}