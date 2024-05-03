export class ItemModel{
    constructor(id,desc,pic,category,salePrice,expectedProfit,status,buyPrice,size,qty,profitMargin) {
        this.itemCode = id;
        this.itemDesc = desc;
        this.item_pic = pic;
        this.category = category;
        this.unitPriceSale = salePrice;
        this.expectedProfit= expectedProfit;
        this.profitMargin = profitMargin;
        this.buyPrice = buyPrice;
        this.itemSize = size;
        this.qty = qty


    }
}