import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import RemoveIcon from "@mui/icons-material/Remove";
import { IconButton } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart, removeItem } from "../app/features/cartSlice";
import image from "../assets/blank-image.jpg";
import LoadingBtn from "./controls/LoadingBtn";

const MakeOrderCartItem = ({ cartItem }) => {
  // States
  const [quantity, setQuantity] = useState(cartItem?.quantity);

  // redux element
  const dispatch = useDispatch();

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
      product: cartItem?.product,
      productName: cartItem?.productName,
      uniqueCode: cartItem?.uniqueCode,
      price: cartItem?.price,
      quantity,
      total: cartItem?.price * quantity,
    };
    await dispatch(addToCart(productData));
  };

  // Remove from cart
  const handleRemoveFromCart = async (prodId) => {
    await dispatch(removeItem(prodId));
  };

  return (
    <div className="cartItem">
      <div className="cartItem__image">
        <img
          src={cartItem?.image ? cartItem?.image : image}
          alt={cartItem?.name}
        />
      </div>
      <div className="cartItem__content">
        <div className="cartItem__data">
          <div className="cartItem__details">
            <h3 className="cartItem__title">{cartItem?.productName}</h3>

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
            />

            {/* Delete button */}
            <LoadingBtn
              variant="contained"
              defaultColor="error"
              onClick={() => handleRemoveFromCart(cartItem?.product)}
              size="small"
              text="Remove"
              startIcon={<DeleteIcon />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakeOrderCartItem;
