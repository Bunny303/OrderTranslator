let OrdersController = {
    create: (req, res) => {
        res.send({status: 1});
    },

    prepare: (req, res) => {
        res.render('order-prepare');
    }
};
module.exports = OrdersController;