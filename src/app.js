import express from "express";
import cors from "cors";
import { ValidationError } from "express-validation";
import morgan from 'morgan';
import apiRoutes from "./routes/api";

const app = express();
const port = process.env.APP_PORT || 3000;
const appURL = `http://localhost:${port}`;
const defaultFrontendURL = 'http://localhost:9001'
const whiteList = [process.env.FRONTEND_URL.toString() || defaultFrontendURL, appURL]

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error())
    }
  }
}))
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
app.use(cors());

app.use("/api", apiRoutes);
app.get('/test', (req, res) => {
  res.send('testing')
})
app.use(function (err, req, res, next) {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err);
  }

  return res.status(500).json(err);
});

module.exports = app;
