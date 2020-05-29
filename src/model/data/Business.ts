export class Business {
    private _type:string;
    private _icon:string;
    private _name:string;
    private _cost:number;
    private _time:number;
    private _capacity:number;

    private _counter:number;
    private _productionEnds:number;

    constructor(type:string, icon:string, name:string, cost:number, time:number, capacity:number) {
        this._type = type;
        this._icon = icon;
        this._name = name;
        this._cost = cost;
        this._time = time;
        this._capacity = capacity;

        this._counter = 0;
        this._productionEnds = 0;
    }

    public getProduction(timestamp:number):number {
        const last = timestamp >= this._productionEnds ? this._capacity : 0;
        return (this._counter - 1) * this._capacity + last;
    }

    public work() {
        if (Date.now() < this._productionEnds) {
            throw new Error('busy');
        }

        this._counter++;
        this._productionEnds = Date.now() + this._time * 1000;
    }
}