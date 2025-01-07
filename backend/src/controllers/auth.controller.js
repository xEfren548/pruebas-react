const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret';

exports.userSignUp = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }



        user = new User({
            name,
            email,
            password
        })

        console.log(user);

        await user.save();

        const token = jwt.sign({ userId: user._id }, jwtSecret);

        // req.session.userId = newUser._id;
        res.status(201).json({ message: 'User signed up', token: token });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Error signing up', err });
    }
}

exports.userLogin = async (req, res) => {

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'No user found' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Password does not match' });
        }

        // req.session.userId = user._id;
        const token = jwt.sign({ userId: user._id }, jwtSecret);
        res.status(200).json({ token: token})


    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Error logging in', err });
    }
}

exports.logout = (req, res) => {

    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Error logging out', error: err });
        }
        res.status(200).json({ message: 'User logged out' });
    });
};

exports.isAuthenticated = (req, res) => {
    if (req.session.userId) {
        res.status(200).json({ authenticated: true });
    } else {
        res.status(401).json({ authenticated: false });
    }
};



