export interface IStorage {
    getItem(key:string):any;
    setItem(key:string, value:any):void;
    clear():void;
    removeItem(key:string):void;
}
