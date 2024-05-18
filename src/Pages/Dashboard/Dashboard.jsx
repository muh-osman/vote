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
  const [labels, setLabels] = useState([]);
  const [candidateCount, setCandidateCount] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`api/candidates/votes`, {
          headers: { Authorization: `Bearer ${cookies.token}` },
        });
        // console.log(res.data);
        // setCandidateCount(res.data);

        // إنشاء مصفوفة العناوين بناءً على البيانات المسترجعة
        const newLabels = res.data.map((candidate) => candidate.candidate_name);
        // console.log(newLabels);
        setLabels(newLabels);

        // إنشاء كائن جديد للحالة بناءً على البيانات المسترجعة
        const newCandidateCount = res.data.reduce((acc, candidate) => {
          acc[`candidate_${candidate.candidate_id}`] = candidate.votes;
          return acc;
        }, {});
        // console.log(newCandidateCount);
        setCandidateCount(newCandidateCount);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "",
        data: Object.values(candidateCount),
        backgroundColor: [
          "#ff829d",
          "#ffd778",
          "#5eb5ef",
          "#6fcdcd",
          "#c2c4d1",
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
      title: {
        display: true,
        text: "نتائج تصويت الجمهور لجائرة الدانة للدراما",
      },
    },
  };

  return (
    <div className={style.container}>
      <div className={style.box}>
        <Doughnut data={data} options={{ responsive: true }} />
      </div>

      <div className={style.box_two}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
