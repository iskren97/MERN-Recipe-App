import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../models/Users.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });

  if (user) {
    return res.status(422).send({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 8);
  const newUser = new UserModel({ username, password: hashedPassword });
  await newUser.save();

  res.status(201).send({ message: 'User successfully registered' });
});

router.post('/login');

export { router as userRouter };
