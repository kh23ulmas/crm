const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const keys = require('../config/config');
const errorHandler = require('../utils/errorHandler');

module.exports.login = async function(req, res) {
    const candidate = await User.findOne({ email: req.body.email});

    if (candidate){
        //check exist user password
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
        if(passwordResult){
            //Token generation, passwords are the same
            const token = jwt.sign({
                email: candidate.email,
                id: candidate._id
            }, keys.jwt, {expiresIn: 60*60});

            res.status(200).json({
                token: `Bearer ${token}`
            })
        }
        else {
            //paroli ne sovpali
            res.status(401).json({
                message: 'Password is incorrect, try again'
            })
        }
    }
    else{
        //there is no user error
        res.status(404).json({
            message: 'User not found'
        })
    }

};
module.exports.register = async function(req, res) {
    const candidate = await User.findOne({ email: req.body.email});

    if (candidate){
        //Пользователь существует отдать ошибку
        res.status(409).json({
            message: "User with this email already exists, try to input another"
        })
    }
    else {
        //you must create user
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;
        const user  = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        });
        // user.save.then(()=>console.log('user created')).catch(console.log('error'));
        try {
            await user.save().json(user);
            res.status(201).json(user);
        }
        catch (e) {
            errorHandler(res, e);
        }
    }
};
