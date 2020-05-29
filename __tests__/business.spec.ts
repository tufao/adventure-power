import { Business } from '../src/model/data/Business';

describe('Testing Business operations', () => {

    it('Test Business single production with instant work', () => {
        const business = new Business('a', '', 'a', 1, 0, 1);
        business.work();

        expect(business.getProduction(Date.now())).toBe(1);
    });

    it('Test Business double production width instant work', () => {
        const business = new Business('a', '', 'a', 1, 0, 1);
        business.work();
        business.work();

        expect(business.getProduction(Date.now())).toBe(2);
    });

    it('Test Business error production while busy', () => {
        const business = new Business('a', '', 'a', 1, 1, 1);
        business.work();

        expect(() => {
            business.work();
        }).toThrow('busy');
    });

    it('Test Business doubble production given the time', async () => {
        const business = new Business('a', '', 'a', 1, 1, 2);
        business.work();

        // wait a second to work again
        await new Promise((resolve) => setInterval(resolve, 1001));

        // 1st should be complete
        expect(business.getProduction(Date.now())).toBe(2);

        // work on 2nd
        business.work();

        // 2nd not yet done
        expect(business.getProduction(Date.now())).toBe(2);

        // 2nd should be complete
        expect(business.getProduction(Date.now() + 1001)).toBe(4);
    });
});
