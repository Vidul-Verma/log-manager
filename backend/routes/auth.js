import { Router } from 'express';
import { hash, compare } from 'bcryptjs';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const router = Router();

const createToken = (user) => {
  return jwt.sign({ username: user.username,  }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    console.log("New user:", newUser);
    await newUser.save();


    const token = createToken(newUser);
    res.status(200).json({ message: "User Registered" ,token });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(400).json({ error });
  }
})

router.post('/login', async(req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
    
        const match = await compare(password, user.password);
        if (!match) return res.status(401).json({ error: 'Invalid credentials' });
    
        const token = createToken(user);
    user.token = token;                 
    await user.save(); 
        res.json({ message: 'Logged in', token });
    } catch (error) {
        res.status(500).json({ error });
      }
})

export default router;