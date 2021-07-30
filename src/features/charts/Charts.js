import React, { useEffect } from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";

import { selectAllCharts, fetchCartsStats } from "./chartsSlice";

const bgroundColors = [
  "rgba(255, 99, 132, 0.2)",
  "rgba(54, 162, 235, 0.2)",
  "rgba(255, 206, 86, 0.2)",
  "rgba(75, 192, 192, 0.2)",
  "rgba(153, 102, 255, 0.2)",
  "rgba(255, 159, 64, 0.2)",
  "rgba(202, 230, 154)",
  "rgba(75, 192, 192, 0.2)",
];

const borderColors = [
  "rgba(255, 99, 132, 1)",
  "rgba(54, 162, 235, 1)",
  "rgba(255, 206, 86, 1)",
  "rgba(75, 192, 192, 1)",
  "rgba(153, 102, 255, 1)",
  "rgba(255, 159, 64, 1)",
  "rgba(153, 176, 113)",
  "rgba(75, 192, 192, 1)",
];

export const Charts = () => {
  const dispatch = useDispatch();
  const stats = useSelector(selectAllCharts);

  useEffect(() => {
    dispatch(fetchCartsStats());
  }, [dispatch]);

  const data = {
    labels: stats.map((stat) => stat.name),
    datasets: [
      {
        label: "# of Friends",
        data: stats.map((stat) => stat.friends),
        backgroundColor: bgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <>
      <section>
        <h2 className="title">
          Doughnut Chart about numbers of friends of each user
        </h2>
        <Doughnut data={data} />
      </section>
      <section>
        <h2 className="title">
          Vertical Bar Chart about numbers of friends of each user
        </h2>
        <Bar data={data} options={options} />
      </section>
    </>
  );
};
