module.exports = function(app) {
	const consulta = require('../controller/consultas.controller.js');

	//crear tarea, seleccionar consultas , seleccionar por id, actualizar , eliminar
	app.post('/api/consulta', consulta.create);
	app.get('/api/consulta', consulta.findAll);
	app.get('/api/consulta/:id', consulta.findById);
	app.put('/api/consulta', consulta.update);
	app.delete('/api/consulta/:id', consulta.delete);
	app.get('/api/consulta/identificador/:identificador', consulta.findByIdentificador);
	app.get('/api/consulta/:url', consulta.findByUrl);
	app.get('/api/consulta/:artefacto', consulta.findByArtefacto);
}