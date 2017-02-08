const CryptoHelper = require('../helpers/CryptoHelper');
let User = require('mongoose').model('User');

let UsersController = {
    register: (req, res) => {
        res.render('register');
    },
    login: (req, res) => {
        res.render('login');
    },
    logout: (req, res) => {
        req.logout();
        res.redirect('/');
    },
    create: (req, res) => {
        let user = req.body;

        console.log(user);

        if (user.password !== user.confirmPassword) {
            user.globalError = 'Passwords do not match!';
            res.render('users/register', user);
        } else {
            user.salt = CryptoHelper.generateSalt();
            user.hashedPass = CryptoHelper.generateHashedPassword(user.salt, user.password);

            User
                .create(user)
                .then(user => {
                    req.logIn(user, (err, user) => {
                        if (err) {
                            res.render('users/register', {globalError: 'Ooops 500'});
                            return;
                        }

                        res.redirect('/');
                    })
                })
        }
    },
    authenticate: (req, res) => {
        let inputUser = req.body;

        console.log(inputUser);


        User
            .findOne({username: inputUser.username})
            .then(user => {
                if (!user.authenticate(inputUser.password)) {
                    res.render('users/login', {globalError: 'Invalid username or password'});
                } else {
                    req.logIn(user, (err, user) => {
                        if (err) {
                            res.render('users/login', {globalError: 'Ooops 500'});
                            return;
                        }

                        res.redirect('/');
                    })
                }
            })
    }
};
module.exports = UsersController;