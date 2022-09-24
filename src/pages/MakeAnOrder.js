import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addCustomer } from "../app/features/cartSlice";
import { useGetCartsQuery } from "../app/services/cartsApi";
import { useGetProductsQuery } from "../app/services/productsApi";
import { useGetRequestsQuery } from "../app/services/requestApi";
import { useGetUserByRoleQuery } from "../app/services/usersApi";
import CustomAlert from "../components/controls/CustomAlert";
import CustomSearchBox from "../components/controls/CustomSearchBox";
import MakeAnOrderProduct from "../components/MakeAnOrderProduct";
import MakeOrderHeader from "../components/MakeOrderHeader";
import ProductCardSkeleton from "../components/skeletons/ProductCardSkeleton";

const MakeAnOrder = () => {
  // get id
  const { retailerId, shopId } = useParams();

  const productParams = {
    sort: 1,
    page: 0,
    limit: 500,
  };

  const sort = 1;
  const pageIndex = 0;

  const pathname = `user/all?sort=${sort}&page=${pageIndex}&role=retailer`;

  // Redux element
  const dispatch = useDispatch();
  const { isLoading } = useGetProductsQuery(productParams);
  const { isLoading: cartLoading } = useGetCartsQuery();
  const { isLoading: requestLoading } = useGetRequestsQuery();
  const { isLoading: retailerLoading } = useGetUserByRoleQuery(pathname);

  const { retailer } = useGetUserByRoleQuery(pathname, {
    selectFromResult: ({ data }) => ({
      retailer: data?.users.find((x) => x._id === retailerId),
    }),
  });

  const { products } = useGetProductsQuery(productParams, {
    selectFromResult: ({ data }) => ({
      products: data?.products?.filter((x) => x?.shop?.id === shopId),
    }),
  });

  // check exist request
  const { request } = useGetRequestsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      request: data?.requests?.find(
        (x) => x?.user?._id === retailerId && x?.shop?._id === shopId
      ),
    }),
  });

  useEffect(() => {
    dispatch(addCustomer({ name: retailer?.name, _id: retailer?._id }));
  }, [dispatch, retailer]);

  return (
    <section className="products__section makeAnOrder__section m__section">
      {/* Header */}
      <MakeOrderHeader />

      {/* Retailer info */}
      <div className="retialer__info container">
        <div>
          <span className="info__name">
            Customer: <span className="info__details">{retailer?.name}</span>
          </span>
          <span className="info__name">
            Email: <span className="info__details">{retailer?.email}</span>
          </span>
        </div>
        <div>
          <span className="info__name">
            Company Name:{" "}
            <span className="info__details">{retailer?.companyName}</span>
          </span>
          <span className="info__name">
            Company Phone:{" "}
            <span className="info__details">{retailer?.companyPhone}</span>
          </span>
        </div>
      </div>

      <div className="container section">
        <div className="products__header">
          <h3 className="prodcuts__title">Your Products</h3>
          <CustomSearchBox placeholder="Search products...." />
        </div>

        <div className="products__grid">
          {isLoading &&
            cartLoading &&
            requestLoading &&
            retailerLoading &&
            Object.values("asasdfasda")?.map((value, index) => (
              <ProductCardSkeleton key={index} />
            ))}

          {!isLoading &&
            !cartLoading &&
            !requestLoading &&
            !retailerLoading &&
            products?.length === 0 && (
              <CustomAlert message="No products found!" severity="warning" />
            )}

          {products?.length > 0 &&
            products?.map((product) => (
              <MakeAnOrderProduct
                product={product}
                key={product?._id}
                request={request}
              />
            ))}
        </div>
      </div>
    </section>
  );
};

export default MakeAnOrder;
