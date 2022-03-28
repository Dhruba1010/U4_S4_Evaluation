
const User = require('../models/user.model');

const jwt = require('jsonwebtoken');

require('dotenv').config();

const generateToken = (user) => {
    return jwt.sign({user}, process.env.secretKey);
}

const register = async (req, res) => {
    try {
        let user = await User.findOne({email: req.body.email});

        if(user){
            return res.status(200).send({message: 'User already registered'});
        }

        user = await User.create(req.body);

        const token = generateToken(user);
        return res.status(201).send({user, token});
    } catch(err){
        return res.status(500).send({message: err.message});
    }
};


const login = async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});

        if (!user){
            return res.status(400).send('Wrong Email or Password');
        }

        const same = user.checkPassword(req.body.password);

        if(!same) {
            return res.status(400).send('Wrong Email or Password');
        }

        const token = generateToken(user);
        return res.status(200).send({user, token});
    } catch(err){
        return res.status(500).send({message: err.message});
    }
};


module.exports = {register, login, generateToken};