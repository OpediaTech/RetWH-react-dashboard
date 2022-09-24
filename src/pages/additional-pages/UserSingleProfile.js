import { Avatar, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useGetShopsByEmailQuery } from "../../app/services/shopsApi";
import CustomSearchBox from "../../components/controls/CustomSearchBox";
import Header from "../../components/Header";
import WholeSalerCardSkeleton from "../../components/skeletons/WholeSalerCardSkeleton";
import WholeSalerCard from "../../components/WholeSalerCard";

const UserSingleProfile = () => {
  // Redux element
  const { userInfo } = useSelector((state) => state.auth);
  const { isLoading, data: shopsData } = useGetShopsByEmailQuery(
    userInfo?.users?.email
  );

  return (
    <>
      <Header />
      <section className="profile__section">
        <div className="container">
          <div className="profile__container">
            <div className="profile__details">
              <div className="profile__avater">
                <Avatar
                  // alt={userInfo?.name}
                  // src={userInfo?.avatar}
                  sx={{ width: 100, height: 100 }}
                />
                <div className="avater__data">
                  <h3 className="avater__title">User Name</h3>
                  <span className="avater__role">{userInfo?.users?.role}</span>
                </div>
              </div>

              <ul className="profile__list">
                <li className="profile__item">
                  <span className="item__property">Username</span>
                  <span className="item__value">@{userInfo?.users?.role}</span>
                </li>
                <li className="profile__item">
                  <span className="item__property">Email</span>
                  <span className="item__value">{userInfo?.users?.email}</span>
                </li>
                <li className="profile__item">
                  <span className="item__property">Phone</span>
                  <span className="item__value">+66 515478321</span>
                </li>
                <li className="profile__item">
                  <span className="item__property">Country</span>
                  <span className="item__value">Bangladesh</span>
                </li>
              </ul>
            </div>

            {userInfo?.users?.role === "admin" ? (
              <div className="profile__orders">
                <h3 className="profile__orders">For admin contents</h3>
                <Typography variant="h3">Under Construction!</Typography>
              </div>
            ) : (
              <div className="profile__shops">
                <div className="shops__header">
                  <h3 className="shops__title">Your shops</h3>
                  <CustomSearchBox placeholder="Search your shops" />
                </div>

                <div className="shops__grid">
                  {isLoading
                    ? Object.values("asdfjk").map((value, index) => (
                        <WholeSalerCardSkeleton key={index} />
                      ))
                    : shopsData?.shops?.map((shop) => (
                        <WholeSalerCard
                          shop={shop}
                          url={`/shop/${shop?._id}`}
                          key={shop?._id}
                        />
                      ))}
                </div>
              </div>
            )}

            {/* < */}
          </div>
        </div>
      </section>
    </>
  );
};

export default UserSingleProfile;
