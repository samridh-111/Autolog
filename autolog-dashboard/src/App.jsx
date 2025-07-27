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

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Utility to generate random mock telemetry data
const generateMockData = () => {
  return {
    speed: Math.floor(Math.random() * 120),       // Speed in km/h
    rpm: Math.floor(Math.random() * 7000),         // Engine revolutions per minute
    fuel: Math.floor(Math.random() * 100),         // Fuel percentage
  };
};

export default function AutoLogDashboard() {
  const [data, setData] = useState([]);       // Array of latest telemetry snapshots
  const [labels, setLabels] = useState([]);   // Time labels for chart X-axis

  // Simulate real-time updates using setInterval
  useEffect(() => {
    const interval = setInterval(() => {
      const mock = generateMockData();
      setData((prev) => [...prev.slice(-9), mock]);
      setLabels((prev) => [...prev.slice(-9), new Date().toLocaleTimeString()]);
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, []);

  // Returns a dataset object for a specific telemetry metric
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
    <div className="p-6 space-y-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center text-gray-800">
        🚗 AutoLog – Real-Time Vehicle Telemetry Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {/* Speed Chart */}
        <div className="bg-white shadow-md p-4 rounded-2xl">
          <h2 className="text-lg font-semibold text-blue-600 mb-2">Speed (km/h)</h2>
          <Line data={chartData("speed", "Speed", "#3b82f6")} />
        </div>

        {/* RPM Chart */}
        <div className="bg-white shadow-md p-4 rounded-2xl">
          <h2 className="text-lg font-semibold text-green-600 mb-2">RPM</h2>
          <Line data={chartData("rpm", "RPM", "#10b981")} />
        </div>

        {/* Fuel Level Chart */}
        <div className="bg-white shadow-md p-4 rounded-2xl">
          <h2 className="text-lg font-semibold text-yellow-600 mb-2">Fuel (%)</h2>
          <Line data={chartData("fuel", "Fuel", "#f59e0b")} />
        </div>
      </div>
    </div>
  );
}
