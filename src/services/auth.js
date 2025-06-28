import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import createError from 'http-errors';

import User from '../models/user.js';
import Session from '../models/session.js';
import { generateTokens } from '../utils/tokens.js';

const { JWT_REFRESH_SECRET } = process.env;

export const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

export const registerUser = async ({ name, email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ name, email, password: hashedPassword });

  return {
    id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    createdAt: newUser.createdAt,
    updatedAt: newUser.updatedAt,
  };
};

export const login = async (user) => {
  const { accessToken, refreshToken, sessionId } = generateTokens(user._id);

  const accessTokenValidUntil = new Date(Date.now() + 15 * 60 * 1000);
  const refreshTokenValidUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  await Session.findOneAndDelete({ userId: user._id });

  const session = await Session.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  });

  return { accessToken, refreshToken, sessionId: session._id };
};

export const findSessionByRefreshToken = async (refreshToken) => {
  return await Session.findOne({ refreshToken });
};

export const refreshSession = async (session) => {
  const { accessToken, refreshToken, sessionId } = generateTokens(session.userId);

  const accessTokenValidUntil = new Date(Date.now() + 15 * 60 * 1000);
  const refreshTokenValidUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  await Session.findByIdAndDelete(session._id);

  await Session.create({
    _id: sessionId,
    userId: session.userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  });

  return { accessToken, refreshToken, sessionId };
};

export const deleteSession = async (refreshToken) => {
  await Session.findOneAndDelete({ refreshToken });
};
