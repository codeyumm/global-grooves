
import { verifyToken } from '../utils/jwt';

// method to check if token is empty or not
const authMiddleware = (handler) => async (req, res) => {
  const token = req.cookies.token;

  // token is null then send status 401 with message
  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  // token is not null then verify it with verifyToken method
  try {
    const decoded = verifyToken(token);
    req.userId = decoded.userId;
    return handler(req, res);
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default authMiddleware;
