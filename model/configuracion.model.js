module.exports =(sequelize, Sequelize) => {
    const Configuracion = sequelize.define('configuracion', {

        periodo: {
            type: Sequelize.STRING,
        }
    }, {timestamps: false});

    return Configuracion;
}