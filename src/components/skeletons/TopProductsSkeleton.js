import { Skeleton } from "@mui/material";
import React from "react";

const TopProductsSkeleton = () => {
  return (
    <div className="topProductSkeleton">
      <Skeleton variant="rounded" animation="wave" width={110} height={92} />
      <div className="skeleton">
        <Skeleton variant="rounded" animation="wave" width="100%" height={15} />
        <Skeleton variant="rounded" animation="wave" width="40%" height={10} />
        <Skeleton variant="rounded" animation="wave" width="80%" height={12} />
        <Skeleton variant="rounded" animation="wave" width={112} height={30} />
      </div>
    </div>
  );
};

export default TopProductsSkeleton;
