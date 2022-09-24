import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DoneIcon from "@mui/icons-material/Done";
import { Chip } from "@mui/material";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  useAddToCartMutation,
  useGetCartsQuery,
} from "../app/services/cartsApi";
import { useGetRequestsQuery } from "../app/services/requestApi";
import image from "../assets/blank-image.jpg";
import ConnectForm from "./ConnectForm";
import CustomModal from "./controls/CustomModal";
import LoadingBtn from "./controls/LoadingBtn";

const ProductCard = ({ product, shopByUser }) => {
  // States
  const [open, setOpen] = useState(false);

  // redux element
  const { userInfo } = useSelector((state) => state.auth);
  const [
    addToCart,
    { isLoading, data, isError, error, reset },
  ] = useAddToCartMutation();

  const { existCartItem } = useGetCartsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      existCartItem: data?.cart?.find((x) =>
        x?.items?.find((y) => y.product?._id === product?._id)
      ),
    }),
  });

  // Add to Cart
  const handleAddToCart = async () => {
    const productData = {
      items: [
        {
          product: product?._id,
          quantity: 1,
        },
      ],
    };
    await addToCart(productData);
  };

  useEffect(() => {
    if (data) {
      toast.success("Item is added!");
      reset();
    }

    if (isError) {
      toast.error(error?.data?.error);
      reset();
    }
  }, [isError, error, data, reset]);

  // check exist request
  const { request } = useGetRequestsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      request: data?.requests?.find(
        (x) =>
          x?.shop?._id === product?.shop?.id &&
          x?.user?._id === userInfo?.users?._id
      ),
    }),
  });

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

        {userInfo?.users?.role === "admin" || shopByUser ? (
          <>
            <span className="card__price">B: ${product?.prices?.basic}</span>
            <span className="card__price">S: ${product?.prices?.standard}</span>
            <span className="card__price">P: ${product?.prices?.premium}</span>
          </>
        ) : (
          request &&
          request?.approved && (
            <>
              {product?.shop?.susbcribers?.subscription === "basic" ? (
                <span className="card__price">${product?.prices?.basic}</span>
              ) : product?.shop?.susbcribers?.subscription === "standard" ? (
                <span className="card__price">
                  ${product?.prices?.standard}
                </span>
              ) : product?.shop?.susbcribers?.subscription === "premium" ? (
                <span className="card__price">${product?.prices?.premium}</span>
              ) : (
                <></>
              )}

              {product?.quantity < 1 ? (
                <span className="card__outStock">Out Of Stock</span>
              ) : (
                <>
                  <span className="card__stock">In Stock</span>
                  <span className="card__qty">Pcs: {product?.modifier}</span>
                </>
              )}
            </>
          )
        )}
      </div>

      <div className="card__footer">
        {request ? (
          request?.approved ? (
            <LoadingBtn
              variant="contained"
              color={!existCartItem && "primary"}
              defaultColor={existCartItem && "info"}
              onClick={handleAddToCart}
              size="small"
              text={existCartItem ? "Item is Added" : "Add to Cart"}
              startIcon={existCartItem ? <DoneIcon /> : <AddShoppingCartIcon />}
              loading={isLoading}
              disabled={
                userInfo?.users?.role === "admin" || product?.quantity < 1
              }
              style={
                existCartItem
                  ? { pointerEvents: "none", width: "100%" }
                  : { width: "100%" }
              }
            />
          ) : (
            <Chip
              label="Pending"
              color="warning"
              size="large"
              variant="outlined"
              icon={<DoneIcon />}
              disabled={userInfo?.users?.role === "admin" || shopByUser}
            />
          )
        ) : (
          <Chip
            label="Connect"
            color="info"
            size="large"
            variant="outlined"
            disabled={userInfo?.users?.role === "admin" || shopByUser}
            onClick={() => setOpen(true)}
          />
        )}

        <CustomModal open={open} onClose={setOpen}>
          <ConnectForm setOpen={setOpen} shopId={product?.shop?.id} />
        </CustomModal>
      </div>
    </div>
  );
};

export default ProductCard;
