import { Skeleton } from "@mui/material";
import React from "react";

const ActivityCard = ({ activity, loading }) => {
  return (
    <div
      className="activity__card"
      style={{ background: `${activity?.color}` }}
    >
      <div className="card__container">
        <div className="card__details">
          <h3 className="card__title">{activity?.title}</h3>
          {/* <span className="card__time">{activity?.time}</span> */}

          {loading ? (
            <Skeleton
              variant="rounded"
              animation="wave"
              width="100%"
              height={30}
            />
          ) : (
            <span className="card__total">{activity?.total}</span>
          )}
        </div>
        <div className="card__icon">{activity?.icon}</div>
      </div>
    </div>
  );
};

export default ActivityCard;
