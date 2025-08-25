import { Request, Response } from 'express';
import User from './user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getEnv } from '../config/env';
import RefreshToken from './refreshToken.model';
import crypto from 'crypto';

const JWT_SECRET = getEnv('JWT_SECRET');
const REFRESH_TOKEN_EXPIRY_DAYS = 7;

function generateRefreshToken() {
  return crypto.randomBytes(40).toString('hex');
}

export const register = async (req: Request, res: Response) => {
  const { email, password, name, role } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ message: 'Email already registered' });
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hash, name, role });
  const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
  const refreshToken = generateRefreshToken();
  await RefreshToken.create({
    user: user._id,
    token: refreshToken,
    expiresAt: new Date(Date.now() + REFRESH_TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000),
  });
  res.status(201).json({
    token,
    refreshToken,
    user: { id: user._id, email: user.email, name: user.name, role: user.role },
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
  const refreshToken = generateRefreshToken();
  await RefreshToken.create({
    user: user._id,
    token: refreshToken,
    expiresAt: new Date(Date.now() + REFRESH_TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000),
  });
  res.json({
    token,
    refreshToken,
    user: { id: user._id, email: user.email, name: user.name, role: user.role },
  });
};

export const refreshToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(400).json({ message: 'Missing refresh token' });
  const tokenDoc = await RefreshToken.findOne({ token: refreshToken });
  if (!tokenDoc || tokenDoc.expiresAt < new Date()) {
    return res.status(401).json({ message: 'Invalid or expired refresh token' });
  }
  const user = await User.findById(tokenDoc.user);
  if (!user) return res.status(401).json({ message: 'User not found' });
  const newAccessToken = jwt.sign({ id: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
  // Optionally rotate refresh token
  await tokenDoc.deleteOne();
  const newRefreshToken = generateRefreshToken();
  await RefreshToken.create({
    user: user._id,
    token: newRefreshToken,
    expiresAt: new Date(Date.now() + REFRESH_TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000),
  });
  res.json({ token: newAccessToken, refreshToken: newRefreshToken });
};

export const logout = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  if (refreshToken) {
    await RefreshToken.deleteOne({ token: refreshToken });
  }
  res.json({ message: 'Logged out' });
};
