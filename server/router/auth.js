const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const authenticate = require("../middleware/authenticate");
// const cookieParser = require('cookie-parser')

// const app = express()
// app.use(cookieParser())

router.get('/', (req, res) => {
    res.send('hello router');
});

require('../db/conn');
const User = require("../model/userSchema");
const { useTransition } = require('react');

router.post('/register', async (req, res) => {
    const { email, password, cpassword } = req.body;
    if (!email || !password || !cpassword) {
        return res.status(422).json({ error: "empty fields" });
    }
    try {
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(422).json({ error: "Email already exist" });
        } else if (password != cpassword) {
            return res.status(422).json({ error: "pass do not match" });

        }
        const user = new User({ email, password });

        await user.save();

        return res.status(201).json({ message: "user registrated successfuly" });
    } catch (err) {
        console.log(err);
    }
});
router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "empty fields" });
        }
        const userLogin = await User.findOne({ email: email });

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            if (!isMatch) {
                res.status(400).json({ error: "Invalid credentials" });
            } else {
                const { password, ...others } = userLogin._doc;
                res.json(others);
            }
        } else {
            res.status(400).json({ error: "Invalid credentials" });
        }
    } catch (err) {
        console.log(err);
    }
});

router.get('/investments', authenticate, (req, res) => {
    console.log("auth investments");
    res.send(req.rootUser);
})

router.post('/add', async (req, res) => {
    try {
        // const investment = req.body;
        const { amount, category, type, date, id, email } = req.body;
        // console.log(email);
        const user = await User.findOne({ email: email });
        const transaction = { amount, id, category, type, date };
        user.investments.push(transaction);
        user.save();
        // const { password, cpassword, ...others } = user._doc;
        const { password, ...others } = user._doc;
        res.json(others);
    } catch (err) {
        console.log(err);
    }
});

router.post('/delete', async (req, res) => {
    try {
        const { email, id } = req.body;
        console.log(id);
        await User.updateOne({ email: email }, {
            $pull: {
                investments: {_id: id},
            },
        });
        const user = await User.findOne({ email: email });
        const { password, ...others } = user._doc;
        res.json(others);
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;