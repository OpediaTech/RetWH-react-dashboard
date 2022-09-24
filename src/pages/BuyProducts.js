import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import GridViewIcon from "@mui/icons-material/GridView";
import { IconButton } from "@mui/material";
import React, { useState } from "react";
import { useGetCartsQuery } from "../app/services/cartsApi";
import { useGetProductsQuery } from "../app/services/productsApi";
import { useGetRequestsQuery } from "../app/services/requestApi";
import { useGetShopsByRoleQuery } from "../app/services/shopsApi";
import CustomSearchBox from "../components/controls/CustomSearchBox";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import ProductListItem from "../components/ProductListItem";
import ProductCardSkeleton from "../components/skeletons/ProductCardSkeleton";
import WholeSalers from "./WholeSalers";

const BuyProducts = () => {
  const [view, setView] = useState("grid");
  // const [page, setPage] = useState(0);
  // const [limit, setLimit] = useState(10);

  // Redux element
  // const { isLoading } = useGetProductsQuery();
  const { isLoading: cartLoading } = useGetCartsQuery();
  const { isLoading: requestLoading } = useGetRequestsQuery();

  // Redux element
  const { isLoading: shopLoading, data: shopsData } = useGetShopsByRoleQuery(
    "wholeseller"
  );

  const productParams = {
    sort: 1,
    page: 0,
    limit: 50000,
  };

  const { isLoading } = useGetProductsQuery(productParams);

  // console.log(productData);

  const { products } = useGetProductsQuery(productParams, {
    selectFromResult: ({ data }) => ({
      products: data?.products?.filter((product) =>
        shopsData?.shops?.find((shop) => product?.shop?.id === shop?._id)
      ),
    }),
  });

  // let hasMore = productData?.products?.length < productData?.totalProducts;

  // let dataLength = !isLoading && productData?.totalProducts;

  // const fetchMore = () => {
  //   setLimit((prevValue) => prevValue + 5);
  // };

  return (
    <section className="products__section section">
      <Header />

      <WholeSalers isLoading={shopLoading} shopsData={shopsData} />
      <div className="container">
        <div className="products__header">
          <h3 className="prodcuts__title">Our Products</h3>

          <div className="products__view">
            <h4 className="view__title">View</h4>
            <IconButton onClick={() => setView("grid")}>
              <GridViewIcon />
            </IconButton>
            <IconButton onClick={() => setView("list")}>
              <FormatListBulletedIcon />
            </IconButton>
            <CustomSearchBox placeholder="Search products...." />
          </div>
        </div>

        <div className="products__grid">
          {isLoading &&
            cartLoading &&
            requestLoading &&
            Object.values("asasdfasda")?.map((value, index) => (
              <ProductCardSkeleton key={index} />
            ))}
        </div>

        {view === "grid" && (
          // <InfiniteScroll
          //   dataLength={dataLength} //This is important field to render the next data
          //   next={fetchMore}
          //   hasMore={hasMore}
          //   loader={
          //     <div className="products__grid">
          //       {Object.values("asasd")?.map((value, index) => (
          //         <ProductCardSkeleton key={index} />
          //       ))}
          //     </div>
          //   }
          // >
          <div className="products__grid">
            {products?.length > 0 &&
              products?.map((product) => (
                <ProductCard product={product} key={product?._id} />
              ))}
          </div>
          // </InfiniteScroll>
        )}

        {view === "list" && (
          <div className="products__list">
            {products?.map((product) => (
              <ProductListItem product={product} key={product?._id} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BuyProducts;
