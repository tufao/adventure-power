import { Business } from './Business'

export class Wallet {
    private _items:Array<Business>;

    constructor() {
        this._items = new Array<Business>();
    }

    get totalBusiness():number {
        return this._items.length;
    }

    addBusiness(business:Business) {
        this._items.push(business);
    }

    totalBusinessOf(type:string) {
        const businesses = this._items.filter((business:Business) => business.type === type);
        return businesses.length;
    }
}
