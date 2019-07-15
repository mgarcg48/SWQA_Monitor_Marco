module.exports = (sequelize, Sequelize) => {
	const Tarea = sequelize.define('tarea', {
		
		nombre: {
			type: Sequelize.STRING,
			allowNull: false
		},
		identificador: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		resultado: {
			type: Sequelize.STRING,
			allowNull: false
		},
		fecha:{
			type: Sequelize.DATE,
			allowNull: false
		},
		url: {
			type: Sequelize.STRING
		},
		duracion: {
			type: Sequelize.INTEGER
		},
		duracionestimada: {
			type: Sequelize.INTEGER
		},
		usuario: {
			type: Sequelize.STRING
		}		

	}, {timestamps: false});



	return Tarea;
}