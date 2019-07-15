module.exports = function(app) {
	const tareas = require('../controller/tareas.controller.js');

	//crear tarea, seleccionar tareas , seleccionar por id, actualizar , eliminar
	app.post('/api/tareas', tareas.create);
	app.get('/api/tareas', tareas.findAll);
	app.get('/api/tarea/:id', tareas.findById);
	app.put('/api/tareas', tareas.update);
	//app.delete('/api/tareas/:id', tareas.delete);
	app.get('/api/tareas/:identificador', tareas.findByIdentificador);


	app.get('/api/tareas/user/:usuario', tareas.findByUsuario);
}