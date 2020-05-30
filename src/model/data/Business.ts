export class Business {
    private _type:string;
    private _icon:string;
    private _name:string;
    private _cost:number;
    private _time:number;
    private _capacity:number;

    private _counter:number;
    private _productionEnds:number;

    constructor(type:string, icon:string, name:string, cost:number, time:number, capacity:number, created:number) {
        this._type = type;
        this._icon = icon;
        this._name = name;
        this._cost = cost;
        this._time = time * 1000;
        this._capacity = capacity;

        this._counter = 0;
        this._productionEnds = created;
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

    public getProduction(timestamp:number):number {
        const last = timestamp >= this._productionEnds ? this._capacity : 0;
        return (this._counter - 1) * this._capacity + last;
    }

    public work(timestamp:number) {
        if (timestamp < this._productionEnds) {
            throw new Error('busy');
        }

        this._counter++;
        this._productionEnds = timestamp + this._time;
    }

    public getProgress(timestamp:number):number {
        if (this._counter === 0) {
            return 0;
        }
        const perc = 1 - (this._productionEnds - timestamp) / this._time;
        return Math.min(Math.max(0, perc), 1);
    }
}