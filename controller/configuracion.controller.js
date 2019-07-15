const db = require('../config/db.config.js');
const Configuracion = db.configuracion;

exports.create = (req, res)=> {
    Configuracion.create({
        "periodo": req.body.periodo,
    }).then( configuracion => {
        res.json(configuracion);
    }).catch(err => {
        console.log(err);
        res.status(500).json({msg:"error", details: err});
    });
};

exports.update = (req, res) => {
    const id = req.body.id;
    Configuracion.update(req.body,
        {where: {id: id}}).then(() => {
            res.status(200).json({msg: "Se ha actualizado correctamente"});
        }).catch(err => {
            console.log(err + "el error esta aqui ");
            res.status(500).json({msg:"error", details: err});
        });
};

exports.findById = (req, res) => {
    Configuracion.findByPk(req.params.id).then(configuracion => {
        res.json(configuracion);
    }).catch(err => {
        console.log(err);
        res.status(500).json({msg: "error", details: err});
    });
};

exports.findAll = (req, res) => {
	Configuracion.findAll().then(configuracion => {
		res.json(configuracion);
	}).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error", details: err});
	});
};