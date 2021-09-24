const jwt = require('jsonwebtoken');
const { SECRET } = require('../config');
const mysqlConnection = require('../database');

const verifyToken = async(req, res, next) => {
    const token = req.headers["x-access-token"];

    if (token) {
        return jwt.verify(token, SECRET, async function(err, decoded) { //calback with error & decoded
            if (err) {
                return res.json({
                    success: false,
                    message: "Failed to authenticate token.",
                });
            }

            req.id = decoded.id;

            const user = await mysqlConnection.query('SELECT id FROM users WHERE id = ?', [req.id]);

            if (user.length === 0) return res.status(404).json({ message: 'No user found' });

            return next();
        });
    }
}



module.exports = { verifyToken };