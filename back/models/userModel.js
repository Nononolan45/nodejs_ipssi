const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcryptProvider = require('../providers/bcrypt')

let userSchema = new Schema({
    email: {
        type: String,
        required: "L'email est requis",
        unique: true
    },
    password: {
        type: String,
        required: "Le mot de passe est requis'"
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

userSchema.pre('save', function (next) {
    this.password = bcryptProvider.cryptPassword(this.password, 10);
    next();
})

module.exports = mongoose.model('User', userSchema);
