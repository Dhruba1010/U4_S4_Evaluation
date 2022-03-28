const { promise } = require('bcrypt/promises');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const checkToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.checkToken(token, process.env.secretKey, (err,decoded) => {
            if(err){
                return reject(err);
            }
            return resolve(docoded);
        });
    });
};


const authenticate = async (req, res, next) => {
    if(!req.headers.authorization){
        return res.status(401).send('Authorization token not found');
    }

    if (!req.headers.authorization.startswith('bearer ')){
        return res.status(401).send('Authorization token not found');
    }

    const token = req.headers.authorization.split(' ')[1];

    let decoded;
    try {
        decoded = await checkToken(token);
    }
    catch(err){
        return res.status(401).send('Authorization token not found');
    }
    req.user = decoded.user;
    return next();
};

module.exports = authenticate;
