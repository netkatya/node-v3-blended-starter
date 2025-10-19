import createHttpError from 'http-errors';
import { Session } from '../models/session.js';
import { User } from '../models/user.js';

export const authenticate = async (req, res, next) => {
  console.log('🔐 Authenticate middleware called');
  console.log('🍪 All cookies:', req.cookies);
  console.log('🔑 Access token:', req.cookies?.accessToken);

  if (!req.cookies.accessToken) {
    console.log('❌ No access token in cookies');
    next(createHttpError(401, 'Missing access token'));
    return;
  }
  const session = await Session.findOne({
    accessToken: req.cookies.accessToken,
  });

  console.log('📝 Session:', session);
  console.log('📝 Session found:', session ? 'Yes' : 'No');

  if (!session) {
    next(createHttpError(401, 'Session not found'));
    return;
  }

  const isAccessTokenExpired =
    new Date() > new Date(session.accessTokenValidUntil);

  if (isAccessTokenExpired) {
    console.log('⏰ Token expired');
    return next(createHttpError(401, 'Access token expired'));
  }
  const user = await User.findById(session.userId);

  console.log('👤 User:', user);
  console.log('👤 User found:', user ? user._id : 'No');

  if (!user) {
    next(createHttpError(401));
    return;
  }

  req.user = user;
  console.log('✅ User attached to request:', req.user._id);
  next();
};
