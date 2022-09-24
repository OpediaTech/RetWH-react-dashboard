import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import RemoveIcon from "@mui/icons-material/Remove";
import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  useDeleteCartMutation,
  useRemoveItemFromCartMutation,
  useUpdateCartMutation,
} from "../app/services/cartsApi";
import image from "../assets/blank-image.jpg";
import LoadingBtn from "./controls/LoadingBtn";

const CartItem = ({ cartItem, cartId, cartItemLength }) => {
  // States
  const [quantity, setQuantity] = useState(cartItem?.quantity);

  console.log(cartItem);

  // Redux element
  const [
    updateCart,
    { isLoading, isError, error, data, reset },
  ] = useUpdateCartMutation();
  const [
    removeItemFromCart,
    {
      isLoading: deleteLoading,
      isError: deleteIsError,
      error: deleteError,
      data: deleteData,
      reset: deleteReset,
    },
  ] = useRemoveItemFromCartMutation();

  const [deleteCart] = useDeleteCartMutation();

  // Product quantity setup
  const handleIncrease = () => {
    setQuantity((preValue) => preValue + 1);
  };
  const handleDecrease = () => {
    setQuantity((preValue) => preValue - 1);
  };

  // Update cart
  const handleUpdateCart = async () => {
    const productData = {
      items: [
        {
          _id: cartItem?._id,
          product: cartItem?.product?._id,
          quantity,
        },
      ],
    };

    await updateCart(productData);
  };

  // Item remove from cart
  const handleRemoveFromCart = async (prodId) => {
    if (cartItemLength < 2) {
      await removeItemFromCart({ prodId, cartId });
      await deleteCart(cartId);
    } else {
      await removeItemFromCart({ prodId, cartId });
    }
  };

  useEffect(() => {
    if (data) {
      toast.success("Item is updated!");
      reset();
    }

    if (deleteData) {
      toast.success("Item is removed!");
      deleteReset();
    }
    if (isError) {
      toast.error(error?.data?.error);
      reset();
    }
    if (deleteIsError) {
      toast.error(deleteError?.data?.error);
      deleteReset();
    }
  }, [
    isError,
    error,
    data,
    reset,
    deleteIsError,
    deleteReset,
    deleteData,
    deleteError,
    cartItemLength,
  ]);

  return (
    <div className="cartItem">
      <div className="cartItem__image">
        <img
          src={cartItem?.product?.image ? cartItem?.product?.image : image}
          alt={cartItem?.name}
        />
      </div>
      <div className="cartItem__content">
        <div className="cartItem__data">
          <div className="cartItem__details">
            <h3 className="cartItem__title">
              {cartItem?.product?.productName}
            </h3>

            <span className="cartItem__price">${cartItem?.price}</span>
            <span className="cartItem__stock">
              {cartItem?.quantity < 1 ? (
                <span className="cartItem__countOutStock">Out Of Stock</span>
              ) : (
                <>In Stock</>
              )}
            </span>
          </div>

          <span className="cartItem__totalPrice">
            ${cartItem?.total?.toFixed(2)}
          </span>
        </div>

        <div className="cartItem__action">
          <div className="cartItem__count">
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
              disabled={quantity === cartItem?.product?.quantity}
              size="small"
            >
              <AddIcon />
            </IconButton>
          </div>

          <div className="cartItem__btn">
            {/* Update button */}
            <LoadingBtn
              variant="contained"
              defaultColor="info"
              onClick={handleUpdateCart}
              size="small"
              text="Update Cart"
              startIcon={<ModeEditIcon />}
              loading={isLoading}
            />

            {/* Delete button */}
            <LoadingBtn
              variant="contained"
              defaultColor="error"
              onClick={() => handleRemoveFromCart(cartItem?.product?._id)}
              size="small"
              text="Remove"
              startIcon={<DeleteIcon />}
              loading={deleteLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
