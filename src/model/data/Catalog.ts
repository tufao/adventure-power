import { BusinessType } from './BusinessType';

export class Catalog {
    private _types:Array<BusinessType>;

    constructor() {
        this._types = new Array<BusinessType>();
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
}
