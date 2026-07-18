import { FactionEnum, factionData } from "./Faction.js";
import { LoanManager } from "./LoanManager.js";
import { PlayerManager } from "./PlayerManager.js";

export class App {
    private playerManager: PlayerManager;
    private loanManager: LoanManager;
    private currentRound: number;
    private isDebug: boolean;
    private currentModal?: HTMLDivElement;
    private readonly openHamburgerMenu;

    constructor(isDebug?: boolean, clearLocalStorage?: boolean) {
        // Set the current round and draw the UI
        this.currentRound = this.loadCurrentRound();
        this.drawRoundUI();

        // God I miss dependency injection... Create the managers for the App
        this.playerManager = new PlayerManager();
        this.loanManager = new LoanManager(this.currentRound);
        // Setup the hamburger menu method to add/destroy the event listeners
        this.openHamburgerMenu = this.openHamburgerStackMenu.bind(this);

        this.isDebug = isDebug ?? false;

        if (clearLocalStorage) {
            localStorage.removeItem("players");
            localStorage.removeItem("loans");
        }

        if (this.isDebug) {
            localStorage.removeItem("players");
            localStorage.removeItem("loans");
            this.playerManager.clearPlayers();
            this.loanManager.clearLoans();

            this.updateCurrentRound(4);
            this.drawRoundUI();

            this.playerManager.addPlayer("Connor", FactionEnum.TheEmiratesOfHacan, 0);
            this.playerManager.addPlayer("Justin", FactionEnum.TheFirmament, 0);
            this.playerManager.addPlayer("Juan", FactionEnum.TheYinBrotherhood, 0);
            this.playerManager.addPlayer("Victor", FactionEnum.TheMahactGeneSorcerers, 0);
            this.playerManager.addPlayer("Jordan", FactionEnum.TheYssarilTribes, 0);
            this.playerManager.addPlayer("Oscar", FactionEnum.TheFederationOfSol, 0);

            const players = this.playerManager.players;

            players.forEach(p => {
                let loanAmount = Math.ceil(Math.random() * 9);
                loanAmount = loanAmount > 0 ? loanAmount : 1;

                // let roundOfLoan = Math.ceil(Math.random() * 5);
                let roundOfLoan = 1;
                roundOfLoan = roundOfLoan > 0 ? roundOfLoan : 1;

                const loanPercentage = Math.random();

                const loan = this.loanManager.addLoan(p.id, loanAmount, roundOfLoan, loanPercentage, this.currentRound)
                p.loanId = loan.id;
            });
        }
    }

    public start() {
        this.drawPlayerBoxes();
        this.addEventListeners();
    }

    private loadCurrentRound(): number {
        const round = Number(localStorage.getItem("currentRound"));
        return !Number.isNaN(round) && round !== 0 ? round : 1;
    }

    private drawPlayerBoxes() {
        const grid = document.getElementById("player-grid");

        if (grid === null)
            return;

        // Wipe any previous boxes
        grid.replaceChildren();

        const players = this.playerManager.players;
        let playerGridHtml = "";

        players.forEach(player => {
            let cardBody = "";

            const loan = this.loanManager.loans.find(l => player.loanId == l.id);
            if (loan)
                cardBody = `<p>Loan Round: Round ${loan.loanRound}</p>
                <p>Loan Amount: ${loan.loanAmount}</p>
                <p>Interest: ${loan.interest} TG${loan.interest > 1 ? 's' : ''}</p>
                <p>Total Loan Amount: ${loan.totalDebt}
                <p class="font-bold">Remaining balance: ${loan.remainingBalance}`;
            else
                cardBody = `<p>No loan! :)</p>`;

            playerGridHtml += `<div class="player-card">
            <div class="player-card-header">
                <div>
                    <h2>${player.name}</h2>
                    <div class="flex flex-row items-center gap-2">
                        <img src="./images/${player.faction.imageSrc}" class="w-10">
                        <h3>${player.faction.toString()}</h3>
                    </div>
                </div>
                <button class="player-card-edit-button" data-player-id="${player.id}">
                    Edit
                </button>
            </div>
            <div class="player-card-body">
                ${cardBody}
            </div>
            <div class="player-card-footer">

            </div>
        </div>`
        });

        grid.insertAdjacentHTML('beforeend', playerGridHtml);
    }

