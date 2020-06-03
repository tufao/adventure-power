import { Business } from "../src/model/data/Business";
import { BusinessType } from "../src/model/data/BusinessType";
import { Wallet } from "../src/model/data/Wallet";
import { StorageProxy } from "../src/model/proxies/StorageProxy";
import { LocalStorageMock } from "./mocks/LocalStorageMock";
import { Manager } from "../src/model/data/Manager";

describe('Testing Storage operations', () => {
    const typeLemons = new BusinessType('lemons', '', 'Lemons', 4, 0.5, 1);
    const typeNews = new BusinessType('newspaper', '', 'Newspaper', 60, 3, 60);
    let wallet:Wallet;

    beforeEach(() => {
        wallet = new Wallet();
        const lemons1 = new Business(typeLemons, Date.now());
        const lemons2 = new Business(typeLemons, Date.now());
        const news = new Business(typeNews, Date.now());
        wallet.addBusiness(lemons1);
        wallet.addBusiness(lemons2);
        wallet.addBusiness(news);
    })

    it('Loaded wallet is equal to the saved simple wallet', () => {
        const storage = new StorageProxy(new LocalStorageMock());
        storage.saveWallet(wallet);

        const loaded = storage.loadWallet();
        if (loaded) {
            expect(loaded).toMatchObject(wallet);
            expect(loaded.balance(Date.now())).toBe(wallet.balance(Date.now()));
        }
    });

    it('Loaded wallet has the same balance as before', () => {
        const storage = new StorageProxy(new LocalStorageMock());
        storage.saveWallet(wallet);

        const loaded = storage.loadWallet();
        if (loaded) {
            expect(loaded.balance(Date.now())).toBe(wallet.balance(Date.now()));
        }
    });

    it('Loaded wallet has the same balance as before with work', () => {
        let time = Date.now();
        wallet.workBusinessOf(typeLemons, time);
        wallet.workBusinessOf(typeLemons, time + 1000);
        wallet.workBusinessOf(typeNews, time + 1000);

        const storage = new StorageProxy(new LocalStorageMock());
        storage.saveWallet(wallet);

        const loaded = storage.loadWallet();
        if (loaded) {
            time += 5000;
            expect(loaded.balance(time)).toBe(wallet.balance(time));
        }
    });

    it('Loaded wallet has the same balance as before with managers', () => {
        let time = Date.now();
        const lemonsManager = new Manager(typeLemons, 'name', 'description', 0);
        wallet.workBusinessOf(typeLemons, time);
        wallet.addManager(lemonsManager, time + 1000);

        const storage = new StorageProxy(new LocalStorageMock());
        storage.saveWallet(wallet);

        const loaded = storage.loadWallet();
        if (loaded) {
            time += 5000;
            expect(loaded.balance(time)).toBe(wallet.balance(time));

            expect(wallet.hasManager(typeLemons)).toBeTruthy();
            expect(loaded.hasManager(typeLemons)).toBeTruthy();
        }
    });

    it('Loaded wallet that was not saved', () => {
        const storage = new StorageProxy(new LocalStorageMock());
        const loaded = storage.loadWallet();
        if (loaded) {
            expect(loaded.balance(Date.now())).toBe(0);
        }
    });

});