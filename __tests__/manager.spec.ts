import { Wallet } from "../src/model/data/Wallet";
import { BusinessType } from "../src/model/data/BusinessType";
import { Business } from "../src/model/data/Business";
import { Manager } from "../src/model/data/Manager";

describe('Testing Manager operations', () => {
    let wallet:Wallet;
    const typeLemons = new BusinessType('lemons', '', 'Lemons', 4, 0.5, 1);

    beforeEach(() => {
        wallet = new Wallet();
        const lemons = new Business(typeLemons, Date.now());
        wallet.addBusiness(lemons);
    });

    it('Add a manager to the wallet', () => {
        const lemonsManager = new Manager(typeLemons, 'name', 'description', 1000);

        const time = Date.now();
        wallet.addManager(lemonsManager, time);

        expect(wallet.getProduction(time + 500)).toBe(1);
        expect(wallet.getProduction(time + 1000)).toBe(2);
        expect(wallet.getProduction(time + 1500)).toBe(3);
        expect(wallet.getProduction(time + 10000)).toBe(20);
    });

    it('Add a business that already has a manager', () => {
    });
});
