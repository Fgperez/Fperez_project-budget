
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Comentarios = sequelize.define('Comentarios', {
    usuario: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    calificacion: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: true,
        // unique: false,
    },
    isDelete: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    }
}, 

{
    schema: '14209140',
    tableName: 'comentarios',
    timestamps: false,
});

module.exports = Comentarios;