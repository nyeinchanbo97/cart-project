import { productRender } from "../app/products";
import { products } from "./data";
import { cartBox, emptyStage, productList, productListContainer, searchBar, searchBarInput, searchBtn } from "./selectors"

export const cartBtnHandler = () => {
    cartBox.classList.toggle("translate-x-full");
    !cartBox.classList.contains("duration-300") && cartBox.classList.add("duration-300");
}


export const searchBtnHandler = () => {
    searchBarInput.focus();
    searchBtn.classList.toggle("bg-neutral-600");
    searchBtn.classList.toggle("text-white");
    searchBar.classList.toggle("-translate-y-full");
    searchBar.classList.toggle("opacity-0");
    searchBar.classList.add("duration-300")
}


export const searchBarInputHandler = (event) => {
    const keyword = searchBarInput.value.toLocaleLowerCase();
    productRender(products.filter(product =>  product.title.toLocaleLowerCase().search(keyword) !== -1 || 
        product.description.toLocaleLowerCase().search(keyword) !== -1)
    )
    if(productList.innerText == ""){
        const emptyStageUi = emptyStage.content.cloneNode(true);
        productList.append(emptyStageUi);
    }
}

export const clearSearchBarInputHandler = () => {
    searchBarInput.value = null;
    productRender(products);
}