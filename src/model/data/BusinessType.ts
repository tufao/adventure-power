export class BusinessType {
    private _type:string;
    private _icon:string;
    private _name:string;
    private _cost:number;
    private _time:number;
    private _capacity:number;

    constructor(type:string, icon:string, name:string, cost:number, time:number, capacity:number) {
        this._type = type;
        this._icon = icon;
        this._name = name;
        this._cost = cost;
        this._time = time;
        this._capacity = capacity;
    }

    get type():string {
        return this._type;
    }

    get icon():string {
        return this._icon;
    }

    get name():string {
        return this._name;
    }

    get cost():number {
        return this._cost;
    }

    get time():number {
        return this._time;
    }

    get capacity():number {
        return this._capacity;
    }
}