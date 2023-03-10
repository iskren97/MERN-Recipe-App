import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(
  `mongodb+srv://iskren97:${process.env.DB_PASS}@recipes-app.ofwehet.mongodb.net/recipes-app?retryWrites=true&w=majority`
);

app.listen(3002, () => console.log('Listening on port 3002'));
