let OrdersController = {
    create: (req, res) => {
        res.send({status: 1});
    },

    prepare: (req, res) => {
        res.render('order-prepare', {wordsCount: 0});
    },

    fileManage: (req, res) => {
        console.log(req.body);
        console.log(req.file);
        res.redirect('/order');
    }
};
module.exports = OrdersController;