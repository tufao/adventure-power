import { BusinessType } from './BusinessType'

export class Manager {
    private _type:BusinessType;
    private _name:string;
    private _description:string;
    private _cost:number;
    private _hired:number;

    constructor(type:BusinessType, name:string, description:string, cost:number) {
        this._type = type;
        this._name = name;
        this._description = description;
        this._cost = cost;
        this._hired = 0;
    }

    get type():BusinessType {
        return this._type;
    }

    get name():string {
        return this._name;
    }

    get description():string {
        return this._description;
    }

    get cost():number {
        return this._cost;
    }

    get hiredDate():number {
        return this._hired;
    }

    public hire(timestamp:number) {
        this._hired = timestamp;
    }
}
