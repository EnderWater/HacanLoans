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
                loanId: p.loanId,
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
                loanId: p.loanId,
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
            loanId,
        });
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
    editPlayer(playerId, name, faction, loanId) {
        let player = this.players.find(p => p.id === playerId);
        if (player === undefined)
            return;
        const playerNameExists = this.players.some(p => p.name === player?.name && p.id !== player?.id);
        const factionExists = this.players.some(p => p.faction.equals(player?.faction) && p.id !== player?.id);
        if (!playerNameExists && !factionExists) {
            player.update(name, faction, loanId);
            this.savePlayers();
        }
        else
            console.error("Cannot add the same player name or faction twice");
    }
    removePlayer(player) {
        const index = this._players.findIndex(p => p === player || p.name == player.name);
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