const jwt = require('jsonwebtoken');
const Usermodel = require('../models/user');

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        let token = authHeader && authHeader.split(' ')[1];
        if (!token && req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }

        if (!token) {
            return res.status(401).json({ message: 'Access Denied: No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');

        if (!decoded.id && !decoded._id && decoded.email) {
            const user = await Usermodel.findOne({ email: decoded.email });
            if (user) {
                decoded.id = user._id.toString();
                decoded._id = user._id.toString();
                decoded.role = decoded.role || 'buyer';
            }
        } else if (decoded._id && !decoded.id) {
            decoded.id = decoded._id.toString();
        }

        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid Token', error: error.message });
    }
};

module.exports = authMiddleware;