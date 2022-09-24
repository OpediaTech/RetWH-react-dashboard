import EditIcon from "@mui/icons-material/Edit";
import { Typography } from "@mui/material";
import React, { useState } from "react";
import image from "../assets/blank-image.jpg";
import ViewDialog from "../table/components/ViewDialog";
import CustomButton from "./controls/CustomButton";

const UserShopProductCard = ({ product, shopByUser }) => {
  // States
  const [open, setOpen] = useState(false);

  // redux element
  //   const { userInfo } = useSelector((state) => state.auth);

  // Add to Cart
  const handleEditProduct = async () => {
    setOpen(true);
  };

  return (
    <div className="product__card">
      <img src={product?.image ? product?.image : image} alt="Product Img" />

      <div className="card__details">
        <h3 className="card__title">{product?.productName}</h3>

        <span className="card__price">Basic: ${product?.prices?.basic}</span>
        <span className="card__price">
          Standard: ${product?.prices?.standard}
        </span>
        <br />
        <span className="card__price">
          Premium: ${product?.prices?.premium}
        </span>

        {product?.quantity < 1 ? (
          <span className="card__outStock">Out Of Stock</span>
        ) : (
          <span className="card__stock">In Stock : {product?.quantity}</span>
        )}
      </div>

      <div className="card__footer">
        <CustomButton
          variant="contained"
          defaultColor="info"
          onClick={handleEditProduct}
          size="small"
          text={"Update Product"}
          startIcon={<EditIcon />}
          style={{ width: "100%" }}
        />

        <ViewDialog title="Update product" open={open} setOpen={setOpen}>
          <Typography variant="h3">Under Construction!</Typography>
        </ViewDialog>
      </div>
    </div>
  );
};

export default UserShopProductCard;
