import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

import app from "./app.js";

console.log("📍📍📍📍", process.env.NODE_ENV);

const sequelize = new Sequelize(
  `${process.env.DATABASE}`,
  `${process.env.DIALECT}`,
  `${process.env.DATABASE_PASSWORD}`,
  {
    host: `${process.env.HOST}`,
    dialect: "postgres",
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

const port: number | string = process.env.PORT || 4040;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
