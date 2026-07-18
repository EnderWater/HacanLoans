import { Payment } from "./Payment.js";
export class Loan {
    _id;
    _playerId;
    _loanAmount;
    _loanRound;
    _loanPercentage;
    _interestAmount;
    _payments;
    constructor(obj) {
        this._id = obj.id;
        this._playerId = obj.playerId;
        this._loanAmount = obj.loanAmount;
        this._loanRound = obj.loanRound;
        this._loanPercentage = obj.loanPercentage;
        this._interestAmount = this.getInterest(obj.currentRound);
        this._payments = obj.payments;
    }
    get id() {
        return this._id;
    }
    get playerId() {
        return this._playerId;
    }
    get loanAmount() {
        return this._loanAmount;
    }
    set loanAmount(value) {
        this._loanAmount = value;
        if (this.loanPercentage === 0)
            this.loanPercentage = 0.33;
        if (this.loanRound === 0)
            this.loanRound = 1;
    }
    get loanRound() {
        return this._loanRound;
    }
    set loanRound(value) {
        this._loanRound = value;
        if (this.loanPercentage === 0)
            this.loanPercentage = 0.33;
        if (this.loanAmount === 0)
            this.loanAmount = 1;
    }
    get loanPercentage() {
        return this._loanPercentage;
    }
    set loanPercentage(value) {
        this._loanPercentage = value;
        if (this.loanAmount === 0)
            this.loanAmount = 1;
        if (this.loanRound === 0)
            this.loanRound = 1;
    }
    get payments() {
        return this._payments;
    }
    get totalDebt() {
        return this.loanAmount + this._interestAmount;
    }
    get remainingBalance() {
        return this.totalDebt - this.payments.reduce((previousValue, payment) => previousValue + payment.amount, 0);
    }
    get hasLoan() {
        return this.loanAmount > 0 && this.loanRound !== 0;
    }
    get paymentTotal() {
        return this.payments.reduce((prevValue, payment) => {
            return prevValue + payment.amount;
        }, 0);
    }
    get isLoanPaidOff() {
        return this.paymentTotal >= this.totalDebt;
    }
    get interest() {
        return this._interestAmount;
    }
    calculateInterest(currentRound) {
        this.getInterest(currentRound);
    }
    getInterest(currentRound) {
        const { loanRound: roundOfLoan, loanAmount, loanPercentage } = this;
        const interest = Math.ceil((currentRound - roundOfLoan) * loanAmount * loanPercentage);
        this._interestAmount = interest;
        return interest;
    }
    addPayment(paymentAmount, roundNumber) {
        const payment = new Payment(paymentAmount, roundNumber);
        this.payments.push(payment);
    }
}
//# sourceMappingURL=Loan.js.map