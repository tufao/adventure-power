import { BusinessType } from './BusinessType';

export class Business {
    private _type:BusinessType;

    private _counter:number;
    private _productionEnds:number;

    constructor(type:BusinessType, created:number) {
        this._type = type;

        this._counter = 0;
        this._productionEnds = created;
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

    public getProduction(timestamp:number):number {
        const last = timestamp >= this._productionEnds ? this.capacity : 0;
        return (this._counter - 1) * this.capacity + last;
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
        const perc = 1 - (this._productionEnds - timestamp) / (this.time * 1000);
        return Math.min(Math.max(0, perc), 1);
    }

    public isReady(timestamp:number):boolean {
        return this._counter === 0 || this.getProgress(timestamp) === 1;
    }

}