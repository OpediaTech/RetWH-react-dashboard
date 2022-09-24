import React from "react";
import CustomSearchBox from "../components/controls/CustomSearchBox";
import WholeSalerCardSkeleton from "../components/skeletons/WholeSalerCardSkeleton";
import WholeSalerCard from "../components/WholeSalerCard";

const WholeSalers = ({ isLoading, shopsData }) => {
  return (
    <section className="wholesaler__section">
      <div className="container">
        <div className="wholesaler__header">
          <h3 className="wholesaler__title">Wholesalers</h3>
          <CustomSearchBox placeholder="Search.." />
        </div>

        <div className="wholesaler__grid">
          {isLoading
            ? Object.values("asdfjkll").map((value, index) => (
                <WholeSalerCardSkeleton key={index} />
              ))
            : shopsData?.shops?.map((shop) => (
                <WholeSalerCard
                  shop={shop}
                  url={`/wholesaler/${shop?._id}`}
                  key={shop?._id}
                />
              ))}
        </div>
      </div>
    </section>
  );
};

export default WholeSalers;
