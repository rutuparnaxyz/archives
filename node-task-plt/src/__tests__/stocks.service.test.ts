import stockService from "../services/stocks.service";

describe("stocks.service.ts", () => {
    const sku: string = 'CPF246874/77/33';
    const skuOne: string = 'LTE09123/30/90';
    const skuTwo: string = 'EQUA0123/20/80';
    const invalidSku: string = 'ROOT762340/73/78';
    let stockQuantity: number;
    let stockQuantityOne: number;
    let result: { sku: string, qty: number };
    let resultOne: { sku: string, qty: number };
    let resultTwo: { sku: string, qty: number };
    let errorResult: any;

    beforeAll(async () => {
        stockQuantity = (await stockService.getStockBySku(sku)).stock;
        stockQuantityOne = (await stockService.getStockBySku(skuOne)).stock;
        result = await stockService.getCurrentStockLevels(sku);
        resultOne = await stockService.getCurrentStockLevels(skuOne);
        resultTwo = await stockService.getCurrentStockLevels(skuTwo);
        errorResult = await stockService.getCurrentStockLevels(invalidSku);
    });

    it(`should return result for sku: ${sku}`, async () => {
        expect(result).toBeInstanceOf(Object);
        expect(result).toHaveProperty("sku");
        expect(result).toHaveProperty("qty");
        expect(result).toStrictEqual({ "sku": sku, "qty": 5289 });
    });

    it(`should throw error for sku: ${invalidSku}`, async () => {
        expect(errorResult).toEqual(`SKU does not exist : ${invalidSku}`);
    });

    it(`should decrease stock level when transaction type is order`, async () => {
        expect(result).toBeInstanceOf(Object);
        expect(result).toHaveProperty("sku");
        expect(result).toHaveProperty("qty");
        stockQuantity && expect(result.qty).toBeLessThan(stockQuantity);
    });

    it(`should increase stock level when transaction type is refund`, async () => {
        expect(resultOne).toBeInstanceOf(Object);
        expect(resultOne).toHaveProperty("sku");
        expect(resultOne).toHaveProperty("qty");
        stockQuantityOne && expect(resultOne.qty).toBeGreaterThan(stockQuantityOne);
    });

    it(`should return 0 quantity when stock is not available`, async () => {
        expect(resultTwo).toBeInstanceOf(Object);
        expect(resultTwo).toHaveProperty("sku");
        expect(resultTwo).toHaveProperty("qty");
        expect(resultTwo.qty).toBe(0);
    });
});