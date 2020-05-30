import { Business } from '../src/model/data/Business';
import { BusinessType } from '../src/model/data/BusinessType';

describe('Testing Business operations', () => {

    const typeA = new BusinessType('a', '', 'a', 1, 0, 1);
    const typeB = new BusinessType('b', '', 'b', 1, 1, 1);
    const typeC = new BusinessType('c', '', 'b', 1, 1, 2);
    const typeD = new BusinessType('d', '', 'd', 1, 0, 10);

    it('Test Business single production with instant work', () => {
        const business = new Business(typeA, Date.now());
        business.work(Date.now());

        expect(business.getProduction(Date.now())).toBe(1);
    });

    it('Test Business double production width instant work', () => {
        const business = new Business(typeA, Date.now());
        business.work(Date.now());
        business.work(Date.now());

        expect(business.getProduction(Date.now())).toBe(2);
    });

    it('Test Business error production while busy', () => {
        const business = new Business(typeB, Date.now());
        business.work(Date.now());

        expect(() => {
            business.work(Date.now());
        }).toThrow('busy');
    });

    it('Test Business doubble production given the time', async () => {
        let time = Date.now();
        const business = new Business(typeC, time);
        business.work(time);

        // give it a second
        time += 1001;

        // 1st should be complete
        expect(business.getProduction(time)).toBe(2);

        // work on 2nd
        business.work(time);

        // 2nd not yet done
        expect(business.getProduction(time)).toBe(2);

        // 2nd should be complete
        expect(business.getProduction(time + 1001)).toBe(4);
    });

    it('Test Business work progress', async () => {
        const business = new Business(typeC, Date.now());
        business.work(Date.now());

        // it should be starting
        expect(business.getProgress(Date.now())).toBeCloseTo(0);

        // it should be half way half a second later
        expect(business.getProgress(Date.now() + 500)).toBeCloseTo(.5);

        // it should be complete a second later
        expect(business.getProgress(Date.now() + 1000)).toBeCloseTo(1);

        // it should be 100% complete later
        expect(business.getProgress(Date.now() + 2000)).toBe(1);
    });

    it('Test Business progress with no work', async () => {
        const business = new Business(typeC, Date.now());

        // no progress regardless of the time
        expect(business.getProgress(Date.now())).toBeCloseTo(0);
        expect(business.getProgress(Date.now() + 500)).toBeCloseTo(0);
        expect(business.getProgress(Date.now() + 1000)).toBeCloseTo(0);
    });

    it('Test several instance of Business', async () => {
        const b1 = new Business(typeD, Date.now());
        b1.work(Date.now());
        expect(b1.getProduction(Date.now())).toBe(10);

        const b2 = new Business(typeD, Date.now());
        expect(b1.getProduction(Date.now()) + b2.getProduction(Date.now())).toBe(10);
        b1.work(Date.now());
        b2.work(Date.now());
        expect(b1.getProduction(Date.now()) + b2.getProduction(Date.now())).toBe(30);
        b1.work(Date.now());
        b2.work(Date.now());

        const b3 = new Business(typeD, Date.now());
        expect(b1.getProduction(Date.now()) + b2.getProduction(Date.now()) + b3.getProduction(Date.now())).toBe(50);
        b1.work(Date.now());
        b2.work(Date.now());
        b3.work(Date.now());

        expect(b1.getProduction(Date.now()) + b2.getProduction(Date.now()) + b3.getProduction(Date.now())).toBe(80);
    });

    it('Test Business ready to work', async () => {
        const time = Date.now();
        const business = new Business(typeC, time);
        business.work(time);

        // it should be falsy
        expect(business.isReady(time + 500)).toBeFalsy();
        // it should be ready
        expect(business.isReady(time + 1000)).toBeTruthy();
    });
});
