import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "./components/ui/card";

import { Separator } from "./components/ui/separator";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function AutoLogDashboard() {
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [selectedCar, setSelectedCar] = useState(0);
  const [carList, setCarList] = useState([]);

  useEffect(() => {
    // Fetch car list from API
    fetch("http://localhost:3001/api/cars")
      .then((res) => res.json())
      .then((cars) => setCarList(cars))
      .catch((err) => console.error("Failed to fetch car list:", err));
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      const telemetry = await fetchTelemetryData(selectedCar);
      setData((prev) => [...prev.slice(-9), telemetry]);
      setLabels((prev) => [...prev.slice(-9), new Date().toLocaleTimeString()]);
    }, 2000);

    return () => clearInterval(interval);
  }, [selectedCar]);

  const fetchTelemetryData = async (carIndex = 0) => {
    try {
      const res = await fetch(`http://localhost:3001/api/telemetry?carIndex=${carIndex}`);
      return await res.json();
    } catch (err) {
      console.error("Failed to fetch telemetry data:", err);
      return { speed: 0, rpm: 0, fuel: 0 };
    }
  };

  const chartData = (key, label, color) => ({
    labels,
    datasets: [
      {
        label,
        data: data.map((d) => d[key]),
        borderColor: color,
        backgroundColor: `${color}33`,
        tension: 0.3,
        fill: true,
      },
    ],
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white">
      {/* Navbar */}
      <nav className="w-full py-6 px-8 bg-zinc-950 border-b border-zinc-800">
        <div className="max-w-screen-xl mx-auto text-center">
          <h1 className="text-2xl font-bold tracking-tight text-center">
            AutoLog Dashboard Telemetry Monitor
          </h1>
        </div>
      </nav>

      {/* Header */}
      <div className="max-w-5xl mx-auto text-center mt-10 px-4">
        <p className="text-lg text-zinc-400 mb-4">
          Real-time vehicle telemetry visualization for speed, RPM, and fuel levels.
        </p>
        <select
          className="bg-zinc-800 border border-zinc-700 text-white px-4 py-2 rounded-md"
          value={selectedCar}
          onChange={(e) => setSelectedCar(Number(e.target.value))}
        >
          {carList.map((car) => (
            <option key={car.id} value={car.id}>
              {car.name}
            </option>
          ))}
        </select>
      </div>

      <Separator className="my-6 mx-auto max-w-5xl bg-zinc-700" />

      {/* Charts */}
      <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-6 px-4 pb-10">
        <Card className="rounded-[10px] bg-zinc-900 border border-zinc-800 shadow-md w-full md:w-[30%]">
          <CardHeader>
            <CardTitle className="text-blue-400">Speed (km/h)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="min-h-[300px] w-full">
              <Line
                data={chartData("speed", "Speed", "#3b82f6")}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-[10px] bg-zinc-900 border border-zinc-800 shadow-md w-full md:w-[30%]">
          <CardHeader>
            <CardTitle className="text-green-400">RPM</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="min-h-[300px] w-full">
              <Line
                data={chartData("rpm", "RPM", "#10b981")}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-[10px] bg-zinc-900 border border-zinc-800 shadow-md w-full md:w-[30%]">
          <CardHeader>
            <CardTitle className="text-yellow-400">Fuel (%)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="min-h-[300px] w-full">
              <Line
                data={chartData("fuel", "Fuel", "#f59e0b")}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
