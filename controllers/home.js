const nodemailer = require('nodemailer');
const stringsConfig = require('../config/strings');
const langHelperer = require('../helpers/LanguageHelper');

let HomeController = {
    index: (req, res) => {
        let lang = langHelperer.getLanguage(req.session);
        res.render('index', {
            'active': 'home',
            navStr: stringsConfig.navigation[lang],
            indexStr: stringsConfig.index[lang]
        });
    },
    contact: (req, res) => {
        let lang = langHelperer.getLanguage(req.session);
        res.render('contact', {
            'active': 'contact',
            navStr: stringsConfig.navigation[lang],
            contactStr: stringsConfig.contact[lang]
        });
    },
    getTerms: (req, res) => {
        res.render('terms');
    },
    sendMessage: (req, res) => {
        //Setup Nodemailer transport, I chose gmail. Create an application-specific password to avoid problems.
        //todo: check other options
        //todo: add this into config file and make real gmail address
        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: "online_translator@gmail.com",
                pass: "bla"
            }
        });
        //Mail options
        let message = {
            from: req.body.username + ' &lt;' + req.body.email + '&gt;', //grab form data from the request body object
            to: 'online_translator@abv.bg',
            subject: req.body.subject,
            text: req.body.description
        };
        let lang = langHelperer.getLanguage(req.session);
        transporter.sendMail(message, function (err, response) {
            //Email not sent
            if (err) {

                console.log(err.message);

                res.render('message-sent', {
                    navStr: stringsConfig.navigation[lang],
                    msg: stringsConfig.messageSent[lang].msgNegative
                });
                return;
            }

            transporter.close();
            res.render('message-sent', {
                navStr: stringsConfig.navigation[lang],
                msg: stringsConfig.messageSent[lang].msgPositive
            });
        });
    }
};
module.exports = HomeController;