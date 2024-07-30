const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret';

exports.userSignUp = async(req, res) =>{
    const {name, email, password} = req.body;
    try {
        let user = await User.findOne({email})
        if (user){
            return res.status(400).json({ message: 'User already exists' });
        }

        user = new User({
            name,
            email,
            password
        })

        await user.save();

        const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' });
        res.status(201).json({ token });



    } catch ( err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
}

exports.userLogin = async(req, res) =>{

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user){
            return res.status(404).json({ message: 'User not found' });
        }

        user.comparePassword(password, (err, isMatch) => {
            if(!isMatch || err) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' });
            res.json({ token });
        })
    } catch(err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
}



