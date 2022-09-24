import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DoneIcon from "@mui/icons-material/Done";
import { Chip } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  useAddToCartMutation,
  useGetCartsQuery,
} from "../app/services/cartsApi";
import { useGetRequestsQuery } from "../app/services/requestApi";
import image from "../assets/blank-image.jpg";
import ConnectForm from "./ConnectForm";
import CustomModal from "./controls/CustomModal";
import LoadingBtn from "./controls/LoadingBtn";

const TopProductList = ({ product }) => {
  const [open, setOpen] = useState(false);

  // redux element
  const { userInfo } = useSelector((state) => state.auth);
  const [
    addToCart,
    { isLoading, isError, error, data, reset },
  ] = useAddToCartMutation();
  const { existCartItem } = useGetCartsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      existCartItem: data?.cart?.find((x) =>
        x?.items?.find((y) => y.product?._id === product?._id)
      ),
    }),
  });

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
    }
  }, [isError, error, data, reset]);

  // chech exist request
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
    <div className="topProductsList">
      <div className="topProductsList__image">
        <img src={product?.image ? product?.image : image} alt="Product Img" />
      </div>
      <div className="topProductsList__content">
        <div className="topProductsList__details">
          <h3 className="topProductsList__title">{product?.productName}</h3>

          {!(
            userInfo?.users?.role === "admin" ||
            userInfo?.users?.role === "wholeseller"
          ) && (
            <span className="topProductsList__author">
              By{" "}
              <NavLink
                to={`/wholesaler/${product?.shop?.id}`}
                className="author"
              >
                {product?.shop?.name}
              </NavLink>
            </span>
          )}

          {userInfo?.users?.role === "admin" ? (
            <>
              <span className="topProductsList__price">
                B: ${product?.prices?.basic}
              </span>
              <span className="topProductsList__price">
                S: ${product?.prices?.standard}
              </span>
              <span className="topProductsList__price">
                P: ${product?.prices?.premium}
              </span>
            </>
          ) : (
            request &&
            request?.approved && (
              <>
                {product?.shop?.susbcribers?.subscription === "basic" ? (
                  <span className="topProductsList__price">
                    ${product?.prices?.basic}
                  </span>
                ) : product?.shop?.susbcribers?.subscription === "standard" ? (
                  <span className="topProductsList__price">
                    ${product?.prices?.standard}
                  </span>
                ) : product?.shop?.susbcribers?.subscription === "premium" ? (
                  <span className="topProductsList__price">
                    ${product?.prices?.premium}
                  </span>
                ) : (
                  <></>
                )}

                {product?.quantity < 1 ? (
                  <span className="topProductsList__outStock">
                    Out Of Stock
                  </span>
                ) : (
                  <span className="topProductsList__stock">In Stock</span>
                )}
              </>
            )
          )}
        </div>

        <div className="topProductsList__buttons">
          {request ? (
            request?.approved ? (
              <LoadingBtn
                variant="contained"
                color="primary"
                onClick={handleAddToCart}
                size="small"
                text={existCartItem ? "item is Added" : "Add to Cart"}
                startIcon={
                  existCartItem ? <DoneIcon /> : <AddShoppingCartIcon />
                }
                loading={isLoading}
                disabled={
                  (existCartItem && true) ||
                  userInfo?.users?.role === "admin" ||
                  userInfo?.users?.role === "wholeseller" ||
                  product?.quantity < 1
                }
              />
            ) : (
              <Chip
                label="Pending"
                color="warning"
                size="large"
                variant="outlined"
                icon={<DoneIcon />}
                disabled={
                  userInfo?.users?.role === "admin" ||
                  userInfo?.users?.role === "wholeseller"
                }
              />
            )
          ) : (
            <Chip
              label="Connect"
              color="info"
              size="large"
              variant="outlined"
              onClick={() => setOpen(true)}
              disabled={
                userInfo?.users?.role === "admin" ||
                userInfo?.users?.role === "wholeseller"
              }
            />
          )}
        </div>

        <CustomModal open={open} onClose={setOpen}>
          <ConnectForm setOpen={setOpen} shopId={product?.shop?.id} />
        </CustomModal>
      </div>
    </div>
  );
};

export default TopProductList;
