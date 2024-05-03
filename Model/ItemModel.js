export class ItemModel{
    constructor(id,desc,pic,category,salePrice,expectedProfit,status,buyPrice,supId,size,qty,profitMargin) {
        this.itemCode = id;
        this.itemDesc = desc;
        this.itemPic = pic;
        this.Category = category;
        this.unitPriceSale = salePrice;
        this.expectedProfit= expectedProfit;
        this.profitMargin = profitMargin;
        this.status = status;
        this.buyPrice = buyPrice;
        this.supplierCode = supId;
        this.itemSize = size;
        this.qty = qty
    }
}