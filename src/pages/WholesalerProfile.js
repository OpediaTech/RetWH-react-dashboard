import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DoneIcon from "@mui/icons-material/Done";
import { Chip } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetProductsQuery } from "../app/services/productsApi";
import { useGetRequestsQuery } from "../app/services/requestApi";
import { useGetShopsQuery } from "../app/services/shopsApi";
import image from "../assets/blank-image.jpg";
import ConnectForm from "../components/ConnectForm";
import CustomModal from "../components/controls/CustomModal";
import CustomSearchBox from "../components/controls/CustomSearchBox";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import ProductCardSkeleton from "../components/skeletons/ProductCardSkeleton";
import ProfileSkeleton from "../components/skeletons/ProfileSkeleton";

const WholesalerProfile = () => {
  const [open, setOpen] = useState(false);

  // get id
  const { id } = useParams();
  const productParams = {
    sort: 1,
    page: 0,
    limit: 500,
  };

  // Redux element
  const { isLoading } = useGetShopsQuery();
  const { isLoading: productLoading } = useGetProductsQuery(productParams);
  const { isLoading: requestLoading } = useGetRequestsQuery();

  const { userInfo } = useSelector((state) => state.auth);
  const { shop } = useGetShopsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      shop: data?.shops?.find((x) => x._id === id),
    }),
  });

  const { shopByUser } = useGetShopsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      shopByUser: data?.shops?.some((x) => x?.email === userInfo?.users?.email),
    }),
  });

  const { products } = useGetProductsQuery(productParams, {
    selectFromResult: ({ data }) => ({
      products: data?.products?.filter((x) => x?.shop?.id === id),
    }),
  });

  console.log(products);

  const { request } = useGetRequestsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      request: data?.requests?.find(
        (x) => x?.shop?._id === id && x?.user?._id === userInfo?.users?._id
      ),
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

                    {request ? (
                      request?.approved ? (
                        <Chip
                          label="Connected"
                          color="info"
                          size="small"
                          variant="contained"
                          disabled={userInfo?.users?.role === "admin"}
                          icon={<CheckCircleOutlineIcon />}
                        />
                      ) : (
                        <Chip
                          label="Pending"
                          color="warning"
                          size="small"
                          variant="outlined"
                          disabled={
                            userInfo?.users?.role === "admin" || shopByUser
                          }
                          icon={<DoneIcon />}
                        />
                      )
                    ) : (
                      <Chip
                        label="Connect"
                        color="info"
                        size="small"
                        variant="outlined"
                        disabled={
                          userInfo?.users?.role === "admin" || shopByUser
                        }
                        onClick={() => setOpen(true)}
                      />
                    )}

                    <CustomModal open={open} onClose={setOpen}>
                      <ConnectForm setOpen={setOpen} shopId={shop?._id} />
                    </CustomModal>
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
                      <ProductCard
                        product={product}
                        key={product?._id}
                        request={request}
                        shopByUser={shopByUser}
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

export default WholesalerProfile;
