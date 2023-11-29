import { cartBodyHandler, cartObserver } from "./app/cart";
import { categoryListHandler, categoryRender } from "./app/categories";
import { productListHandler, productRender } from "./app/products";
import { categories, products } from "./core/data";
import { cartBtnHandler, clearSearchBarInputHandler, searchBarInputHandler, searchBtnHandler } from "./core/handlers";
import { cartBody, cartBtn, cartCloseBtn, categoryList, clearSearchBarInput, productList, searchBarInput, searchBtn } from "./core/selectors";

const Shop = class {

    observer(){
        cartObserver();
    }

    initialRender(){
        categoryRender(categories);
        productRender(products);
    }



    listeners(){
        cartBtn.addEventListener("click",cartBtnHandler);
        searchBtn.addEventListener("click",searchBtnHandler);
        searchBarInput.addEventListener("keyup",searchBarInputHandler);
        clearSearchBarInput.addEventListener("click",clearSearchBarInputHandler);
        cartCloseBtn.addEventListener("click",cartBtnHandler);
        productList.addEventListener("click",productListHandler);
        cartBody.addEventListener("click",cartBodyHandler);
        categoryList.addEventListener("click",categoryListHandler);
    }





    init(){
        console.log("shop app start");
        this.observer();
        this.initialRender();
        this.listeners();
    }
}

export default Shop;