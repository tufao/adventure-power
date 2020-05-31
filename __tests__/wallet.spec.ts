import { Business } from "../src/model/data/Business";
import { BusinessType } from "../src/model/data/BusinessType";
import { Wallet } from "../src/model/data/Wallet";

describe('Testing Wallet operations', () => {
    let wallet:Wallet;
    const typeLemons = new BusinessType('lemons', '', 'Lemons', 4, 0.5, 1);
    const typeNews = new BusinessType('newspaper', '', 'Newspaper', 60, 3, 60);

    beforeEach(() => {
        wallet = new Wallet();
    });

    it('Add a business to the wallet', () => {
        const lemons = new Business(typeLemons, Date.now());
        wallet.addBusiness(lemons);

        expect(wallet.totalBusiness).toBe(1);
    });

    it('Add two business to the wallet', () => {
        const lemons1 = new Business(typeLemons, Date.now());
        const lemons2 = new Business(typeLemons, Date.now());
        wallet.addBusiness(lemons1);
        wallet.addBusiness(lemons2);

        expect(wallet.totalBusiness).toBe(2);
    });

    it('Add business of different types to the wallet', () => {
        const lemons1 = new Business(typeLemons, Date.now());
        const lemons2 = new Business(typeLemons, Date.now());
        const news = new Business(typeNews, Date.now());
        wallet.addBusiness(lemons1);
        wallet.addBusiness(lemons2);
        wallet.addBusiness(news);

        expect(wallet.totalBusiness).toBe(3);
        expect(wallet.totalBusinessOf(typeLemons)).toBe(2);
        expect(wallet.totalBusinessOf(typeNews)).toBe(1);
    });

    it('Wallet business cost', () => {
        const lemons1 = new Business(typeLemons, Date.now());
        const lemons2 = new Business(typeLemons, Date.now());
        const news = new Business(typeNews, Date.now());
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
        const lemons1 = new Business(typeLemons, timestamp);
        expect(wallet.getProduction(Date.now())).toBe(0);

        // add lemons and squeeze them
        wallet.addBusiness(lemons1);
        wallet.workBusinessOf(typeLemons, timestamp);
        expect(wallet.getProduction(timestamp)).toBe(0);

        // check a second later
        timestamp += 1000;
        expect(wallet.getProduction(timestamp)).toBe(1);

        const lemons2 = new Business(typeLemons, timestamp);
        wallet.addBusiness(lemons2);
        wallet.workBusinessOf(typeLemons, timestamp);

        // check another second later
        timestamp += 1000;
        expect(wallet.getProduction(timestamp)).toBe(3);

        // add newspaper and start printing
        const news = new Business(typeNews, timestamp);
        wallet.addBusiness(news);
        wallet.workBusinessOf(typeNews, timestamp);

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
        const lemons = new Business(typeLemons, timestamp);
        wallet.addBusiness(lemons);
        expect(wallet.balance(Date.now())).toBe(-4);
    });

    it('Wallet balance with one business and some production', async () => {
        let timestamp = Date.now();
        const lemons = new Business(typeLemons, timestamp);
        wallet.addBusiness(lemons);
        wallet.workBusinessOf(typeLemons, timestamp);
        timestamp += 500;
        expect(wallet.balance(timestamp)).toBe(-3);
        wallet.workBusinessOf(typeLemons, timestamp);
        timestamp += 500;
        expect(wallet.balance(timestamp)).toBe(-2);
        wallet.workBusinessOf(typeLemons, timestamp + 500);
        wallet.workBusinessOf(typeLemons, timestamp + 1000);
        wallet.workBusinessOf(typeLemons, timestamp + 1500);
        wallet.workBusinessOf(typeLemons, timestamp + 2000);
        wallet.workBusinessOf(typeLemons, timestamp + 2500);
        expect(wallet.balance(timestamp + 3000)).toBe(3);
    });

    it('Wallet balance with two business and some production', async () => {
        let timestamp = Date.now();
        const lemons1 = new Business(typeLemons, timestamp);
        const lemons2 = new Business(typeLemons, timestamp);
        wallet.addBusiness(lemons1);
        wallet.addBusiness(lemons2);
        expect(wallet.balance(timestamp)).toBe(-8);
        wallet.workBusinessOf(typeLemons, timestamp);
        timestamp += 500;
        expect(wallet.balance(timestamp)).toBe(-6);
        wallet.workBusinessOf(typeLemons, timestamp);
        timestamp += 500;
        expect(wallet.balance(timestamp)).toBe(-4);
        wallet.workBusinessOf(typeLemons, timestamp + 500);
        wallet.workBusinessOf(typeLemons, timestamp + 1000);
        wallet.workBusinessOf(typeLemons, timestamp + 1500);
        wallet.workBusinessOf(typeLemons, timestamp + 2000);
        wallet.workBusinessOf(typeLemons, timestamp + 2500);
        expect(wallet.balance(timestamp + 3000)).toBe(6);
    });

    it('Get business of specific business type', () => {
        const lemons1 = new Business(typeLemons, Date.now());
        const lemons2 = new Business(typeLemons, Date.now());
        const news = new Business(typeNews, Date.now());
        wallet.addBusiness(lemons1);
        wallet.addBusiness(lemons2);
        wallet.addBusiness(news);

        expect(wallet.getBusinessOf(typeLemons).length).toBe(2);
        expect(wallet.getBusinessOf(typeNews).length).toBe(1);
    });

    it('Get production for a specific business type', () => {
        const lemons1 = new Business(typeLemons, Date.now());
        const lemons2 = new Business(typeLemons, Date.now());
        const news = new Business(typeNews, Date.now());
        wallet.addBusiness(lemons1);
        wallet.addBusiness(lemons2);
        wallet.addBusiness(news);

        // start producing
        wallet.workBusinessOf(typeLemons, Date.now());
        wallet.workBusinessOf(typeNews, Date.now());

        expect(wallet.getProductionOf(typeLemons, Date.now() + 1000)).toBe(2);
        expect(wallet.getProductionOf(typeNews, Date.now() + 60000)).toBe(60);
    });
});