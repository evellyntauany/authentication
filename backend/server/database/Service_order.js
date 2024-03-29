const Sequelize = require('sequelize');
const db = require('./dataBase');
const User = require('./User');


const Service_order = db.define('service_order', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('aberto', 'encerrado', 'pendente_usuário', 'pedente_solucionado', 'cancelado'),
        defaultValue: 'aberto'
    }
});

// Define a relação entre Chamado e Usuário
Service_order.belongsTo(User, { foreignKey: 'userId' });


// Verifica se a alteração na tabela
Service_order.sync();

module.exports = Service_order;