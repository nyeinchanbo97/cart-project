import { categoryRender } from "./app/categories";
import { productListHandler, productRender } from "./app/products";
import { categories, products } from "./core/data";
import { cartBtnHandler } from "./core/handlers";
import { cartBtn, cartCloseBtn, productList } from "./core/selectors";

const Shop = class {


    initialRender(){
        categoryRender(categories);
        productRender(products);
    }



    listeners(){
        cartBtn.addEventListener("click",cartBtnHandler);
        cartCloseBtn.addEventListener("click",cartBtnHandler);
        productList.addEventListener("click",productListHandler)
    }





    init(){
        console.log("shop app start");
        this.initialRender();
        this.listeners();
    }
}

export default Shop;