    private addEventListeners() {
        const playerGrid = document.getElementById("player-grid");
        const addPlayer = document.getElementById("add-player-button");
        const addPlayerMobile = document.getElementById("mobile-add-player-button");
        const hamburgerButton = document.getElementById("hamburger-stack");
        const addPaymentButton = document.getElementById("add-payment-button");
        const addPaymentButtonMobile = document.getElementById("mobile-add-payment-button");
        const changeRoundButton = document.getElementById("update-round-button");
        const changeRoundButtonMobile = document.getElementById("mobile-update-round-button");

        if (!addPlayer || !addPlayerMobile || !playerGrid || !hamburgerButton || !addPaymentButton 
            || !addPaymentButtonMobile || !changeRoundButton || !changeRoundButtonMobile)
            return;

        playerGrid.addEventListener("click", (event) => {
            const button = (event.target as HTMLElement)
                .closest(".player-card-edit-button") as HTMLButtonElement;

            if (!button) {
                return;
            }

            const playerId = Number(button.dataset.playerId);

            this.openPlayerModal(playerId);
        });

        const openPlayerModal = () => this.openPlayerModal();
        addPlayer.addEventListener("click", openPlayerModal);
        addPlayerMobile.addEventListener("click", openPlayerModal);
        hamburgerButton.addEventListener("click", this.openHamburgerMenu);
        
        const paymentModal = this.openPaymentModal.bind(this);
        addPaymentButton.addEventListener("click", paymentModal);
        addPaymentButtonMobile.addEventListener("click", paymentModal);

        const roundModal = this.openRoundModal.bind(this);
        changeRoundButton.addEventListener("click", roundModal);
        changeRoundButtonMobile.addEventListener("click", roundModal);
    }

    private updateCurrentRound(newRound: number) {
        this.currentRound = newRound;

        // Write the new round to storage
        localStorage.setItem("currentRound", this.currentRound.toString());

        this.loanManager.updateLoansOnNewRound(this.currentRound);
    }

    private drawRoundUI() {
        const round = document.getElementById("current-round");

        if (!round) return;

        round.textContent = `Current round: ${this.currentRound}`;
    }

    private openModal(content: string): HTMLDivElement {
        this.closeModal();

        const modal = document.createElement("div");
        modal.className = "fixed inset-0 flex items-center justify-center bg-black/50 z-50";

        modal.innerHTML = `
        <div class="relative bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md max-h-[90%] h-fit">
            <button
                id="close-modal"
                class="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
                ✕
            </button>

            
                ${content}
            
        </div>
    `;

        document.body.appendChild(modal);

        modal.querySelector("#close-modal")
            ?.addEventListener("click", this.closeModal.bind(this));

        this.currentModal = modal;

        return modal;
    }

    private closeModal(): void {
        this.currentModal?.remove();
        this.currentModal = undefined;
    }

