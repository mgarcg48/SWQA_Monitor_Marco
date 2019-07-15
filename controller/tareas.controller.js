const db = require('../config/db.config.js');
const Tarea = db.tareas;

//Subir una tarea
exports.create = (req, res) => {

	Tarea.create({
		"nombre": req.body.nombre,
		"identificador": req.body.identificador,
		"resultado": req.body.resultado,
		"fecha": req.body.fecha,
		"usuario": req.body.usuario
	}).then(tarea => {
		//Con esto se envia el objeto creado al cliente
		res.json(tarea);
	}).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error", details: err});
	});
};

//obtener todas las tareas
exports.findAll = (req, res) => {
	Tarea.findAll().then(tareas => {
		//envia todas las tareas al cliente
		res.json(tareas.sort(function(c1, c2){return c1.id - c2.id}));
	}).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error", details: err});
	});
};

exports.findByIdentificador = (req, res) => {
	Tarea.findAll({where: {identificador:req.params.identificador}}).then(tareas => {
		res.json(tareas);
	}).catch(err => {
		console.log(err);
		res.status(500).json({msg:"error", details: err});
	});
};

//FindByUsuario
exports.findByUsuario = (req, res) => {
	Tarea.findAll({where: {usuario:req.params.usuario}}).then(tareas => {
		res.json(tareas);
	}).catch(err => {
		console.log(err);
		res.status(500).json({msg:"error", details: err});
	});
};

//encontrar tarea por id
exports.findById = (req, res) => {
	Tarea.findById(req.params.id).then(tareas => {
		res.json(tareas);
	}).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error", details: err});
	});
};

//actualizar una tarea
exports.update = (req, res) => {
	const id = req.body.id;
	Tarea.update( req.body,
		{ where:{id: id} }).then(() =>{
			res.status(200).json( {msg: "Se ha actualizado correctamente"});
		}).catch(err => {
			console.log(err);
			res.status(500).json({msg: "error", details: err});
		});
};

//eliminar una tarea por id
exports.delete = (req, res) => {
	const id = req.params.id;
	Tarea.destroyTarea({
		where: {id: id}
	}).then(() => {
		res.status(200).json( { msg: 'Tarea eliminada'});
	}).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error", details: err});
	});
};
