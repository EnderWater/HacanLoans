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
    update(name, faction) {
        this.name = name;
        this.faction = new Faction(faction);
    }
}
//# sourceMappingURL=Player.js.map