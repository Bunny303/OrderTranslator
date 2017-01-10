let homeController = require('./home');
let usersController = require('./users');
let ordersController = require('./orders');

let BaseController = {
    home: homeController,
    users: usersController,
    orders: ordersController
};

module.exports = BaseController;