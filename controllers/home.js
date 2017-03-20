const nodemailer = require('nodemailer');

let HomeController = {
    index: (req, res) => {
        res.render('index');
    },
    contact: (req, res) => {
        res.render('contact');
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
        transporter.sendMail(message, function (err, response) {
            //Email not sent
            if (err) {

                console.log(err.message);

                res.render('message-sent', {msg: 'Възникна грешка, съобщението не е изпратено.'});
                return;
            }

            transporter.close();
            res.render('message-sent', {msg: 'Съобщението е изпратено успешно!'});
        });
    }
};
module.exports = HomeController;