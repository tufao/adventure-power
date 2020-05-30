import { BusinessType } from './BusinessType';

export class Catalog {
    private _list:Array<BusinessType>;

    constructor() {
        this._list = new Array<BusinessType>();
    }

    get totalTypes():number {
        return this._list.length;
    }

    public addBusinessType(type:BusinessType) {
        this._list.push(type);
    }

    public getTypes():Array<BusinessType> {
        return this._list;
    }
}
