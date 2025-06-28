import User from '../models/user.js';
import Session from '../models/session.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import { generateTokens } from '../utils/tokens.js'; 

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'access_secret';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh_secret';

const ACCESS_TOKEN_LIFE = '15m';
const REFRESH_TOKEN_LIFE = '30d';

export const findUserByEmail = async (email) => {
  return User.findOne({ email });
};

export const registerUser = async ({ name, email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });
  const userObj = user.toObject();
  delete userObj.password;
  return userObj;
};

export const login = async (user) => {
  try {
    await Session.deleteMany({ userId: user._id });
    const { accessToken, refreshToken, sessionId } = generateTokens(user._id);

    const session = await Session.create({
      userId: user._id,
      accessToken,
      refreshToken,
      sessionId,
      accessTokenValidUntil: new Date(Date.now() + 15 * 60 * 1000),
      refreshTokenValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });

    console.log('Login - New session created:', { sessionId: session._id, userId: user._id, refreshToken });
    return { accessToken, refreshToken };
  } catch (error) {
    console.error('Login service error:', error);
    throw error;
  }
};

export const findSessionByRefreshToken = async (refreshToken) => {
  console.log('Finding session with refreshToken:', refreshToken);
  return Session.findOne({ refreshToken });
};

export const refreshSession = async (session) => {
  try {
    jwt.verify(session.refreshToken, JWT_REFRESH_SECRET);
  } catch (error) {
    console.error('Refresh token verification failed:', error);
    if (error.name === 'TokenExpiredError') {
      throw createHttpError(401, 'Refresh token expired');
    }
    throw createHttpError(401, 'Invalid refresh token');
  }

  await Session.deleteOne({ _id: session._id });

  const { accessToken, refreshToken, sessionId } = generateTokens(session.userId);
  const newSession = await Session.create({
    userId: session.userId,
    accessToken,
    refreshToken,
    sessionId,
    accessTokenValidUntil: new Date(Date.now() + 15 * 60 * 1000),
    refreshTokenValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });

  console.log('Refresh - New session created:', { sessionId: newSession._id, userId: session.userId, refreshToken });
  return { accessToken, refreshToken };
};

export const deleteSession = async (refreshToken) => {
  console.log('Deleting session with refresh token:', refreshToken);
  return Session.deleteOne({ refreshToken });
};