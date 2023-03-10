import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../models/Users.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username });
    if (user) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    const newUser = new UserModel({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username });

    if (!user) {
      throw new Error('User not found');
    }

    const checkPasswordValidity = await bcrypt.compare(password, user.password);

    if (!checkPasswordValidity) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.send({ user, token });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

export { router as userRouter };
