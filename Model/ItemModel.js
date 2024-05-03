export class ItemModel {
    constructor(itemCode, itemDesc, itemPic, Category, unitPriceSale, expectedProfit, profitMargin, status, buyPrice, supplierEntityList, stockEntityList) {
        this.itemCode = itemCode;
        this.itemDesc = itemDesc;
        this.itemPic = itemPic;
        this.category = Category;
        this.unitPriceSale = unitPriceSale;
        this.expectedProfit = expectedProfit;
        this.profitMargin = profitMargin;
        this.status = status;
        this.buyPrice = buyPrice;
        this.supplierEntityList =  supplierEntityList;
        this.stockEntityList = stockEntityList;
    }
}
