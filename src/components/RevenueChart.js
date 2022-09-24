import { CircularProgress } from "@mui/material";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import "chart.js/auto";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useGetDashboardSalesQuery } from "../app/services/dashboardApi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement
);

const RevenueChart = () => {
  const [dates, setDates] = useState([]);
  const [dataPoints, setDataPoints] = useState([]);
  const [value, onChange] = useState(null);

  const pathname = value
    ? `dashboard/sale?sort=1&fromDate=${value?.[0]}&toDate=${value?.[1]}`
    : `dashboard/sale?sort=1`;

  const { isLoading, isFetching, data } = useGetDashboardSalesQuery(pathname);

  useEffect(() => {
    const dateData = [];
    const pointsData = [];
    if (data) {
      data?.sales?.map((sale) => {
        dateData.push(sale?.createdAt);
        pointsData.push(sale?.total_revenue);
      });

      setDates(dateData);
      setDataPoints(pointsData);
    }
  }, [data]);

  return (
    <>
      <div className="date__picker">
        <span className="form__label">Filter:</span>
        <DateRangePicker
          onChange={onChange}
          value={value}
          format="y-MM-dd"
          // clearIcon={null}
          maxDate={new Date()}
        />
      </div>
      <div className="revenueChart">
        {isLoading || isFetching ? (
          <div className="chart__loading">
            <CircularProgress color="info" size={25} />
          </div>
        ) : (
          <Bar
            id="myChart"
            updateMode="destroy"
            data={{
              labels: dates,

              datasets: [
                {
                  label: "Revenue",
                  data: dataPoints,
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                  ],
                  borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                  ],
                  borderWidth: 1,
                },
              ],
            }}
            // height={400}
            // width={400}
            options={{
              maintainAspectRatio: false,
              responsive: true,
              scales: {
                y: {
                  type: "linear",
                  display: true,
                  position: "left",
                },
              },
            }}
          />
        )}
      </div>
    </>
  );
};

export default RevenueChart;