    private openPlayerModal(playerId?: number): void {
        const isEdit = !!playerId;
        const player = this.playerManager.players.find(p => p.id === playerId);
        const loan = this.loanManager.loans.find(l => l.id === player?.loanId);

        const factionOptions = Object.entries(factionData)
            .map(([key, value]) => `
                <option value="${key}" ${player?.faction.factionType === Number(key) ? "selected" : ""}>
                    ${value.name}
                </option>
            `)
            .join("");

        let innerHTML = `
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-2xl font-bold text-white">
                        ${isEdit ? "Edit Player" : "Add Player"}
                    </h2>
                </div>
    
                <form id="player-form" class="space-y-4">
                    <div class="border-t border-gray-600 pt-4 mt-4">
                        <label class="block text-sm text-gray-300 mb-1">
                            Player Name
                        </label>
    
                        <input
                            id="player-name"
                            type="text"
                            required
                            value="${player?.name ?? ""}"
                            class="w-full rounded bg-gray-700 border border-gray-600 px-3 py-2 text-white"
                            placeholder="Enter player name"
                        />
                    </div>
    
                    <div>
                        <label class="block text-sm text-gray-300 mb-1">
                            Faction
                        </label>
    
                        <select
                            id="player-faction"
                            required
                            class="w-full rounded bg-gray-700 border border-gray-600 px-3 py-2 text-white"
                        >
                            <option value="">Select faction</option>
                            ${factionOptions}
                        </select>
                    </div>
    
                    <div>
                        <label class="block text-sm text-gray-300 mb-1">
                            Loan Amount
                        </label>
    
                        <input
                            id="loan-amount"
                            type="number"
                            placeholder="0"
                            value="${loan?.loanAmount ?? ""}"
                            class="w-full rounded bg-gray-700 border border-gray-600 px-3 py-2 text-white"
                        />
                    </div>
    
                    <div>
                        <label class="block text-sm text-gray-300 mb-1">
                            Loan Round
                        </label>
    
                        <input
                            id="loan-round"
                            type="number"
                            placeholder="0"
                            value="${loan?.loanRound ?? this.currentRound}"
                            class="w-full rounded bg-gray-700 border border-gray-600 px-3 py-2 text-white"
                        />
                    </div>
    
                    <div>
                        <label class="block text-sm text-gray-300 mb-1">
                            Loan Percentage
                        </label>
    
                        <input
                            id="loan-percentage"
                            type="text"
                            placeholder="0.33"
                            value="${loan?.loanPercentage ?? ""}"
                            class="w-full rounded bg-gray-700 border border-gray-600 px-3 py-2 text-white"
                        />
                    </div>

                    <div class="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            id="cancel-player"
                            class="rounded bg-gray-600 px-4 py-2 text-white hover:bg-gray-500"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            class="rounded bg-amber-500 px-4 py-2 font-semibold text-black hover:bg-amber-400"
                        >
                            ${isEdit ? "Update" : "Save"}
                        </button>
                    </div>
                </form>
        `;

        this.openModal(innerHTML);

        this.currentModal?.querySelector("#cancel-player")
            ?.addEventListener("click", this.closeModal.bind(this));

        this.currentModal?.querySelector("#player-form")
            ?.addEventListener("submit", (event) => {
                event.preventDefault();

                const updatedPlayer = {
                    name: (this.currentModal?.querySelector("#player-name") as HTMLInputElement).value,
                    faction: Number(
                        (this.currentModal?.querySelector("#player-faction") as HTMLSelectElement).value
                    ),
                    loanAmount: Number(
                        (this.currentModal?.querySelector("#loan-amount") as HTMLInputElement).value
                    ),
                    loanRound: Number(
                        (this.currentModal?.querySelector("#loan-round") as HTMLInputElement).value
                    ),
                    loanPercentage: Number(
                        (this.currentModal?.querySelector("#loan-percentage") as HTMLInputElement).value
                    )
                };

                const isLoanDataValid = updatedPlayer.loanAmount > 0 && updatedPlayer.loanRound > 0 && updatedPlayer.loanPercentage > 0;

                if (isEdit && player) {
                    this.playerManager.editPlayer(player.id, updatedPlayer.name, updatedPlayer.faction, player.loanId);
                    const loanExists = this.loanManager.loanExists(player.id);
                    if (loanExists) {
                        this.loanManager.editLoan(player.loanId, updatedPlayer.loanAmount, updatedPlayer.loanRound, updatedPlayer.loanPercentage, this.currentRound);
                    }
                    else if (!loanExists && isLoanDataValid)
                    {
                        const newLoan = this.loanManager.addLoan(player.id, updatedPlayer.loanAmount, updatedPlayer.loanRound, updatedPlayer.loanPercentage, this.currentRound);
                        this.playerManager.editPlayer(player.id, player.name, player.faction.factionType, newLoan.id)
                    }
                }
                else {
                    // Create the new player first
                    const player = this.playerManager.addPlayer(updatedPlayer.name, updatedPlayer.faction, 0);

                    if (player && isLoanDataValid) {
                        updatedPlayer.loanAmount > 0 
                        && updatedPlayer.loanRound > 0 && updatedPlayer.loanPercentage > 0
                    }
                }

                this.drawPlayerBoxes();
                this.closeModal();
            });
    }

