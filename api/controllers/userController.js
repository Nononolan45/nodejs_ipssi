const User = require('../models/userModel');
const jwt = require('jsonwebtoken');



exports.create_an_user = (req, res) => {
    let new_user = new User(req.body);

    new_user.save((error, user) => {
        if (error) {
            res.status(500);
            res.json({ message: "Erreur serveur." })
        }
        else {
            res.status(201);
            res.json(user);
        }
    });
}

exports.login_an_user = (req, res) => {
    User.findOne({ email: req.body.email }, (error, user) => {
        {
            if (error) {
                res.status(500);
                res.json({ message: "Erreur serveur." })
            }
            else {
                if (user.password = req.body.password) {
                    jwt.sign({ email: user.email, role: 'user', name: user.name },
                        process.env.JWT_SECRET,
                        { expiresIn: '30 days' },
                        (error, token) => {
                            if (error) {
                                res.json({ message: "Mot de passe ou email erroné" })
                            } else {
                                res.json({ token });
                            }
                        })
                }
                else {
                    res.json({ message: "Mot de passe ou email erroné" })

                }
            }
        }
    })
}