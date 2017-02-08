const controllers = require('./controllers/base');

let Routes = (app) => {

    app.get('/', controllers.home.index);

    //user routes
    app.get('/users/register', controllers.users.register);
    app.get('/users/login', controllers.users.login);
    app.post('/users/logout', controllers.users.logout);
    app.post('/users/create', controllers.users.create);
    app.post('/users/authenticate', controllers.users.authenticate);

    //app.all('/:controller/:method/:id', (req, res) =>{
    // controllers[req.params.controller].req.params.method(id)
    // })

    //order routes
    app.get('/order-create', controllers.orders.create);
    app.get('/order', controllers.orders.prepareDocument);
    app.get('/order/:wordsCount(\\d+)', controllers.orders.prepareDocument);
    app.get('/order/languages', controllers.orders.prepareLanguages);
    app.post('/fileUpload', controllers.orders.fileManage);


    app.all('*', (req, res) => {
        res.status(404);
        res.send('Not Found');
        res.end();
    });
};

module.exports = Routes;