import { Skeleton } from "@mui/material";
import React from "react";

const ProfileSkeleton = () => {
  return (
    <div className="profileSkeleton">
      <div className="profileSkeleton__profile">
        <Skeleton
          variant="rectangular"
          animation="wave"
          width={170}
          height={108}
        />
        <div className="profileSkeleton__details">
          <Skeleton
            variant="rounded"
            animation="wave"
            width="100%"
            height={24}
          />
          <Skeleton
            variant="rounded"
            animation="wave"
            width={130}
            height={18}
          />
          <Skeleton
            variant="rounded"
            animation="wave"
            width={150}
            height={25}
          />
        </div>
      </div>
      <div className="skeleton">
        <Skeleton variant="rounded" animation="wave" width="100%" height={32} />
        <Skeleton variant="rounded" animation="wave" width="100%" height={32} />
        <Skeleton variant="rounded" animation="wave" width="100%" height={32} />
        <Skeleton variant="rounded" animation="wave" width="100%" height={32} />
      </div>
    </div>
  );
};

export default ProfileSkeleton;
