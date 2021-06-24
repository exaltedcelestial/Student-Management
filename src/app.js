import express from "express";
import cors from "cors";
import { ValidationError } from "express-validation";
import morgan from 'morgan';
import apiRoutes from "./routes/api";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
