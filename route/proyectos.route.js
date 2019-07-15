module.exports = function(app) {
	const proyecto = require('../controller/proyectos.controller.js');

	//crear tarea, seleccionar tareas , seleccionar por id, actualizar , eliminar
	app.post('/api/proyecto', proyecto.create);
	app.get('/api/proyecto', proyecto.findAll);
	app.get('/api/proyecto/:id', proyecto.findById);
	app.put('/api/proyecto', proyecto.update);
	app.delete('/api/proyecto/:id', proyecto.delete);
}