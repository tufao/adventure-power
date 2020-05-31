import { IStorage } from './IStorage';
import { Wallet } from '../data/Wallet';

export class StorageProxy {
    private _storage:IStorage;

    constructor(storage:IStorage) {
        this._storage = storage;
    }

    saveWallet(wallet:Wallet) {
        const data = JSON.stringify(wallet);
        this._storage.setItem('wallet', data);
    }

    loadWallet():Wallet {
        const data = this._storage.getItem('wallet');
        if (!data) {
            return new Wallet();
        }
        const wallet = Wallet.parse(JSON.parse(data));

        return wallet;
    }
}
