export class ItemModel{
    constructor(id,desc,pic,category,salePrice,expectedProfit,status,buyPrice,supId,size,qty,profitMargin) {
        this.item_code = id;
        this.item_desc = desc;
        this.item_pic = pic;
        this.category = category;
        this.salePrice = salePrice;
        this.expectedProfit= expectedProfit;
        this.profitMargin = profitMargin;
        this.status = status;
        this.buyPrice = buyPrice;
        this.supplierCode = supId;
        this.itemSize = size;
        this.qty = qty
    }
}