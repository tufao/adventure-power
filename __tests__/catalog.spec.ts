import { BusinessType } from "../src/model/data/BusinessType";
import { Catalog } from "../src/model/data/Catalog";

describe('Testing Catalog operations', () => {
    let catalog:Catalog;
    const typeLemons = new BusinessType('lemons', '', 'Lemons', 4, 0.5, 1);
    const typeNews = new BusinessType('newspaper', '', 'Newspaper', 60, 3, 60);

    beforeEach(() => {
        catalog = new Catalog();
    });

    it('Add a business type to the catalog', () => {
        catalog.addBusinessType(typeLemons);

        expect(catalog.totalTypes).toBe(1);
    });

    it('Add two business types to the catalog', () => {
        catalog.addBusinessType(typeLemons);
        catalog.addBusinessType(typeNews);

        expect(catalog.totalTypes).toBe(2);
    });
});