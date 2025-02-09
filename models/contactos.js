
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Contactos = sequelize.define('Contactos', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    telefono: {
        type: DataTypes.BIGINT,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        // unique: false,
    },
    mensaje: {
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
    tableName: 'contactos',
    timestamps: false,
});

module.exports = Contactos;