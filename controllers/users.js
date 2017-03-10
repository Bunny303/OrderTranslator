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

        if (user.password !== user.confirmPassword) {
            user.globalError = 'Passwords do not match!';
            res.render('users/register', user);
        } else {
            user.salt = CryptoHelper.generateSalt();
            user.hashedPass = CryptoHelper.generateHashedPassword(user.salt, user.password);

            //todo: unhandled error when user with same username already exist
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

        User
            .findOne({username: inputUser.username})
            .then(user => {

                //todo: unhandled error when username is wrong
                if (!user.authenticate(inputUser.password)) {
                    res.render('users/login', {globalError: 'Invalid username or password'});
                }
                else {

                    req.logIn(user, (err, user) => {

                        if (err) {
                            res.render('users/login', {globalError: 'Ooops 500'});
                            return;
                        }

                        let redirectUrl = req.session.redirectUrl;
                        //if redirect url exist then after login we should redirect to previous page
                        if (redirectUrl) {
                            delete req.session.redirectUrl;

                            //override body and file
                            req.body = req.session.redirectBody;
                            req.file = req.session.redirectFile;

                            res.redirect(307, redirectUrl);
                        }
                        //we should redirect to home page
                        else {
                            res.redirect('/');
                        }
                    })
                }
            })
    }
};
module.exports = UsersController;