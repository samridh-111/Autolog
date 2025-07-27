// AutoLog: Real-Time Vehicle Telemetry Dashboard
// Author: Samridh Suresh
// Description: Simulated telemetry dashboard for vehicles showing live speed, RPM, and fuel data.

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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
    speed: Math.floor(Math.random() * 120), // Speed in km/h
    rpm: Math.floor(Math.random() * 7000), // Engine revolutions per minute
    fuel: Math.floor(Math.random() * 100), // Fuel percentage
  };
};

export default function AutoLogDashboard() {
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const mock = generateMockData();
      setData((prev) => [...prev.slice(-9), mock]);
      setLabels((prev) => [...prev.slice(-9), new Date().toLocaleTimeString()]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

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
    <div className="p-6 space-y-6 min-h-screen bg-muted">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          🚗 AutoLog Dashboard
        </h1>
        <p className="text-muted-foreground mt-2">
          Real-time vehicle telemetry visualization for speed, RPM, and fuel levels.
        </p>
      </div>

      <Separator className="my-6" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Speed Chart */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-blue-600">Speed (km/h)</CardTitle>
          </CardHeader>
          <CardContent>
            <Line data={chartData("speed", "Speed", "#3b82f6")} />
          </CardContent>
        </Card>

        {/* RPM Chart */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-green-600">RPM</CardTitle>
          </CardHeader>
          <CardContent>
            <Line data={chartData("rpm", "RPM", "#10b981")} />
          </CardContent>
        </Card>

        {/* Fuel Chart */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-yellow-600">Fuel (%)</CardTitle>
          </CardHeader>
          <CardContent>
            <Line data={chartData("fuel", "Fuel", "#f59e0b")} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
