const Datapage = require('../models/datapage');

const datapageController = {
// Crear un nuevo contacto
async create(req, res) {
    try {
        const { slogan, ubicacion, telefono, email, acerca, mantenimiento, electricidad, plomeria } = req.body;

        // Verificar si ya existe un registro con isdelete=false
        const existingDatapage = await Datapage.findOne({ where: { isdelete: false } });

        if (existingDatapage) {
            // Si existe, no permitimos la creación del nuevo registro
            return res.status(400).json({ error: 'Ya existe un registro activo.' });
        }

        // Si no existe, se puede crear el nuevo registro
        const datapage = await Datapage.create({
            slogan,
            ubicacion,
            telefono,
            email,
            acerca,
            mantenimiento,
            electricidad,
            plomeria
        });

        res.status(201).json(datapage);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
},


    // Obtener todos los contactos que no están eliminados
    async getAll(req, res) {
        try {
            const datapage = await Datapage.findAll({
                where: {
                    isDelete: false,  // Solo datapage donde isDelete es false
                }
            });
            res.status(200).json(datapage);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },


    // Obtener un comentario por ID
    async getById(req, res) {
        try {
            const { id } = req.params;
            const datapage = await Datapage.findByPk(id);
            if (datapage) {
                res.status(200).json(datapage);
            } else {
                res.status(404).json({ error: 'Datos de la página no encontrados' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Actualizar los datos de la página  por ID
    async update(req, res) {
        try {
            const { id } = req.params;
            // const { nombre, telefono, email, mensaje, isDelete = false} = req.body;
            const { slogan,	ubicacion,	telefono,	email,	acerca,	mantenimiento,	electricidad,	plomeria } = req.body;
            const datapage = await Datapage.findByPk(id);
            if (datapage) {
                // await comentario.update({ nombre, telefono, email, mensaje, isDelete});
                await datapage.update({ slogan,	ubicacion,	telefono,	email,	acerca,	mantenimiento,	electricidad,	plomeria });
                res.status(200).json(datapage);
            } else {
                res.status(404).json({ error: 'Datos de la página no encontrados' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Marcar un contacto como eliminado (cambiar isDelete a true)
    async delete(req, res) {
        try {
            const { id } = req.params;
            const datapage = await Datapage.findByPk(id);
            if (datapage) {
                await datapage.update({ isDelete: true });
                res.status(200).json({ message: 'Datos de la página marcada como eliminado correctamente' });
            } else {
                res.status(404).json({ error: 'Datos de la página no encontrados' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = datapageController;

