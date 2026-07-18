import { Faction } from "./Faction.js";
export class Player {
    _id;
    _name;
    _faction;
    _loanId;
    constructor(obj) {
        this._id = obj.id;
        this._name = obj.name;
        this._faction = new Faction(obj.faction);
        this._loanId = obj.loanId;
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get faction() {
        return this._faction;
    }
    set faction(value) {
        this._faction = value;
    }
    get loanId() {
        return this._loanId;
    }
    set loanId(value) {
        this._loanId = value;
    }
    update(name, faction, loanId) {
        this.name = name;
        this.faction = new Faction(faction);
        this.loanId = loanId;
    }
}
//# sourceMappingURL=Player.js.map