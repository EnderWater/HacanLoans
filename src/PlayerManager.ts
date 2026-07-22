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
        });

        // If the name of the player isn't already in the array, add it
        const factionExists = this.players.some(p => p.faction.equals(player.faction));

        if (!factionExists) {
            this.players.push(player);
            this.savePlayers();
            return player;
        }
        else
            console.error("Cannot add the same player name or faction twice");
    }

    public editPlayer(playerId: number, name: string, faction: FactionEnum) {
        let player = this.players.find(p => p.id === playerId);

        if (player === undefined) return;

        // If the name of the player isn't already in the array, add it
        const factionExists = this.players.some(p => p.faction.equals(player?.faction) && p.id !== player?.id);

        if (!factionExists) {
            player.update(name, faction);
            this.savePlayers();
        }
        else
            console.error("Cannot add the same faction twice");
    }
    
    public removePlayer(playerId: number) {
        const index = this._players.findIndex(p => p.id === playerId);
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