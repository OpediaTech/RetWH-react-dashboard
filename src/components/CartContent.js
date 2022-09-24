import React from "react";
import CartItem from "./CartItem";
import CartSubtotal from "./CartSubtotal";
import ShippingForm from "./ShippingForm";

const CartContent = ({ cartData }) => {
  return (
    <>
      {cartData?.items?.length > 0 && (
        <div className="cartContent">
          <h2 className="cartContent__title">
            Shop: <span className="title">{cartData?.shop?.name}</span>
          </h2>
          <div className="cartContent__grid">
            <div className="cart__item">
              {cartData?.items?.map((cartItem) => (
                <CartItem
                  cartItem={cartItem}
                  key={cartItem?._id}
                  cartId={cartData?._id}
                  cartItemLength={cartData?.items?.length}
                />
              ))}
            </div>
            <div className="cart__checkout">
              <ShippingForm />

              <div className="cart__subtotal">
                <CartSubtotal
                  cartItems={cartData?.items}
                  cartId={cartData?._id}
                  cartNetTotal={cartData?.net_total}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartContent;
