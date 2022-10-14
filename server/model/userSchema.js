const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    investments: [
        {
            amount: {type: Number},
            // id: {type: String},
            category: {type: String},
            type: {type: String},
            date: {type: String},
        }
    ]
})

userSchema.pre('save', async function (next) {
    console.log('hello running');
    if (this.isModified('password')) {
        const pass = await bcrypt.hash(this.password, 12);
        this.password = pass;
    }
    next();
});

userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        const tokens = this.tokens.concat({ token: token });
        this.tokens = tokens;
        await this.save();
        return token;
    } catch (err) {
        console.log(err);
    }
}

const User = mongoose.model('USER', userSchema);

module.exports = User;

