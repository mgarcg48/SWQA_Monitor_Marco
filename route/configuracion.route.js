module.exports = function(app) {
    const configuracion = require('../controller/configuracion.controller.js');

    app.post('/api/configuracion', configuracion.create);
    app.put('/api/configuracion', configuracion.update);
    app.get('/api/configuracion/:id', configuracion.findById);
    app.get('/api/configuracion', configuracion.findAll);
}