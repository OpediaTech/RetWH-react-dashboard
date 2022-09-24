import React, { useState } from "react";
import Chart from "react-apexcharts";

const Charts = () => {
  const [state, setState] = useState({
    // subtitle: {
    //   text: "undefined",
    //   align: "left",
    //   margin: 10,
    //   offsetX: 0,
    //   offsetY: 0,
    //   floating: false,
    //   style: {
    //     fontSize: "12px",
    //     fontWeight: "normal",
    //     // fontFamily: undefined,
    //     color: "#9699a2",
    //   },
    // },

    options: {
      colors: ["#4d3a96", "#4576b5"],
      title: {
        text: "This Month Activity",
        align: "left",
        margin: 15,
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
          fontSize: "22px",
          fontWeight: "bold",
          fontFamily: "poppins",
          color: "#3d3e42",
        },
      },
      grid: {
        show: true,
        borderColor: "#f2f2f2",
        strokeDashArray: 0,
        position: "back",
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 0,
          right: 0,
          bottom: 5,
          left: 0,
        },
      },
      chart: {
        id: "basic-line",
      },
      stroke: {
        curve: "smooth",
        smooth: {
          strokeWidth: 1,
        },
      },
      markers: {
        size: 4,
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr"],
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 30, 59],
      },
    ],
  });
  return (
    <div className="charts">
      <Chart
        options={state.options}
        series={state.series}
        type="line"
        width="100%"
      />
    </div>
  );
};

export default Charts;
