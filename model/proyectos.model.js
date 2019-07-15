module.exports =(sequelize, Sequelize) => {
	const Proyecto = sequelize.define('proyecto', {

		nombre: {
			type: Sequelize.STRING,
			//allowNull: false
		},
		identificador: {
			type: Sequelize.INTEGER,
			unique:true,
			//allowNull: false
		},
		seguimiento: {
			type: Sequelize.BOOLEAN,
		}
	}, {timestamps: false});

	return Proyecto;
}