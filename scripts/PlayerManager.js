import { Player } from "./Player.js";
export class PlayerManager {
    _players;
    get players() {
        return this._players;
    }
    set players(value) {
        this._players = value;
    }
    constructor() {
        this._players = this.loadPlayersFromStorage();
    }
    loadPlayersFromStorage() {
        const players = localStorage.getItem("players");
        if (players == null)
            return [];
        const parsedPlayers = JSON.parse(players);
        if (!(parsedPlayers instanceof Array))
            return [];
        return parsedPlayers.map(p => {
            const obj = {
                id: p.id,
                name: p.name,
                faction: p.faction,
            };
            return new Player(obj);
        });
    }
    savePlayers() {
        const storageObj = this.players.map(p => {
            return {
                id: p.id,
                name: p.name,
                faction: p.faction.factionType,
            };
        });
        localStorage.setItem("players", JSON.stringify(storageObj));
    }
    addPlayer(name, faction, loanId) {
        const id = this.getNextPlayerId();
        const player = new Player({
            id,
            name,
            faction,
        });
        const factionExists = this.players.some(p => p.faction.equals(player.faction));
        if (!factionExists) {
            this.players.push(player);
            this.savePlayers();
            return player;
        }
        else
            console.error("Cannot add the same player name or faction twice");
    }
    editPlayer(playerId, name, faction) {
        let player = this.players.find(p => p.id === playerId);
        if (player === undefined)
            return;
        const factionExists = this.players.some(p => p.faction.equals(player?.faction) && p.id !== player?.id);
        if (!factionExists) {
            player.update(name, faction);
            this.savePlayers();
        }
        else
            console.error("Cannot add the same faction twice");
    }
    removePlayer(playerId) {
        const index = this._players.findIndex(p => p.id === playerId);
        if (index === -1)
            return;
        this._players.splice(index, 1);
        this.savePlayers();
    }
    clearPlayers() {
        this._players = [];
    }
    getNextPlayerId() {
        const ids = this.players.map(p => p.id);
        const max = Math.max(...ids);
        return max > 0 ? max + 1 : 1;
    }
}
//# sourceMappingURL=PlayerManager.js.map