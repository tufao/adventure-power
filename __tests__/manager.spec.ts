import { Wallet } from "../src/model/data/Wallet";
import { BusinessType } from "../src/model/data/BusinessType";
import { Business } from "../src/model/data/Business";
import { Manager } from "../src/model/data/Manager";

describe('Testing Manager operations', () => {
    let wallet:Wallet;
    // 2 lemons every 1/2 seconds
    const typeLemons = new BusinessType('lemons', '', 'Lemons', 4, 0.5, 2);

    beforeEach(() => {
        wallet = new Wallet();
        const lemons = new Business(typeLemons, Date.now());
        wallet.addBusiness(lemons);
    });

    it('Add a manager to the wallet', () => {
        const lemonsManager = new Manager(typeLemons, 'name', 'description', 10);

        const time = Date.now();
        wallet.addManager(lemonsManager, time);

        expect(wallet.getProduction(time + 500)).toBe(2);
        expect(wallet.getProduction(time + 1000)).toBe(4);
        expect(wallet.getProduction(time + 1500)).toBe(6);
        expect(wallet.getProduction(time + 10000)).toBe(40);
    });

    it('Add a business that already has a manager', () => {
        const lemonsManager = new Manager(typeLemons, 'name', 'description', 1000);

        let time = Date.now();
        wallet.workBusinessOf(typeLemons, time);
        expect(wallet.getProduction(time)).toBe(0); // no lemons yet

        time += 2000;
        expect(wallet.getProduction(time)).toBe(2);
        wallet.addManager(lemonsManager, time);

        time += 2000;
        expect(wallet.getProduction(time)).toBe(10);

        // add more lemon business
        const morelemons = new Business(typeLemons, time);
        wallet.addBusiness(morelemons);
        expect(wallet.getProduction(time)).toBe(10);

        time += 2000;
        expect(wallet.getProduction(time)).toBe(26);
    });

    it('Check manager cost to the wallet', () => {
        const lemonsManager = new Manager(typeLemons, 'name', 'description', 10);

        const time = Date.now();
        wallet.addManager(lemonsManager, time);

        expect(wallet.cost).toBe(14);
    });
});
