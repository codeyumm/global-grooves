// pages/api/auth/login.js

import connectToDatabase from '../../../utils/db';
import User from '../../../models/user';
import bcrypt from 'bcryptjs';
import { generateToken } from '../../../utils/jwt';
import { setCookie } from 'cookies-next';

export default async function handler(req, res) {
  
  await connectToDatabase();

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user);

    setCookie('token', token, { req, res, httpOnly: true });

    res.status(200).json({ message: 'Logged in successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}
