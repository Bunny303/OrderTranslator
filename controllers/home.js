let HomeController = {
    index: (req, res) => {
        res.render('index');
    },
    contact: (req, res) => {
        res.render('contact');
    }
};
module.exports = HomeController;