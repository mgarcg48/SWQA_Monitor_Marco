const db = require('../config/db.config.js');
const Consulta = db.consultas;

exports.create = (req, res) => {

	Consulta.create({
		"url": req.body.url,
		"artefacto": req.body.artefacto,
		"identificador": req.body.identificador,
		"fecha":req.body.fecha
	}).then( consulta => {
		res.json(consulta);
	}).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error", details: err});
	});
};

exports.findAll = (req, res) => {
	Consulta.findAll({attributes: { exclude: ['artefacto'] }}).then(consulta => {
		res.json(consulta);
	}).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error", details: err});
	});
};

exports.findById = (req, res) => {
	Consulta.findByPk(req.params.id).then(consulta=> {
		res.json(consulta);
	}).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error", details: err});
	});
};

exports.update = (req, res) => {
	Consulta.update(req.body,
		{ where:{id: id}}).then(() => {
			res.status(200).json({msg: "Se ha actualizado correctamente"});
		}).catch(err => {
			console.log(err);
			res.status(500).json({msg: "error", details: err});
		});
};

exports.delete = (req, res) => {
	const id = req.params.id;
	Consulta.destroy({
		where: {id: id}
	}).then(() => {
		res.status(200).json({msg: "Consulta eliminada"});
	}).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error", details: err});
	});
};

exports.findByUrl = (req, res) => {
	Consulta.findAll({where: {url:req.params.url}}).then(consultas => {
		res.json(consultas);
	}).catch(err=> {
		console.log(err);
		res.status(500).json({msg:"error", details:err});
	});
};



exports.findByIdentificador = (req, res) => {
	Consulta.findAll({where: {identificador:req.params.identificador}, order: ['id']}).then(consultas => {
		res.json(consultas);
	}).catch(err=> {
		console.log(err);
		res.status(500).json({msg:"error", details:err});
	});
};

exports.findByArtefacto = (req, res) => {
	Consulta.findAll({where: {artefacto:req.params.artefacto}}).then(consultas => {
		res.json(consultas);
	}).catch(err=> {
		console.log(err);
		res.status(500).json({msg:"error", details:err});
	});
};