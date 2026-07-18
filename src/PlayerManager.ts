import { FactionEnum } from "./Faction.js";
import { Player, PlayerConstructor } from "./Player.js";

export class PlayerManager {
    private _players: Player[];

    public get players() : Player[] {
        return this._players;
    }

    private set players(value : Player[]) {
        this._players = value;
    }
    
    constructor() {
        this._players = this.loadPlayersFromStorage();
    }

    private loadPlayersFromStorage(): Player[] {
        const players = localStorage.getItem("players");

        if (players == null)
            return [];
        
        const parsedPlayers = JSON.parse(players);

        if (!(parsedPlayers instanceof Array))
            return [];

        return parsedPlayers.map(p => {
            const obj: PlayerConstructor = {
                id: p.id,
                name: p.name,
                faction: p.faction,
                loanId: p.loanId,
            };
            
            return new Player(obj);
        })
    }

    private savePlayers() {
        const storageObj = this.players.map(p => {
            return {
                id: p.id,
                name: p.name,
                faction: p.faction.factionType,
                loanId: p.loanId,
            };
        });

        localStorage.setItem("players", JSON.stringify(storageObj));
    }

    public addPlayer(name: string, faction: FactionEnum, loanId: number) {
        const id = this.getNextPlayerId();
        const player = new Player({
            id,
            name,
            faction,
            loanId,
        });

        // If the name of the player isn't already in the array, add it
        const playerExists = this.players.some(p => player.name === p.name);
        const factionExists = this.players.some(p => p.faction.equals(player.faction));

        if (!playerExists && !factionExists) {
            this.players.push(player);
            this.savePlayers();
            return player;
        }
        else
            console.error("Cannot add the same player name or faction twice");
    }

    public editPlayer(playerId: number, name: string, faction: FactionEnum, loanId: number) {
        let player = this.players.find(p => p.id === playerId);

        if (player === undefined) return;

        // If the name of the player isn't already in the array, add it
        const playerNameExists = this.players.some(p => p.name === player?.name && p.id !== player?.id);
        const factionExists = this.players.some(p => p.faction.equals(player?.faction) && p.id !== player?.id);

        if (!playerNameExists && !factionExists) {
            player.update(name, faction, loanId);
            this.savePlayers();
        }
        else
            console.error("Cannot add the same player name or faction twice");
    }
    
    public removePlayer(player: Player) {
        const index = this._players.findIndex(p => p === player || p.name == player.name);
        if (index === -1)
            return;

        this._players.splice(index, 1);
        this.savePlayers();
    }

    public clearPlayers() {
        this._players = [];
    }

    private getNextPlayerId(): number {
        const ids = this.players.map(p => p.id);

        const max = Math.max(...ids);
        return max > 0 ? max + 1 : 1;
    }
}