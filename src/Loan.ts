import { Payment } from "./Payment.js";

export class Loan {
    private _id: number;
    private _playerId: number;
    private _loanAmount: number;
    private _loanRound: number;
    private _loanPercentage: number; // In decimal format: ex: 33% == .33
    private _interestAmount: number;
    private _payments: Payment[];

    constructor(obj: LoanConstructor) {
        this._id = obj.id;
        this._playerId = obj.playerId;
        this._loanAmount = obj.loanAmount;
        this._loanRound = obj.loanRound;
        this._loanPercentage = obj.loanPercentage;
        this._interestAmount = this.getInterest(obj.currentRound);
        this._payments = obj.payments;
    }

    public get id(): number {
        return this._id;
    }

    public get playerId(): number {
        return this._playerId;
    }

    public get loanAmount(): number {
        return this._loanAmount;
    }

    public set loanAmount(value: number) {
        this._loanAmount = value;

        if (this.loanPercentage === 0)
            this.loanPercentage = 0.33;
        if (this.loanRound === 0)
            this.loanRound = 1;
    }

    public get loanRound(): number {
        return this._loanRound;
    }

    public set loanRound(value: number) {
        this._loanRound = value;

        if (this.loanPercentage === 0)
            this.loanPercentage = 0.33;
        if (this.loanAmount === 0)
            this.loanAmount = 1;
    }

    public get loanPercentage(): number {
        return this._loanPercentage;
    }

    public set loanPercentage(value: number) {
        this._loanPercentage = value;

        if (this.loanAmount === 0)
            this.loanAmount = 1;
        if (this.loanRound === 0)
            this.loanRound = 1;
    }

    public get payments(): Payment[] {
        return this._payments;
    }

    public get totalDebt(): number {
        return this.loanAmount + this._interestAmount;
    }

    public get remainingBalance(): number {
        return this.totalDebt -  this.payments.reduce((previousValue, payment) => previousValue + payment.amount, 0);
    }
    
    public get hasLoan(): boolean {
        return this.loanAmount > 0 && this.loanRound !== 0;
    }

    public get paymentTotal(): number {
        return this.payments.reduce((prevValue, payment) => {
            return prevValue + payment.amount;
        }, 0);
    }

    public get isLoanPaidOff(): boolean {
        return this.paymentTotal >= this.totalDebt;
    }

    public get interest(): number {
        return this._interestAmount;
    }

    public calculateInterest(currentRound: number) {
        this.getInterest(currentRound);
    }

    private getInterest(currentRound: number): number {
        const { loanRound: roundOfLoan, loanAmount, loanPercentage } = this;
        const interest = Math.ceil((currentRound - roundOfLoan) * loanAmount * loanPercentage);

        this._interestAmount = interest;
        return interest;
    }

    public addPayment(paymentAmount: number, roundNumber: number) {
        const payment = new Payment(paymentAmount, roundNumber);

        this.payments.push(payment);
    }
}

export interface LoanConstructor {
    id: number;
    playerId: number;
    loanAmount: number;
    loanRound: number;
    loanPercentage: number;
    currentRound: number;
    payments: Payment[];
}