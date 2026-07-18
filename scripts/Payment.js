export class Payment {
    _amount;
    _round;
    constructor(amount, round) {
        this._amount = amount;
        this._round = round;
    }
    get amount() {
        return this._amount;
    }
    get round() {
        return this._round;
    }
}
//# sourceMappingURL=Payment.js.map