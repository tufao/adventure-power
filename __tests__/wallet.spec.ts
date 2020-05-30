import { Business } from "../src/model/data/Business";
import { Wallet } from "../src/model/data/Wallet";

describe('Testing Wallet operations', () => {
    let wallet:Wallet;

    beforeEach(() => {
        wallet = new Wallet();
    });

    it('Add a business to the wallet', () => {
        const lemons = new Business('lemons', '', 'Lemons', 4, 0.5, 1, Date.now());
        wallet.addBusiness(lemons);

        expect(wallet.totalBusiness).toBe(1);
    });

    it('Add two business to the wallet', () => {
        const lemons1 = new Business('lemons', '', 'Lemons', 4, 0.5, 1, Date.now());
        const lemons2 = new Business('lemons', '', 'Lemons', 4, 0.5, 1, Date.now());
        wallet.addBusiness(lemons1);
        wallet.addBusiness(lemons2);

        expect(wallet.totalBusiness).toBe(2);
    });

    it('Add business of different types to the wallet', () => {
        const lemons1 = new Business('lemons', '', 'Lemons', 4, 0.5, 1, Date.now());
        const lemons2 = new Business('lemons', '', 'Lemons', 4, 0.5, 1, Date.now());
        const news = new Business('newspaper', '', 'Newspaper', 60, 3, 60, Date.now());
        wallet.addBusiness(lemons1);
        wallet.addBusiness(lemons2);
        wallet.addBusiness(news);

        expect(wallet.totalBusiness).toBe(3);
        expect(wallet.totalBusinessOf('lemons')).toBe(2);
        expect(wallet.totalBusinessOf('newspaper')).toBe(1);
    });

    it('Wallet business cost', () => {
        const lemons1 = new Business('lemons', '', 'Lemons', 4, 0.5, 1, Date.now());
        const lemons2 = new Business('lemons', '', 'Lemons', 4, 0.5, 1, Date.now());
        const news = new Business('newspaper', '', 'Newspaper', 60, 3, 60, Date.now());
        expect(wallet.cost).toBe(0);

        wallet.addBusiness(lemons1);
        expect(wallet.cost).toBe(4);

        wallet.addBusiness(lemons2);
        expect(wallet.cost).toBe(8);

        wallet.addBusiness(news);
        expect(wallet.cost).toBe(68);
    });

    it('Wallet business production', async () => {
        let timestamp = Date.now();
        const lemons1 = new Business('lemons', '', 'Lemons', 4, 0.5, 1, timestamp);
        expect(wallet.getProduction(Date.now())).toBe(0);

        // add lemons and squeeze them
        wallet.addBusiness(lemons1);
        wallet.workBusinessOf('lemons', timestamp);
        expect(wallet.getProduction(timestamp)).toBe(0);

        // check a second later
        timestamp += 1000;
        expect(wallet.getProduction(timestamp)).toBe(1);

        const lemons2 = new Business('lemons', '', 'Lemons', 4, 0.5, 1, timestamp);
        wallet.addBusiness(lemons2);
        wallet.workBusinessOf('lemons', timestamp);

        // check another second later
        timestamp += 1000;
        expect(wallet.getProduction(timestamp)).toBe(3);

        // add newspaper and start printing
        const news = new Business('newspaper', '', 'Newspaper', 60, 3, 60, timestamp);
        wallet.addBusiness(news);
        wallet.workBusinessOf('newspaper', timestamp);

        // check 2 seconds later
        timestamp += 2000;
        expect(wallet.getProduction(timestamp)).toBe(3);

        // check another second later to be ready
        timestamp += 1000;
        expect(wallet.getProduction(timestamp)).toBe(63);
    });

    it('Wallet balance without business', async () => {
        expect(wallet.balance(Date.now())).toBe(0);
    });

    it('Wallet balance with one business and no production', async () => {
        let timestamp = Date.now();
        const lemons = new Business('lemons', '', 'Lemons', 4, 0.5, 1, timestamp);
        wallet.addBusiness(lemons);
        expect(wallet.balance(Date.now())).toBe(-4);
    });

    it('Wallet balance with one business and some production', async () => {
        let timestamp = Date.now();
        const lemons = new Business('lemons', '', 'Lemons', 4, 0.5, 1, timestamp);
        wallet.addBusiness(lemons);
        wallet.workBusinessOf('lemons', timestamp);
        timestamp += 500;
        expect(wallet.balance(timestamp)).toBe(-3);
        wallet.workBusinessOf('lemons', timestamp);
        timestamp += 500;
        expect(wallet.balance(timestamp)).toBe(-2);
        wallet.workBusinessOf('lemons', timestamp + 500);
        wallet.workBusinessOf('lemons', timestamp + 1000);
        wallet.workBusinessOf('lemons', timestamp + 1500);
        wallet.workBusinessOf('lemons', timestamp + 2000);
        wallet.workBusinessOf('lemons', timestamp + 2500);
        expect(wallet.balance(timestamp + 3000)).toBe(3);
    });

    it('Wallet balance with two business and some production', async () => {
        let timestamp = Date.now();
        const lemons1 = new Business('lemons', '', 'Lemons', 4, 0.5, 1, timestamp);
        const lemons2 = new Business('lemons', '', 'Lemons', 4, 0.5, 1, timestamp);
        wallet.addBusiness(lemons1);
        wallet.addBusiness(lemons2);
        expect(wallet.balance(timestamp)).toBe(-8);
        wallet.workBusinessOf('lemons', timestamp);
        timestamp += 500;
        expect(wallet.balance(timestamp)).toBe(-6);
        wallet.workBusinessOf('lemons', timestamp);
        timestamp += 500;
        expect(wallet.balance(timestamp)).toBe(-4);
        wallet.workBusinessOf('lemons', timestamp + 500);
        wallet.workBusinessOf('lemons', timestamp + 1000);
        wallet.workBusinessOf('lemons', timestamp + 1500);
        wallet.workBusinessOf('lemons', timestamp + 2000);
        wallet.workBusinessOf('lemons', timestamp + 2500);
        expect(wallet.balance(timestamp + 3000)).toBe(6);
    });
});