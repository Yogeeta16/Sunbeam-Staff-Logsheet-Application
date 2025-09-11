const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) return res.status(401).json({ message: 'Access Denied: No token provided' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access Denied: No token provided' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // { id, role }
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};

// Check if user is Coordinator
exports.isCoordinator = (req, res, next) => {
    if (req.user.role !== 'Coordinator') {
        return res.status(403).json({ message: 'Access Denied: Coordinator role required' });
    }
    next();
};
// Check if user is Staff
exports.isStaff = (req, res, next) => {
  if (req.user?.role === 'Staff') return next();
  return res.status(403).json({ message: 'Staff only' });
};
