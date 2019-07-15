const db = require('../config/db.config.js');
const Proyecto = db.proyectos;

//Subir una tarea
exports.create = (req, res) => {

	Proyecto.create({
		"nombre": req.body.nombre,
		"identificador": req.body.identificador
	}).then(proyecto => {
		//Con esto se envia el objeto creado al cliente
		res.json(proyecto);
	}).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error", details: err});
	});
};

//obtener todas las tareas
exports.findAll = (req, res) => {
	Proyecto.findAll().then(proyectos => {
		//envia todas las tareas al cliente
		res.json(proyectos.sort(function(c1, c2){return c1.id - c2.id}));
	}).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error", details: err});
	});
};

//encontrar tarea por id
exports.findById = (req, res) => {
	Proyecto.findById(req.params.id).then(proyecto => {
		res.json(proyecto);
	}).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error", details: err});
	});
};

//actualizar un proyecto
exports.update = (req, res) => {
	const id = req.body.id;
	Proyecto.update( req.body,
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
	Proyecto.destroy({
		where: {id: id}
	}).then(() => {
		res.status(200).json( { msg: 'Proyecto eliminado'});
	}).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error", details: err});
	});
};
