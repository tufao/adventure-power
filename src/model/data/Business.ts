import { BusinessType } from './BusinessType';

export class Business {
    private _type:BusinessType;

    private _counter:number;
    private _productionEnds:number;
    private _autoStart:number;
    private _created:number;

    constructor(type:BusinessType, created:number) {
        this._type = type;
        this._created = created;

        this._counter = 0;
        this._productionEnds = created;
        this._autoStart = 0;
    }

    public static parse(obj:any):Business {
        const type = BusinessType.parse(obj._type);
        const business = new Business(type, obj._created);
        business.counter = obj._counter;
        business.productionEnds = obj._productionEnds;
        business.autoStart = obj._autoStart;
        return business;
    }

    get type():BusinessType {
        return this._type;
    }

    get icon():string {
        return this._type.icon;
    }

    get name():string {
        return this._type.name;
    }

    get cost():number {
        return this._type.cost;
    }

    get time():number {
        return this._type.time;
    }

    get capacity():number {
        return this._type.capacity;
    }

    get created():number {
        return this._created;
    }

    set counter(value:number) {
        this._counter = value;
    }

    set productionEnds(value:number) {
        this._productionEnds = value;
    }

    set autoStart(value:number) {
        this._autoStart = value;
    }

    public getProduction(timestamp:number):number {
        const auto = this._autoStart ? Math.floor((timestamp - this._autoStart) / (this.time * 1000)) : 0;
        const last = timestamp >= this._productionEnds ? this.capacity : 0;
        return (this._counter - 1) * this.capacity + last + auto;
    }

    public work(timestamp:number) {
        if (timestamp < this._productionEnds) {
            throw new Error('busy');
        }

        this._counter++;
        this._productionEnds = timestamp + this.time * 1000;
    }

    public getProgress(timestamp:number):number {
        if (this._counter === 0) {
            return 0;
        }
        const milisecs = this.time * 1000;
        if (this._autoStart) {
            const rest = Math.floor((timestamp - this._autoStart) % milisecs);
            return rest / milisecs;
        }
        const perc = 1 - (this._productionEnds - timestamp) / (this.time * 1000);
        return Math.min(Math.max(0, perc), 1);
    }

    public isReady(timestamp:number):boolean {
        return this._counter === 0 || this.getProgress(timestamp) === 1;
    }

    public startAutoWork(timestamp:number) {
        this._autoStart = timestamp;
    }
}