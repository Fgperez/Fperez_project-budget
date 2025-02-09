
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Datapage = sequelize.define('Datapage', {
    slogan: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ubicacion: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    telefono: {
        type: DataTypes.BIGINT,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    acerca: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    mantenimiento: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    electricidad: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    plomeria: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    isDelete: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    }
}, 

{
    schema: '14209140',
    tableName: 'datapage',
    timestamps: false,
});

module.exports = Datapage;