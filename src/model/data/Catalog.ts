import { BusinessType } from './BusinessType';
import { Manager } from './Manager';

export class Catalog {
    private _types:Array<BusinessType>;
    private _managers:Map<BusinessType, Manager>;

    constructor() {
        this._types = new Array<BusinessType>();
        this._managers = new Map<BusinessType, Manager>();
    }

    get totalTypes():number {
        return this._types.length;
    }

    public addBusinessType(type:BusinessType) {
        this._types.push(type);
    }

    public getTypes():Array<BusinessType> {
        return this._types;
    }

    public addManager(manager:Manager) {
        this._managers.set(manager.type, manager);
    }

    public getManager(type:BusinessType) {
        if (this._managers.has(type)) {
            return this._managers.get(type);
        }
        return null;
    }
}
