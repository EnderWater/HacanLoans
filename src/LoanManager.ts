import { Loan, LoanConstructor } from "./Loan.js";
import { Payment } from "./Payment.js";

export class LoanManager {
    private _loans: Loan[] = [];
    private _currentRound = 1;

    constructor(currentRound: number) {
        this._currentRound = currentRound;
        this._loans = this.loadLoansFromStorage();
    }
    
    public get loans(): Loan[] {
        return this._loans;
    }

    public get currentRound(): number {
        return this._currentRound
    }

    public set currentRound(value: number) {
        this._currentRound = value;
    }

    private loadLoansFromStorage(): Loan[] {
        const loans = localStorage.getItem("loans");

        if (loans == null)
            return [];
        
        const parsedLoans = JSON.parse(loans);

        if (!(parsedLoans instanceof Array))
            return [];

        return parsedLoans.map(l => {
            const payments = l.payments.map((payment: {amount: number, round: number}) => {
                return new Payment(payment.amount, payment.round);
            });

            const obj: LoanConstructor = {
                id: l.id,
                playerId: l.playerId,
                loanAmount: l.loanAmount,
                loanRound: l.roundOfLoan,
                loanPercentage: l.loanPercentage,
                currentRound: l.currentRound,
                payments
            };
            
            return new Loan(obj);
        })
    }

    public saveLoans() {
        const storageObj = this._loans.map(l => {
            return {
                id: l.id,
                playerId: l.playerId,
                loanAmount: l.loanAmount,
                roundOfLoan: l.loanRound,
                loanPercentage: l.loanPercentage,
                currentRound: this.currentRound,
                payments: l.payments.map(l => {
                    return {
                        amount: l.amount,
                        round: l.round,
                    }
                }),
            };
        });

        localStorage.setItem("loans", JSON.stringify(storageObj));
    }

    public addLoan(playerId: number, loanAmount: number, loanRound: number, loanPercentage: number, currentRound: number) {
        const loanId = this.getNextLoanId();
        const obj: LoanConstructor = {
            id: loanId,
            playerId,
            loanAmount,
            loanRound,
            loanPercentage,
            currentRound,
            payments: [],
        };

        const loan = new Loan(obj);
        this._loans.push(loan);

        this.saveLoans();

        return loan;
    }

    public editLoan(playerId: number, loanAmount: number, loanRound: number, loanPercentage: number, currentRound: number) {
        const loan = this.loans.find(l => l.playerId === playerId);
        
        if (!loan) return;

        loan.loanAmount = loanAmount;
        loan.loanRound = loanRound;
        loan.loanPercentage = loanPercentage;
        loan.calculateInterest(currentRound);

        this.saveLoans();
    }

    public removeLoan(playerId: number) {
        const loanIndex = this._loans.findIndex(l => l.playerId === playerId);
        
        if (loanIndex === -1) return;

        this._loans.splice(loanIndex, 1);

        this.saveLoans();
    }

    public clearLoans() {
        this._loans = [];
    }

    private getNextLoanId(): number {
        const ids = this._loans.map(l => l.id);

        const max = Math.max(...ids);
        return max > 0 ? max + 1 : 1;
    }

    public addPayment(payment: number, playerId: number, roundNumber: number) {
        const loan = this._loans.find(l => l.playerId === playerId);
        
        if (!loan) return;

        loan.addPayment(payment, roundNumber);

        // If the loan is paid off, remove it from the current loans
        if (loan.isLoanPaidOff) {
            const index = this._loans.findIndex(l => l === loan);
            this._loans.splice(index, 1);
        }

        this.saveLoans();
    }

    public updateLoansOnNewRound(newRound: number) {
        this.currentRound = newRound;

        this.loans.forEach(l => {
            l.calculateInterest(this.currentRound);
        })

        this.saveLoans();
    }

    public loanExists(playerId: number) {
        return this.loans.some(l => l.playerId === playerId);
    }
}