import express, { Express, Request, Response, NextFunction } from "express";
import morgan from "morgan";

const app: Express = express();

// Development logging
// if (process.env.NODE_ENV === "development") {
// }
app.use(morgan("dev"));


// Body passer, reading data from body
app.use(express.json());

// Testing Middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  req.requestTime = new Date().toISOString();
  next();
});


app.get("/", (req: Request, res: Response) => {
  res.send("FILE SERVER");
});


export default app;
