import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import React from "react";
import { useSelector } from "react-redux";
import { useGetDashboardQuery } from "../app/services/dashboardApi";
import { useGetProductsQuery } from "../app/services/productsApi";
import { useGetRequestsQuery } from "../app/services/requestApi";
import { useGetShopsByRoleQuery } from "../app/services/shopsApi";
import ActivityCard from "../components/ActivityCard";
import CustomAlert from "../components/controls/CustomAlert";
import RevenueChart from "../components/RevenueChart";
import SaleChart from "../components/SaleChart";
import TopProductsSkeleton from "../components/skeletons/TopProductsSkeleton";
import TopProductList from "../components/TopProductsList";
import DashboardLayout from "../layouts/DashboardLayout";
import Orders from "./Orders";

const Dashboard = () => {
  const { isLoading: dashboardLoading, data } = useGetDashboardQuery();

  // console.log(data);

  const salesActivity = [
    {
      title: "Total Sales",
      total: "$" + data?.sales?.total_sales,
      icon: <CurrencyExchangeIcon />,
      color: "linear-gradient(to right, #7879f1 , #f1788e)",
    },
    {
      title: "Total Revenue",
      total: "$" + data?.sales?.total_revenue,
      icon: <MonetizationOnIcon />,
      color: "linear-gradient(to right, #5b86e5, #36d1dc ",
    },
    {
      title: "Total Purchease",
      total: "$" + data?.sales?.total_purchases,
      icon: <AddShoppingCartIcon />,
      color: "linear-gradient(to right, #185a9d ,#43cea2)",
    },
    {
      title: "Total Product",
      total: data?.products?.total_products,
      color: "#7879f1",
    },
    {
      title: "Out of Stock",
      total: data?.products?.sold_amounts,
      color: "#FF6E7F",
    },
    {
      title: "Total Stock",
      total: data?.products?.total_stock,
      color: "#0AD993",
    },
  ];

  const productParams = {
    sort: 1,
    page: 0,
    limit: 10,
  };

  // Redux element
  const { userInfo } = useSelector((state) => state.auth);
  const { isLoading, isError, error } = useGetProductsQuery(productParams);

  // Redux element
  const { isLoading: shopLoading, data: shopsData } = useGetShopsByRoleQuery(
    "wholeseller"
  );

  const { products } = useGetProductsQuery(productParams, {
    selectFromResult: ({ data }) => ({
      products: data?.products?.filter((product) =>
        shopsData?.shops?.find((shop) => product?.shop?.id === shop?._id)
      ),
    }),
  });

  const { request } = useGetRequestsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      request: data?.requests?.find((x) =>
        products?.map(
          (y) =>
            x?.shop?._id === y?.shop?.id &&
            x?.user?.email === userInfo?.users?.email
        )
      ),
    }),
  });

  return (
    <DashboardLayout>
      <section className="dashboard">
        <h3 className="salesActivity__title">This Month Sales Activity</h3>
        <div className="dashboard__salesActivity">
          {salesActivity?.map((activity, index) => (
            <ActivityCard
              activity={activity}
              key={index}
              loading={dashboardLoading}
            />
          ))}
        </div>

        <div className="dashboard__details">
          <div className="dashboard__charts">
            <SaleChart />
            <RevenueChart />
          </div>

          <div className="dashboard__topProducts">
            <h3 className="topProdcuts__title">Top products</h3>
            <div className="topProducts__list">
              {isLoading &&
                shopLoading &&
                [1, 2, 3, 4, 5, 6].map((value) => (
                  <TopProductsSkeleton key={value + 1} />
                ))}

              {isError && (
                <CustomAlert message={error?.data?.error} severity="error" />
              )}

              {!isLoading && !shopLoading && products?.length === 0 && (
                <CustomAlert message="Products not found!" severity="warning" />
              )}

              {products?.length > 0 &&
                products
                  ?.slice(0, 6)
                  .map((product) => (
                    <TopProductList
                      product={product}
                      key={product?._id}
                      request={request}
                    />
                  ))}
            </div>
          </div>
        </div>
        <div className="dashboard__orders">
          <Orders dashboard={true} />
        </div>
      </section>
    </DashboardLayout>
  );
};

export default Dashboard;
