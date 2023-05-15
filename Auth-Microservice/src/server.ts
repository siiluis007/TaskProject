import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import {login, register,getUser} from './authController';
import connectDB from './db';
connectDB();
const app = express();
app.use(cors({
  origin: '*'
}));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.post('/login', login);
app.post('/register', register);
app.get('/profile/:id', getUser);

app.listen(port, () => {
  console.log(`Auth-Microservice In Port ${port}`);
});

export default app;