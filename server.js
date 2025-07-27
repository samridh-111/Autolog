import express from "express";
import cors from "cors";

const app = express();
const port = 3001;

app.use(cors());

app.get("/api/telemetry", (req, res) => {
  res.json({
    speed: Math.floor(Math.random() * 120),
    rpm: Math.floor(Math.random() * 7000),
    fuel: Math.floor(Math.random() * 100),
  });
});

app.listen(port, () => {
  console.log(`Telemetry API running at http://localhost:${port}`);
});
