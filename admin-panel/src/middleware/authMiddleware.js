const { verifyToken } = require('../utils/auth');

class AccessToken {

    static authMiddleware(req, res, next) {
        const token = req.headers.authorization;

        if (!token) {
          return res.status(401).json({ message: 'No token provided' });
        }
      
        try {
          const decoded = verifyToken(token);
          req.user = decoded;
          next();
        } catch (error) {
          return res.status(403).json({ message: 'Invalid token' });
        }
    }

}

module.exports = AccessToken;
