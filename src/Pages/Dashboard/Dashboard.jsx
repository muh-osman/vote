// SASS
import style from "./Dashboard.module.scss";
// React
import { useEffect, useState } from "react";
// API
import api from "../../Utils/Api";
// Cookies
import { useCookies } from "react-cookie";
// chart.js
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const [cookies] = useCookies(["token"]);
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`api/analytics`, {
          headers: { Authorization: `Bearer ${cookies.token}` },
        });
        setAnalyticsData(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  if (!analyticsData) {
    return <div className={style.container}>Loading...</div>;
  }

  // Prepare series data for chart
  const seriesData = {
    labels: analyticsData.series_votes.map((series) => series.series_name),
    datasets: [
      {
        label: "Votes Count",
        data: analyticsData.series_votes.map((series) => series.votes_count),
        backgroundColor: [
          "#ff829d",
          "#ffd778",
          "#5eb5ef",
          "#6fcdcd",
          "#c2c4d1",
          "#e2e2fa",
        ],
        borderWidth: 2,
      },
    ],
  };

  // Prepare male actors data for chart
  const maleActorsData = {
    labels: analyticsData.male_actor_votes.map((actor) => actor.actor_name),
    datasets: [
      {
        label: "Votes Count",
        data: analyticsData.male_actor_votes.map((actor) => actor.votes_count),
        backgroundColor: [
          "#5eb5ef",
          "#6fcdcd",
          "#c2c4d1",
          "#e2e2fa",
          "#f0e68c",
          "#ffe4e1",
        ],
        borderWidth: 2,
      },
    ],
  };

  // Prepare female actors data for chart
  const femaleActorsData = {
    labels: analyticsData.female_actor_votes.map((actor) => actor.actor_name),
    datasets: [
      {
        label: "Votes Count",
        data: analyticsData.female_actor_votes.map(
          (actor) => actor.votes_count
        ),
        backgroundColor: [
          "#ff829d",
          "#ffd778",
          "#98fb98",
          "#afeeee",
          "#f0e68c",
          "#ffe4e1",
        ],
        borderWidth: 2,
      },
    ],
  };

  // Prepare votes over time data for chart
  const votesOverTimeData = {
    labels: analyticsData.votes_over_time.map((item) => item.date),
    datasets: [
      {
        label: "Votes Per Day",
        data: analyticsData.votes_over_time.map((item) => item.count),
        backgroundColor: "#5eb5ef",
        borderWidth: 2,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
    },
  };

  return (
    <div className={style.container}>
      {/* Total votes count */}
      <div className={style.box}>
        <h2>Total Votes: {analyticsData.total_votes}</h2>
        <p>Last Updated: {analyticsData.last_updated}</p>
      </div>

      {/* Series votes */}
      <div className={style.box}>
        <h2>أفضل مسلسل</h2>
        <Bar
          data={seriesData}
          options={{
            ...barOptions,
            plugins: {
              title: {
                display: true,
                text: "Male Actors Votes Count",
              },
            },
          }}
        />
      </div>

      {/* Male actors votes */}
      <div className={style.box}>
        <h2>أفضل ممثل</h2>
        <Bar
          data={maleActorsData}
          options={{
            ...barOptions,
            plugins: {
              title: {
                display: true,
                text: "Male Actors Votes Count",
              },
            },
          }}
        />
      </div>

      {/* Female actors votes */}
      <div className={style.box}>
        <h2>أفضل ممثلة</h2>
        <Bar
          data={femaleActorsData}
          options={{
            ...barOptions,
            plugins: {
              title: {
                display: true,
                text: "Female Actors Votes Count",
              },
            },
          }}
        />
      </div>

      {/* Votes over time */}
      <div className={style.box}>
        <h2>الأصوات بمرور الوقت</h2>
        <Bar
          data={votesOverTimeData}
          options={{
            ...barOptions,
            plugins: {
              title: {
                display: true,
                text: "Daily Votes Count",
              },
            },
          }}
        />
      </div>
    </div>
  );
}
