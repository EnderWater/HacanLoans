import { Faction, FactionEnum } from "./Faction.js";

export class Player {
    private _id: number;
    private _name: string;
    private _faction: Faction;
    private _loanId: number;

    constructor(obj: PlayerConstructor) {
        this._id = obj.id;
        this._name = obj.name;
        this._faction = new Faction(obj.faction);
        this._loanId = obj.loanId;
    }

    public get id(): number {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;
    }
    
    public get faction(): Faction {
        return this._faction;
    }
    
    public set faction(value: Faction) {
        this._faction = value;
    }

    public get loanId(): number {
        return this._loanId;
    }
    
    public set loanId(value: number) {
        this._loanId = value;
    }

    public update(name: string, faction: FactionEnum, loanId: number) {
        this.name = name;
        this.faction = new Faction(faction);
        this.loanId = loanId;
    }
}

export interface PlayerConstructor {
    id: number;
    name: string;
    faction: FactionEnum;
    loanId: number;
}