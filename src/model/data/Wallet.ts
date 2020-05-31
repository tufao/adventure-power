import { Business } from './Business'
import { BusinessType } from './BusinessType';
import { Manager } from './Manager';

export class Wallet {
    private _items:Array<Business>;
    private _managers:Map<BusinessType, Manager>;
    private _value:number;

    constructor() {
        this._items = new Array<Business>();
        this._value = 0;
        this._managers = new Map<BusinessType, Manager>();
    }

    public static parse(obj:any):Wallet {
        const wallet = new Wallet();
        // Parse businesses
        for (const item of obj._items) {
            const business = Business.parse(item);
            business.counter = item._counter;
            business.productionEnds = item._productionEnds;
            business.autoStart = item._autoStart;
            wallet.addBusiness(business);
        }

        return wallet;
    }

    get totalBusiness():number {
        return this._items.length;
    }

    get cost():number {
        return this._items.reduce((acc:number, curr:Business) => acc + (curr.cost || 0), 0);
    }

    public addBusiness(business:Business) {
        const manager = this.getManager(business.type);
        if (manager) {
            business.startAutoWork(manager.hiredDate);
        }
        this._items.push(business);
    }

    public totalBusinessOf(type:BusinessType) {
        const businesses = this._items.filter((business:Business) => business.type === type);
        return businesses.length;
    }

    public getProduction(timestamp:number):number {
        return this._items.reduce((acc:number, curr:Business) => acc + (curr.getProduction(timestamp) || 0), 0);
    }

    public workBusinessOf(type:BusinessType, timestamp:number) {
        this._items.forEach((business:Business) => {
            if (business.type === type && business.isReady(timestamp)) {
                business.work(timestamp);
            }
        })
    }

    public balance(timestamp:number):number {
        return this._value + this.getProduction(timestamp) - this.cost;
    }

    public getBusiness():Array<Business> {
        return this._items;
    }

    public getBusinessOf(type:BusinessType):Array<Business> {
        const ret = this._items.filter((business:Business) => business.type === type);
        return ret;
    }

    public getProductionOf(type:BusinessType, timestamp:number):number {
        const businesses = this.getBusinessOf(type);
        return businesses.reduce((acc:number, curr:Business) => acc + (curr.getProduction(timestamp) || 0), 0);
    }

    public addValue(value:number) {
        this._value += value;
    }

    public addManager(manager:Manager, timestamp:number) {
        manager.hire(timestamp);

        this._managers.set(manager.type, manager);

        // put him to work!
        const businesses = this.getBusinessOf(manager.type);
        businesses.forEach((business:Business) => {
            business.startAutoWork(timestamp);
        })
    }

    public hasManager(type:BusinessType) {
        return this._managers.has(type);
    }

    private getManager(type:BusinessType) {
        if (this.hasManager(type)) {
            return this._managers.get(type);
        }

        return null;
    }
}
