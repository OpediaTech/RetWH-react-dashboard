import React from "react";
import { Link } from "react-router-dom";
import image from "../assets/blank-image.jpg";

const WholeSalerCard = ({ shop, url }) => {
  return (
    <div className="wholesaler__card">
      <img src={image} alt="" />
      <Link to={url}>
        <h3 className="wholesalerCard__title">{shop?.companyName}</h3>
      </Link>
    </div>
  );
};

export default WholeSalerCard;
