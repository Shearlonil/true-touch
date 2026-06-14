import { format } from "date-fns";
import numeral from "numeral";

const _itemProps = new WeakMap();

export class Product {
    constructor(jsonObject) {
        if (jsonObject) {
            const { Tract, ProductBrands, ProductCategories, ProductBarcode, ProductExpDate,  } = jsonObject;
            _itemProps.set(this, {
                id: jsonObject.product_id,
                productName: jsonObject.name,
                salesPrice: jsonObject.sales_price,
                restockLevel: jsonObject.restockLevel, //   setting low qty for either unit sales or store
                createdAt: jsonObject.createdAt,
                status: jsonObject.status,
                barcode: ProductBarcode?.code,
                expDate: ProductExpDate?.date,
                tract: Tract,
                brand: ProductBrands[0],
                category: ProductCategories[0],
                //  also for table display
                tractName: Tract?.name, 
                brandName: ProductBrands[0]?.name,
                categoryName: ProductCategories[0]?.name,
            });
        }else {
            _itemProps.set(this, {});
        }
    }

    get id() { return _itemProps.get(this).id; }
    set id(id) { _itemProps.get(this).id = id }
    
    get productName() { return _itemProps.get(this).productName }
    set productName(name) { _itemProps.get(this).productName = name }

    get salesPrice() { return _itemProps.get(this).salesPrice; }
    set salesPrice(salesPrice) { _itemProps.get(this).salesPrice = salesPrice }

    get restockLevel() { return _itemProps.get(this).restockLevel }
    set restockLevel(restockLevel) { _itemProps.get(this).restockLevel = restockLevel }

    get createdAt() { return _itemProps.get(this).createdAt ? format(_itemProps.get(this).createdAt, 'dd/MM/yyyy HH:mm:ss') : ''; }
    set createdAt(createdAt) { _itemProps.get(this).createdAt = createdAt }
    
    get status() { return _itemProps.get(this).status }
    set status(status) { _itemProps.get(this).status = status }
    
    get barcode() { return _itemProps.get(this).barcode }
    set barcode(code) { _itemProps.get(this).barcode = code }
    
    get expDate() { return _itemProps.get(this).expDate }
    set expDate(expDate) { _itemProps.get(this).expDate = expDate }
    
    get tractName() { return _itemProps.get(this).tractName }
    set tractName(tractName) { _itemProps.get(this).tractName = tractName }
    
    get brandName() { return _itemProps.get(this).brandName }
    set brandName(brandName) { _itemProps.get(this).brandName = brandName }
    
    get categoryName() { return _itemProps.get(this).categoryName }
    set categoryName(categoryName) { _itemProps.get(this).categoryName = categoryName }
    
    get tract() { return _itemProps.get(this).tract }
    set tract(tract) { _itemProps.get(this).tract = tract }
    
    get brand() { return _itemProps.get(this).brand }
    set brand(brand) { _itemProps.get(this).brand = brand }
    
    get category() { return _itemProps.get(this).category }
    set category(category) { _itemProps.get(this).category = category }

    toJSON(){
        return {
            id: this.id,
            productName: this.productName,
            salesPrice: this.salesPrice,
            restockLevel: this.restockLevel,
            createdAt: this.createdAt,
            status: this.status,
            barcode: this.barcode,
            expDate: this.expDate,
            tractName: this.tractName,
            brandName: this.brandName,
            categoryName: this.categoryName,
            tract: this.tract,
            brand: this.brand,
            category: this.category,
        }
    }
}