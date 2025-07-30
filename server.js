const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors());
const mockCars = [
  { id: 0, name: "Tesla Model S", speed: 250, rpm: 670, fuel: 100 },
  { id: 1, name: "BMW i8", speed: 240, rpm: 720, fuel: 85 },
  { id: 2, name: "Audi e-tron", speed: 210, rpm: 650, fuel: 90 },
  { id: 3, name: "Porsche Taycan", speed: 260, rpm: 740, fuel: 95 },
  { id: 4, name: "Nissan Leaf", speed: 144, rpm: 600, fuel: 80 },
  { id: 5, name: "Chevrolet Bolt", speed: 146, rpm: 620, fuel: 88 },
  { id: 6, name: "Hyundai Ioniq 5", speed: 185, rpm: 690, fuel: 92 },
  { id: 7, name: "Ford Mustang Mach-E", speed: 180, rpm: 710, fuel: 87 },
  { id: 8, name: "Kia EV6", speed: 190, rpm: 700, fuel: 91 },
  { id: 9, name: "Mercedes EQS", speed: 210, rpm: 750, fuel: 98 },
];
app.get("/api/cars", (req, res) => {
  res.json(mockCars.map(({ id, name }) => ({ id, name })));
});
app.get("/api/telemetry", (req, res) => {
  const carIndex = parseInt(req.query.carIndex);
  const car = mockCars.find((c) => c.id === carIndex);
  if (!car) return res.status(404).json({ error: "Car not found" });

  res.json({
    speed: car.speed + Math.floor(Math.random() * 10 - 5),
    rpm: car.rpm + Math.floor(Math.random() * 50 - 25),
    fuel: car.fuel,
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
