import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import User from '../models/user.js';
import Session from '../models/session.js';

const { JWT_ACCESS_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || '';
    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw createError(401, 'Access token is missing');
    }

    let payload;
    try {
      payload = jwt.verify(token, JWT_ACCESS_SECRET);
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw createError(401, 'Access token expired');
      }
      throw createError(401, 'Invalid access token');
    }

    const session = await Session.findById(payload.sessionId);
    if (!session) {
      throw createError(401, 'Session not found');
    }

    const user = await User.findById(payload.userId);
    if (!user) {
      throw createError(401, 'User not found');
    }

    req.user = user;
    req.session = session;

    next();
  } catch (error) {
    next(error);
  }
};

export default authenticate;
