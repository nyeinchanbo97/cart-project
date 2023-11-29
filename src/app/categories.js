import { products } from "../core/data";
import { categoryItem, categoryList } from "../core/selectors";
import { productRender } from "./products";


export const createCate = (text) => {
    const clone = categoryItem.content.cloneNode(true);
        const item = clone.querySelector("button");
        item.innerText = text;
        return item;
}

export const categoryRender = (CateArr) => {

    CateArr.forEach(el => categoryList.append(createCate(el)))

}

export const categoryListHandler = (event) => {
    if(event.target.classList.contains("category-btn")){
        categoryList.querySelector(".active").classList.remove("active");
        event.target.classList.add("active");
        const currentCategory = event.target.innerText;
        if(currentCategory === "All"){
            productRender(products);
        }else{
            const currentProduct = products.filter(product => product.category === currentCategory);
            productRender(currentProduct);
        }
        
    }
}