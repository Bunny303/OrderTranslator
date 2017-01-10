var HomeController = {
    index: (req, res) => {
        res.render('index');
        //res.send({'Bla': 1});
    }
};
module.exports = HomeController;