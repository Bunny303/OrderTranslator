const CryptoHelper = require('../helpers/CryptoHelper');
const errorConfig = require('../config/errors');
let User = require('mongoose').model('User');
const langHelperer = require('../helpers/LanguageHelper');
const stringsConfig = require('../config/strings');

let UsersController = {
    register: (req, res) => {
        let lang = langHelperer.getLanguage(req.cookies);
        res.render('register', {active: 'register', navStr: stringsConfig.navigation[lang]});
    },

    login: (req, res) => {
        let lang = langHelperer.getLanguage(req.cookies);
        res.render('login', {active: 'login', navStr: stringsConfig.navigation[lang]});
    },

    logout: (req, res) => {
        req.logout();
        req.session.destroy(function (err) {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/');
            }
        });
    },

    create: (req, res) => {
        let user = req.body;
        let username = user.username;
        let password = user.password;
        let confirmPassword = user['confirmPassword'];

        if (!username || !password || !confirmPassword) {
            res.render('register', {error: errorConfig.noUsernamePassword});
            return;
        }

        //check if password and confirm password are the same
        if (password !== confirmPassword) {
            res.render('register', {error: errorConfig.wrongConfirmPassword});
            return;
        }

        //generate salt and encrypt password
        user.salt = CryptoHelper.generateSalt();
        user.hashedPass = CryptoHelper.generateHashedPassword(user.salt, user.password);

        //check if username already exist and if not create new user
        User.findOne({username: username}, function (err, existingUser) {
            if (err) {
                console.log(err);
                res.render('register', {error: errorConfig.tryAgain});
                return;
            }

            if (existingUser) {
                res.render('register', {error: errorConfig.usernameExist});
                return;
            }
            else {
                User.create(user, function (err, user) {
                    if (err) {
                        console.log(err);
                        res.render('register', {error: errorConfig.tryAgain});
                        return;
                    }
                    req.logIn(user, (err) => {
                        if (err) {
                            console.log(err);
                            res.render('login', {error: errorConfig.tryAgain});
                            return;
                        }
                        res.redirect('/');
                    })
                });
            }
        });
    },

    authenticate: (req, res) => {
        let username = req.body.username;
        let password = req.body.password;
        if (!username || !password) {
            res.render('login', {error: errorConfig.noUsernamePassword});
            return;
        }

        User.findOne({username: username}, function (err, user) {
            if (err) {
                console.log(err);
                res.render('login', {error: errorConfig.tryAgain});
                return;
            }

            if (!user || !user.authenticate(password)) {
                res.render('login', {error: errorConfig.wrongUsernamePassword});
            }
            else {

                req.logIn(user, (err) => {

                    if (err) {
                        console.log(err);
                        res.render('login', {error: errorConfig.tryAgain});
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
        });
    }
};
module.exports = UsersController;