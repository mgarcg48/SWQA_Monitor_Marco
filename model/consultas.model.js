module.exports = (sequelize, Sequelize) => {
	const Consulta = sequelize.define('consulta', {

		url:{
			type: Sequelize.STRING,
			//allowNull: false
		},
		artefacto:{
			type: Sequelize.JSON,
			//allowNull: false
		},
		//no se si hara falta esta columna pero la añado por si acaso
		identificador:{
			type: Sequelize.STRING,
			//allowNull: false
		},
		fecha:{
			type: Sequelize.DATE,
			allowNull: false,
		}
	}, {timestamps: false});

	return Consulta;
}