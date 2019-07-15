const env = require('./env.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize( env.database, env.username, env.password, {
	host: env.host, 
	dialect: env.dialect,
	operatorsAliases: false,

	pool:{
		max: env.pool.max,
		min: env.pool.min,
		acquire: env.pool.acquire,
		idle: env.pool.idle
	}
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tareas = require('../model/tareas.model.js')(sequelize,Sequelize);
db.proyectos = require('../model/proyectos.model.js')(sequelize,Sequelize);
db.consultas = require('../model/consultas.model.js')(sequelize,Sequelize);
db.configuracion = require('../model/configuracion.model.js')(sequelize,Sequelize);

module.exports = db;