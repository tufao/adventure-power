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
        const lemons1 = new Business('lemons', '', 'Lemons', 4, 0.5, 1, Date.now());
        const lemons2 = new Business('lemons', '', 'Lemons', 4, 0.5, 1, Date.now());
        const news = new Business('newspaper', '', 'Newspaper', 60, 3, 60, Date.now());
        expect(wallet.getProduction(Date.now())).toBe(0);

        // add lemons and squeeze them
        wallet.addBusiness(lemons1);
        wallet.workBusinessOf('lemons');
        expect(wallet.getProduction(Date.now())).toBe(0);

        // wait a second to check again
        await new Promise((resolve) => setInterval(resolve, 1001));
        expect(wallet.getProduction(Date.now())).toBe(1);

        wallet.addBusiness(lemons2);
        wallet.workBusinessOf('lemons');

        // wait a second to check again
        await new Promise((resolve) => setInterval(resolve, 1001));
        expect(wallet.getProduction(Date.now())).toBe(3);
    });
});