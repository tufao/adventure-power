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

    addBusiness(business:Business) {
        this._items.push(business);
    }

    totalBusinessOf(type:string) {
        const businesses = this._items.filter((business:Business) => business.type === type);
        return businesses.length;
    }
}
