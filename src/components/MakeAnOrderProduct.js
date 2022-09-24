import AddIcon from "@mui/icons-material/Add";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveIcon from "@mui/icons-material/Remove";
import { IconButton } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../app/features/cartSlice";
import image from "../assets/blank-image.jpg";
import CustomButton from "./controls/CustomButton";
import LoadingBtn from "./controls/LoadingBtn";

const MakeAnOrderProduct = ({ product, request }) => {
  // States
  const [quantity, setQuantity] = useState(1);

  // redux element
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const handleIncrease = () => {
    setQuantity((preValue) => preValue + 1);
  };
  const handleDecrease = () => {
    setQuantity((preValue) => preValue - 1);
  };

  // Add to Cart
  const handleAddToCart = async () => {
    const productData = {
      product: product?._id,
      productName: product?.productName,
      uniqueCode: product?.uniqueCode,
      price: product?.prices?.basic,
      quantity,
      total: product?.prices?.basic * quantity,
    };
    await dispatch(addToCart(productData));
  };

  return (
    <div className="product__card">
      <img src={product?.image ? product?.image : image} alt="Product Img" />

      <div className="card__details">
        <h3 className="card__title">{product?.productName}</h3>

        <span className="card__author">
          By{" "}
          <Link to={`/wholesaler/${product?.shop?.id}`} className="author">
            {product?.shop?.name}
          </Link>
        </span>

        {request?.approved &&
          (request?.subscription === "basic" ? (
            <span className="card__price">${product?.prices?.basic}</span>
          ) : request?.subscription === "standard" ? (
            <span className="card__price">${product?.prices?.standard}</span>
          ) : request?.subscription === "premium" ? (
            <span className="card__price">${product?.prices?.premium}</span>
          ) : (
            <></>
          ))}

        {request?.approved && product?.quantity < 1 ? (
          <span className="card__outStock">Out Of Stock</span>
        ) : (
          <>
            <span className="card__stock">In Stock</span>
            <span className="card__qty">Pcs: {product?.modifier}</span>
          </>
        )}
      </div>

      <div className="card__footer">
        {request?.approved ? (
          <div className="footer__content">
            <div className="card__counter">
              <IconButton
                onClick={handleDecrease}
                disabled={quantity < 2}
                size="small"
              >
                <RemoveIcon />
              </IconButton>
              <input
                className="counter__value"
                type="text"
                disabled
                value={quantity}
              />
              <IconButton
                onClick={handleIncrease}
                disabled={quantity === product?.quantity}
                size="small"
              >
                <AddIcon />
              </IconButton>
            </div>

            <LoadingBtn
              variant="contained"
              color="primary"
              onClick={handleAddToCart}
              size="small"
              text="Add to Cart"
              startIcon={<AddShoppingCartIcon />}
              disabled={
                userInfo?.users?.role === "admin" || product?.quantity < 1
              }
            />
          </div>
        ) : (
          <CustomButton
            variant="contained"
            defaultColor="error"
            onClick={handleAddToCart}
            size="small"
            text="Unknown retailer"
            style={{ width: "100%", pointerEvents: "none" }}
          />
        )}
      </div>
    </div>
  );
};

export default MakeAnOrderProduct;
