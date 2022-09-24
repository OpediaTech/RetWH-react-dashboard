import AddIcon from "@mui/icons-material/Add";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DoneIcon from "@mui/icons-material/Done";
import RemoveIcon from "@mui/icons-material/Remove";
import { Chip, IconButton } from "@mui/material";
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

const ProductListItem = ({ product, shopByUser }) => {
  // States
  const [quantity, setQuantity] = useState(1);
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

  const handleIncrease = () => {
    setQuantity((preValue) => preValue + 1);
  };
  const handleDecrease = () => {
    setQuantity((preValue) => preValue - 1);
  };

  // Add to Cart
  const handleAddToCart = async () => {
    const productData = {
      items: [
        {
          product: product?._id,
          quantity,
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
    <div className="productListItem">
      <div className="productListItem__image">
        <img src={product?.image ? product?.image : image} alt="Product Img" />
      </div>
      <div className="productListItem__content">
        <div className="productListItem__data">
          <div className="productListItem__details">
            <h3 className="productListItem__title">{product?.productName}</h3>

            <div>
              <span className="card__author">
                By{" "}
                <NavLink
                  to={`/wholesaler/${product?.shop?.id}`}
                  className="author"
                >
                  {product?.shop?.name}
                </NavLink>
              </span>

              {userInfo?.users?.role === "admin" || shopByUser ? (
                <>
                  {" "}
                  <span className="productListItem__price">
                    Basic: ${product?.prices?.basic}
                  </span>
                  <span className="productListItem__price">
                    Standard: ${product?.prices?.standard}
                  </span>
                  <span className="productListItem__price">
                    Premium: ${product?.prices?.premium}
                  </span>
                </>
              ) : (
                request &&
                request?.approved && (
                  <>
                    {product?.shop?.susbcribers?.subscription === "basic" ? (
                      <span className="productListItem__price">
                        ${product?.prices?.basic}
                      </span>
                    ) : product?.shop?.susbcribers?.subscription ===
                      "standard" ? (
                      <span className="productListItem__price">
                        ${product?.prices?.standard}
                      </span>
                    ) : product?.shop?.susbcribers?.subscription ===
                      "premium" ? (
                      <span className="productListItem__price">
                        ${product?.prices?.premium}
                      </span>
                    ) : (
                      <></>
                    )}

                    {product?.quantity < 1 ? (
                      <span className="productListItem__outStock">
                        Out Of Stock
                      </span>
                    ) : (
                      <>
                        <span className="productListItem__stock">In Stock</span>
                        <span className="productListItem__qty">
                          Pcs: {product?.modifier}
                        </span>
                      </>
                    )}
                  </>
                )
              )}
            </div>
          </div>
        </div>

        <div className="productListItem__action">
          {request ? (
            request?.approved ? (
              <div className="action__content">
                <div className="productListItem__count">
                  <IconButton
                    onClick={handleDecrease}
                    disabled={quantity < 2}
                    size="small"
                  >
                    <RemoveIcon />
                  </IconButton>
                  <input type="text" disabled value={quantity} />
                  <IconButton
                    onClick={handleIncrease}
                    disabled={quantity === product?.quantity}
                    size="small"
                  >
                    <AddIcon />
                  </IconButton>
                </div>

                {/* Add to Cart button and Update Button */}
                <LoadingBtn
                  variant="contained"
                  color={!existCartItem && "primary"}
                  defaultColor={existCartItem && "info"}
                  onClick={handleAddToCart}
                  size="small"
                  text={existCartItem ? "Item is Added" : "Add to Cart"}
                  startIcon={
                    existCartItem ? <DoneIcon /> : <AddShoppingCartIcon />
                  }
                  loading={isLoading}
                  disabled={
                    userInfo?.users?.role === "admin" || product?.quantity < 1
                  }
                  style={existCartItem && { pointerEvents: "none" }}
                />
              </div>
            ) : (
              <Chip
                label="Pending"
                color="warning"
                size="large"
                variant="outlined"
                icon={<DoneIcon />}
              />
            )
          ) : (
            <Chip
              label="Connect"
              color="info"
              size="large"
              variant="outlined"
              onClick={() => setOpen(true)}
            />
          )}

          <CustomModal open={open} onClose={setOpen}>
            <ConnectForm setOpen={setOpen} shopId={product?.shop?.id} />
          </CustomModal>
        </div>
      </div>
    </div>
  );
};

export default ProductListItem;
