export class BusinessType {
    private _id:string;
    private _icon:string;
    private _name:string;
    private _cost:number;
    private _time:number;
    private _capacity:number;

    constructor(id:string, icon:string, name:string, cost:number, time:number, capacity:number) {
        this._id = id;
        this._icon = icon;
        this._name = name;
        this._cost = cost;
        this._time = time;
        this._capacity = capacity;
    }

    public static parse(obj:any):BusinessType {
        const type = new BusinessType(obj._id, obj._icon, obj._name, obj._cost, obj._time, obj._capacity);
        return type;
    }

    get id():string {
        return this._id;
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