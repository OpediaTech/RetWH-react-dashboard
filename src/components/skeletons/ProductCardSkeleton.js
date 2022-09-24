import { Skeleton } from "@mui/material";
import React from "react";

const ProductCardSkeleton = () => {
  return (
    <div className="productCardSkeleton">
      <Skeleton
        variant="rectangular"
        animation="wave"
        width="100%"
        height={120}
      />
      <div className="skeleton">
        <Skeleton variant="rounded" animation="wave" width="100%" height={15} />
        <Skeleton variant="rounded" animation="wave" width={100} height={12} />
        <Skeleton variant="rounded" animation="wave" width={150} height={12} />
        <Skeleton variant="rounded" animation="wave" width="100%" height={32} />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
