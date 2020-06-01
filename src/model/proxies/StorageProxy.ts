import { Wallet } from '../data/Wallet';
import { IStorage } from './IStorage';

export class StorageProxy {
    private _storage:IStorage;

    constructor(storage:IStorage) {
        this._storage = storage;
    }

    saveWallet(wallet:Wallet) {
        const data = JSON.stringify(wallet);
        this._storage.setItem('wallet', data);
    }

    loadWallet():Wallet | undefined {
        const data = this._storage.getItem('wallet');
        if (data) {
            return Wallet.parse(JSON.parse(data));
        }
        return undefined;

        return wallet;
    }
}
