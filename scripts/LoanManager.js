import { Loan } from "./Loan.js";
import { Payment } from "./Payment.js";
export class LoanManager {
    _loans = [];
    _currentRound = 1;
    constructor(currentRound) {
        this._currentRound = currentRound;
        this._loans = this.loadLoansFromStorage();
    }
    get loans() {
        return this._loans;
    }
    get currentRound() {
        return this._currentRound;
    }
    set currentRound(value) {
        this._currentRound = value;
    }
    loadLoansFromStorage() {
        const loans = localStorage.getItem("loans");
        if (loans == null)
            return [];
        const parsedLoans = JSON.parse(loans);
        if (!(parsedLoans instanceof Array))
            return [];
        return parsedLoans.map(l => {
            const payments = l.payments.map((payment) => {
                return new Payment(payment.amount, payment.round);
            });
            const obj = {
                id: l.id,
                playerId: l.playerId,
                loanAmount: l.loanAmount,
                loanRound: l.roundOfLoan,
                loanPercentage: l.loanPercentage,
                currentRound: l.currentRound,
                payments
            };
            return new Loan(obj);
        });
    }
    saveLoans() {
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
                    };
                }),
            };
        });
        localStorage.setItem("loans", JSON.stringify(storageObj));
    }
    addLoan(playerId, loanAmount, loanRound, loanPercentage, currentRound) {
        const loanId = this.getNextLoanId();
        const obj = {
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
    editLoan(loanId, loanAmount, loanRound, loanPercentage, currentRound) {
        const loan = this.loans.find(l => l.id === loanId);
        if (!loan)
            return;
        loan.loanAmount = loanAmount;
        loan.loanRound = loanRound;
        loan.loanPercentage = loanPercentage;
        loan.calculateInterest(currentRound);
        this.saveLoans();
    }
    removeLoan(loanId) {
        const loanIndex = this._loans.findIndex(l => l.id === loanId);
        if (loanIndex === -1)
            return;
        this._loans.splice(loanIndex, 1);
        this.saveLoans();
    }
    clearLoans() {
        this._loans = [];
    }
    getNextLoanId() {
        const ids = this._loans.map(l => l.id);
        const max = Math.max(...ids);
        return max > 0 ? max + 1 : 1;
    }
    addPayment(payment, loanId, roundNumber) {
        const loan = this._loans.find(l => l.id === loanId);
        if (!loan)
            return;
        loan.addPayment(payment, roundNumber);
        if (loan.isLoanPaidOff) {
            const index = this._loans.findIndex(l => l === loan);
            this._loans.splice(index, 1);
        }
        this.saveLoans();
    }
    updateLoansOnNewRound(newRound) {
        this.currentRound = newRound;
        this.loans.forEach(l => {
            l.calculateInterest(this.currentRound);
        });
        this.saveLoans();
    }
    loanExists(playerId) {
        return this.loans.some(l => l.playerId === playerId);
    }
}
//# sourceMappingURL=LoanManager.js.map