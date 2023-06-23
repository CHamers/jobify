import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
//console.log(process.env);
import "express-async-errors";
import morgan from "morgan";

// db and authenticateUser
import connectDB from "./db/connect.js";

// routers
import authRouter from "./routes/authRouter.js";
import jobsRouter from "./routes/jobsRouter.js";

// middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

if(process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(express.json()); //make the json data available to us in the controllers
console.log("hello");
console.log("hello");
console.log("hello");
console.log("hello");
app.get("/", (req, res) => {
  //throw new Error("error");
  res.json({msg: "API"});
});
app.get("/api/v1", (req, res) => {
  //throw new Error("error");
  res.json({msg: "hello"});
});


app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
