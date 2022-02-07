const jwt = require("jsonwebtoken");
const SECRET = "ruiu565";

exports.verifyTokenAuth = function (req, res, next) {
    const data = {
        success: false,
        message: 'Authentication failed. Token expired or wrong token!.'
    };

    if (req.headers.authorization) {
        jwt.verify(req.headers.authorization, SECRET, (err, decoded) => {
        if (err) {
            res.json(data);
        } else {
            data.success = true;
            data.DECODEDTOKEN = decoded;
            data.message = 'Authentication success.';

            req.data = data;

            return next(null, req.data);
        }
        });
    } else {
        res.json(data);
    }
};