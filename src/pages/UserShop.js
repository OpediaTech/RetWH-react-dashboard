import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetProductsQuery } from "../app/services/productsApi";
import { useGetRequestsQuery } from "../app/services/requestApi";
import { useGetShopsQuery } from "../app/services/shopsApi";
import image from "../assets/blank-image.jpg";
import CustomSearchBox from "../components/controls/CustomSearchBox";
import Header from "../components/Header";
import ProductCardSkeleton from "../components/skeletons/ProductCardSkeleton";
import ProfileSkeleton from "../components/skeletons/ProfileSkeleton";
import UserShopProductCard from "../components/UserShopProductCard";

const UserShop = () => {
  // get id
  const { id } = useParams();

  // Redux element
  const { isLoading } = useGetShopsQuery();
  const { isLoading: productLoading } = useGetProductsQuery();
  const { isLoading: requestLoading } = useGetRequestsQuery();

  const { userInfo } = useSelector((state) => state.auth);
  const { shop } = useGetShopsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      shop: data?.shops?.find(
        (x) => x._id === id && x?.user === userInfo?.users?._id
      ),
    }),
  });

  const { products } = useGetProductsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      products: data?.products?.filter((x) => x?.shop?.id === id),
    }),
  });

  return (
    <>
      <Header />
      <section className="wholesalerProfile__section">
        <div className="container">
          <div className="wholesalerProfile__content">
            {isLoading && productLoading && requestLoading ? (
              <ProfileSkeleton />
            ) : (
              <div className="wholesalerProfile__details">
                <div className="wholesalerProfile__avater">
                  <img src={image} alt={shop?.companyName} />
                  <div className="avater__data">
                    <h3 className="avater__title">{shop?.companyName}</h3>
                    {/* <span className="avater__role">wholesaler</span> */}
                  </div>
                </div>

                <ul className="wholesalerProfile__list">
                  <li className="wholesalerProfile__item">
                    <span className="item__property">Owner</span>
                    <span className="item__value">{shop?.name}</span>
                  </li>
                  <li className="wholesalerProfile__item">
                    <span className="item__property">Email</span>
                    <span className="item__value">{shop?.companyEmail}</span>
                  </li>
                  <li className="wholesalerProfile__item">
                    <span className="item__property">Phone</span>
                    <span className="item__value">{shop?.companyPhone}</span>
                  </li>
                  <li className="wholesalerProfile__item">
                    <span className="item__property">Country</span>
                    <span className="item__value">{shop?.country}</span>
                  </li>
                </ul>
              </div>
            )}

            <div className="wholesalerProfile__products">
              <div className="products__header">
                <h3 className="title">Products</h3>
                <CustomSearchBox placeholder="Search product in store" />
              </div>

              <div className="products__grid">
                {isLoading && productLoading && requestLoading
                  ? Object.values("asdf")?.map((value, index) => (
                      <ProductCardSkeleton key={index} />
                    ))
                  : products?.map((product) => (
                      <UserShopProductCard
                        product={product}
                        key={product?._id}
                      />
                    ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserShop;
