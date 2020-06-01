import { IStorage } from './IStorage';

export class LocalStorage implements IStorage
{
    constructor() {
    }

    public getItem(key:string):any {
        return localStorage.getItem(key);
    }

    public setItem(key:string, value:string):void {
        localStorage.setItem(key, value);
    }

    public clear():void {
        localStorage.clear();
    }

    public removeItem(key:string):void {
        localStorage.removeItem(key);
    }
}
