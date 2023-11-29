import Swal from "sweetalert2";
import { products } from "../core/data";
import { cartBody, cartCostTotal, cartCountInside, cartCountOutside, cartItem } from "../core/selectors"

export const createCart = ({id,image,title,price}) => {
    const cartItemUi = cartItem.content.cloneNode(true);

    const cartItemImg = cartItemUi.querySelector(".cart-item-img");
    const cartItemTitle= cartItemUi.querySelector(".cart-item-title");
    const cartItemPrice = cartItemUi.querySelector(".cart-item-price");
    const cartItemCost= cartItemUi.querySelector(".cart-item-cost");

    cartItemUi.querySelector(".cart-item").setAttribute("cart-product-id",id)

    cartItemImg.src = image;
    cartItemTitle.innerText = title;
    cartItemPrice.innerText = price;
    cartItemCost.innerText = price;
    
    return cartItemUi;
}

export const addToCart = (productId) => {
    const currentProduct = products.find(el => el.id == productId);
    cartBody.append(createCart(currentProduct))
};

export const removeFromCart = (id) => {
    const currentCartItem = cartBody.querySelector(`[cart-product-id = '${id}']`)
    const currentCartItemId = currentCartItem.getAttribute("cart-product-id");
    // console.log(currentCartItem,currentCartItemId);
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Confirm"
      }).then((result) => {
        if (result.isConfirmed) {
            currentCartItem.classList.add("animate__animated","animate__hinge")
            currentCartItem.addEventListener("animationend",() => {
                currentCartItem.remove();
                const currentProductCard = app.querySelector(`[product-id="${currentCartItemId}"]`)
                const currentAddToCartBtn = currentProductCard.querySelector(".add-to-cart");

                currentAddToCartBtn.classList.remove("bg-neutral-600","text-white");
                currentAddToCartBtn.innerText = "Add to Cart";
                currentAddToCartBtn.disabled = false;
            })
        

        Swal.fire({              
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
      });
}

export const quantityIncrement = (id) => {
    const currentCartItem = cartBody.querySelector(`[cart-product-id = '${id}']`)
    const quantity = currentCartItem.querySelector(".cart-item-quantity");
    const cost = currentCartItem.querySelector(".cart-item-cost");
    const price = currentCartItem.querySelector(".cart-item-price");
    quantity.innerText = parseInt(quantity.innerText) + 1;
    cost.innerText = price.innerText * quantity.innerText;
}

export const quantityDecrement = (id) => {
    const currentCartItem = cartBody.querySelector(`[cart-product-id = '${id}']`)
    const quantity = currentCartItem.querySelector(".cart-item-quantity");
    const cost = currentCartItem.querySelector(".cart-item-cost");
    const price = currentCartItem.querySelector(".cart-item-price");
    if(quantity.innerText > 1){
        quantity.innerText = parseInt(quantity.innerText) - 1;
        cost.innerText = price.innerText * quantity.innerText;
    }
}

export const calculateCartItemCostTotal = () => {
    return [...cartBody.querySelectorAll(".cart-item-cost")].reduce((pv,cv) => pv + parseFloat(cv.innerText),0);
}

export const countItemsInCart = () => {
    return cartBody.querySelectorAll(".cart-item").length;
}




export const cartBodyHandler = (event) => {
    if(event.target.classList.contains("cart-item-del")){
        const currentCartItem = event.target.closest(".cart-item");
        const currentCartItemId = currentCartItem.getAttribute("cart-product-id");
        removeFromCart(currentCartItemId);
    }else if(event.target.classList.contains("cart-item-increment")){

        const currentCartItem = event.target.closest(".cart-item");
        const currentCartItemId = currentCartItem.getAttribute("cart-product-id");
        quantityIncrement(currentCartItemId);


    }else if(event.target.classList.contains("cart-item-decrement")){

        const currentCartItem = event.target.closest(".cart-item");
        const currentCartItemId = currentCartItem.getAttribute("cart-product-id");
        quantityDecrement(currentCartItemId);
    }
}


export const cartObserver = () => {
    
    const process = () => {
        console.log("u change in cart body");
        cartCostTotal.innerText = calculateCartItemCostTotal().toFixed(2);
        cartCountOutside.innerText = countItemsInCart();
        cartCountInside.innerText = countItemsInCart();
    }

    const options = {
        childList : true,
        subtree : true,
    }

    const observer = new MutationObserver(process);

    observer.observe(cartBody,options)
}