import { Skeleton } from "@mui/material";
import React from "react";

const WholeSalerCardSkeleton = () => {
  return (
    <div className="wholeSalerCardSkeleton">
      <Skeleton variant="rounded" animation="wave" width="100%" height={80} />
      <Skeleton variant="rounded" animation="wave" width="70%" height={15} />
    </div>
  );
};

export default WholeSalerCardSkeleton;
