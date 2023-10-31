import { categoryItem, categoryList } from "../core/selectors";


export const createCate = (text) => {
    const clone = categoryItem.content.cloneNode(true);
        const item = clone.querySelector("button");
        item.innerText = text;
        return item;
}

export const categoryRender = (CateArr) => {

    CateArr.forEach(el => categoryList.append(createCate(el)))

}