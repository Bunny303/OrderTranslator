const controllers = require('./controllers/base');
const auth = require('./config/auth');

let Routes = (app) => {

    app.get('/', controllers.home.index);
    app.get('/contact', controllers.home.contact);
    app.post('/contact/send', controllers.home.sendMessage);

    //user routes
    app.get('/users/register', controllers.users.register);
    app.get('/users/login', controllers.users.login);
    app.get('/users/logout', controllers.users.logout);
    app.post('/users/create', controllers.users.create);
    app.post('/users/authenticate', controllers.users.authenticate);

    //app.all('/:controller/:method/:id', (req, res) =>{
    // controllers[req.params.controller].req.params.method(id)
    // })

    //order routes
    app.post('/order-create', auth.isAuthenticated, controllers.orders.create);
    app.get('/order', controllers.orders.prepareDocument);
    app.get('/my-orders', controllers.orders.getUserOrders);


    app.all('*', (req, res) => {
        res.status(404);
        res.send('Not Found');
        res.end();
    });
};

module.exports = Routes;