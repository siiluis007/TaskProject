import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './db';
import tasksRouter from './taskController';
connectDB();

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.json());
app.use(tasksRouter);

app.listen(port, () => {
  console.log(`Task-Microservice In Port ${port}`);
});