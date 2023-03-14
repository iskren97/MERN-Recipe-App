import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

import { userRouter } from './routes/users.js';
import { recipeRouter } from './routes/recipes.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/users', userRouter);
app.use('/recipes', recipeRouter);

mongoose
  .connect(
    `mongodb+srv://iskren97:${process.env.DB_PASS}@recipes-app.ofwehet.mongodb.net/recipes-app?retryWrites=true&w=majority`
  )
  .then(() => console.log('Connected to db'));

app.listen(3002, () => console.log('Listening on port 3002'));
