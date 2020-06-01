import { IStorage } from "../../src/model/proxies/IStorage";

export class LocalStorageMock implements IStorage
{
    private _store:any;
    constructor() {
        this._store = {};
    }

    public getItem(key:string):any {
        return this._store[key];
    }

    public setItem(key:string, value:any):void {
        this._store[key] = value.toString();
    }

    public clear():void {
        this._store = {};
    }

    public removeItem(key:string):void {
        delete this._store[key];
    }
}
