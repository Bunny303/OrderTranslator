let homeController = ('./home');
let usersController = ('./home');
let ordersController = ('./home');

let baseController = {
    home: homeController,
    users: usersController,
    orders: ordersController
};

module.exports = baseController;