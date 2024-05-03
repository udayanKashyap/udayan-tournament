const { jwt_secret } = require("../utils/config");
const db = require('../db/db')
const { hostels, admins } = db.models
const ApiError = require(".././utils/apiError")
const jwt = require("jsonwebtoken")

function extractToken(req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        const token = req.headers.authorization.split(' ')[1];
        if (token === "null" || token === "undefined") {
            return null
        }
        return token
    } else if (req.query && req.query.token) {
        return req.query.token;
    }
    return null;
}

const hostelUserAuth = async (req, res, next) => {
    try {
        const token = extractToken(req)
        console.log(token);
        if (!token) {
            return res.status(403).send({ message: "Token not found" })
        }
        const decoded_data = jwt.verify(token, jwt_secret)
        const hostel = await hostels.findOne({ where: { id: decoded_data.id, name: decoded_data.name } })
        if (!hostel) {
            res.status(403).send({ message: "Payload invalid" })
            return
        }
        next()
    } catch (error) {
        res.status(403).send({ message: error.message })
    }
};

const adminUserAuth = async (req, res, next) => {
    try {
        const token = extractToken(req)
        console.log(token)
        if (!token) {
            return res.status(403).send({ message: "Token not found" })
        }
        const decoded_data = jwt.verify(token, jwt_secret);
        const admin = await admins.findOne({ where: { username: decoded_data.username } });
        if (!admin) {
            res.status(403).send({ message: "Payload invalid" });
            return;
        }
        next();
    } catch (error) {
        res.status(403).send({ message: error.message });
    }
}

module.exports = {
    hostelUserAuth,
    adminUserAuth,
}