    private openHamburgerStackMenu(event: Event) {
        event.stopPropagation();

        const mobileMenu = document.getElementById("mobile-menu");
        const body = document.querySelector("body");

        if (!mobileMenu || !body) return;

        mobileMenu.classList.toggle("hidden");

        // If the menu is open, add a global event listener to handle closing the hamburger stack menu
        if (!mobileMenu.classList.contains("hidden"))
            body.addEventListener("click", this.openHamburgerMenu);
        else
            body.removeEventListener("click", this.openHamburgerMenu);
    }

    private openRoundModal() {
        let innerHTML = `
            <form id="payment-form" class="space-y-4">
                <h3 class="text-lg font-semibold text-white mb-3">
                    Round
                </h3>

                <div>
                    <label class="block text-sm text-gray-300 mb-1">
                        Update Round
                    </label>

                    <input
                        id="round-input"
                        type="number"
                        value="${this.currentRound + 1}"
                        class="w-full rounded bg-gray-700 border border-gray-600 px-3 py-2 text-white"
                    />
                </div>

                <div class="flex justify-end mt-4">
                    <button
                        type="button"
                        id="update-round-button"
                        class="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
                    >
                        Update round
                    </button>
                </div>
            </form>
        `;

        const modal = this.openModal(innerHTML);

        modal.querySelector("#update-round-button")?.addEventListener("click", () => {
            const round = Number((modal.querySelector("#round-input") as HTMLInputElement).value);

            if (Number.isNaN(round) || round <= 0) return;
            
            this.updateCurrentRound(round);
            this.drawRoundUI();
            this.drawPlayerBoxes();
            this.closeModal();
        })
    }

    private openPaymentModal() {
        const playerOptions = this.playerManager.players.map(p => `
            <option value="${p.id}">
                ${p.name}
            </option>
        `)

        let innerHTML = `
        <div class="flex justify-between items-center mb-4">
            <h2 class="text-2xl font-bold text-white">
                Add Payment
            </h2>
        </div>

        <form id="payment-form" class="space-y-4">
            <div class="border-t border-gray-600 pt-4 mt-4">
                <div>
                    <label class="block text-sm text-gray-300 mb-1">
                        Player
                    </label>

                    <select
                        id="player-selection"
                        required
                        class="w-full rounded bg-gray-700 border border-gray-600 px-3 py-2 text-white"
                    >
                        <option value="">Select player</option>
                        ${playerOptions}
                    </select>
                </div>

                <div class="mt-3">
                    <label class="block text-sm text-gray-300 mb-1">
                        Payment Amount
                    </label>

                    <input
                        id="payment-amount"
                        type="number"
                        placeholder="0"
                        value=""
                        class="w-full rounded bg-gray-700 border border-gray-600 px-3 py-2 text-white"
                    />
                </div>

                <div class="mt-3">
                    <label class="block text-sm text-gray-300 mb-1">
                        Payment Round
                    </label>

                    <input
                        id="payment-round"
                        type="number"
                        placeholder="0"
                        value="${this.currentRound}"
                        class="w-full rounded bg-gray-700 border border-gray-600 px-3 py-2 text-white"
                    />
                </div>

                <div class="flex justify-end mt-4">
                    <button
                        type="button"
                        id="add-payment"
                        class="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
                    >
                        Add Payment
                    </button>
                </div>
            </div>
        </form>`;

        const modal = this.openModal(innerHTML);

        modal.querySelector("#add-payment")?.addEventListener("click", () => {
            const form = {
                player: Number((modal.querySelector("#player-selection") as HTMLSelectElement).value),
                payment: Number((modal.querySelector("#payment-amount") as HTMLInputElement).value),
                round: Number((modal.querySelector("#payment-round") as HTMLInputElement).value),
            }

            // Just some general checks
            if (!form.payment || !form.player || !form.round || Number.isNaN(form.player) 
                || form.payment <= 0 || form.round <= 0) return;

            // Grab the corresponding player so you can use their loanId
            const player = this.playerManager.players.find(p => p.id === form.player);

            if (!player) return;

            // Now that we're here, the data should be good and clean. Add a payment
            this.loanManager.addPayment(form.payment, player.loanId, form.round);

            // Update the UI
            this.drawPlayerBoxes();
            this.closeModal();
        })
    }
}