const controllers = require('./controllers/base');

let Routes = (app) => {

    app.get('/', controllers.home.index);
    app.get('/order-create', controllers.orders.create);
    app.get('/order', controllers.orders.prepare);
    app.post('/fileUpload', controllers.orders.fileManage);


    app.all('*', (req, res) => {
        res.status(404);
        res.send('Not Found');
        res.end();
    });
};

module.exports = Routes;