import express from "express";
import morgan from "morgan";
const app = express();

// Body passer, reading data from body
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

console.log("📍📍📍📍📍📍", process.env.NODE_ENV);

// Test MiddlewarE
app.use((req, res, next) => {
  console.log("MIDDLEWARE");
  next();
});

app.get("/", (req, res, next) => {
  res.send("FILE SERVER");
});

export default app;
