import { Business } from './Business'

export class Wallet {
    private _items:Array<Business>;

    constructor() {
        this._items = new Array<Business>();
    }

    get totalBusiness():number {
        return this._items.length;
    }

    get cost():number {
        return this._items.reduce((acc:number, curr:Business) => acc + (curr.cost || 0), 0);
    }

    public addBusiness(business:Business) {
        this._items.push(business);
    }

    public totalBusinessOf(type:string) {
        const businesses = this._items.filter((business:Business) => business.type === type);
        return businesses.length;
    }

    public getProduction(timestamp:number):number {
        return this._items.reduce((acc:number, curr:Business) => acc + (curr.getProduction(timestamp) || 0), 0);
    }

    public workBusinessOf(type:string, timestamp:number) {
        this._items.forEach((business:Business) => {
            if (business.type === type) {
                business.work(timestamp);
            }
        })
    }

    public balance(timestamp:number):number {
        return this.getProduction(timestamp) - this.cost;
    }
}
