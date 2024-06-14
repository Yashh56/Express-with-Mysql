const jwt = require("jsonwebtoken");

// const verifyToken = (req, res, next) => {
//     const token = req.headers['authorization'];

//     if (!token) {
//         return res.status(403).send({ auth: false, message: 'No token provided.' });
//     }

//     jwt.verify(token, process.env.secret, (err, decoded) => {
//         if (err) {
//             console.error('JWT verification error:', err);
//             return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
//         }

//         req.userId = decoded.id; // Save decoded user ID for use in other routes
//         next(); // Pass control to the next handler
//     });
// };

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401); // Unauthorized

  jwt.verify(token, process.env.secret, (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden
    req.user = user;
    req.userId = user.id
    next(); // Pass the execution to the next middleware
  });
};

module.exports = { verifyToken };
