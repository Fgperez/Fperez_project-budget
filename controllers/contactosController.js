const Contactos = require('../models/contactos');

const contactosController = {
    // Crear un nuevo contacto
    async create(req, res) {
        try {
            const { nombre, telefono, email, mensaje } = req.body;
            const contactos = await Contactos.create({ nombre, telefono, email, mensaje });
            res.status(201).json(contactos);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Obtener todos los contactos que no están eliminados
    async getAll(req, res) {
        try {
            const contactos = await Contactos.findAll({
                where: {
                    isDelete: false,  // Solo contactos donde isDelete es false
                }
            });
            res.status(200).json(contactos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },


    // Obtener un comentario por ID
    async getById(req, res) {
        try {
            const { id } = req.params;
            const contactos = await Contactos.findByPk(id);
            if (contactos) {
                res.status(200).json(contactos);
            } else {
                res.status(404).json({ error: 'Contacto no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Actualizar un contacto por ID
    async update(req, res) {
        try {
            const { id } = req.params;
            // const { nombre, telefono, email, mensaje, isDelete = false} = req.body;
            const { nombre, telefono, email, mensaje } = req.body;
            const contactos = await Contactos.findByPk(id);
            if (contactos) {
                // await comentario.update({ nombre, telefono, email, mensaje, isDelete});
                await contactos.update({ nombre, telefono, email, mensaje });
                res.status(200).json(contactos);
            } else {
                res.status(404).json({ error: 'Contactos no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Marcar un contacto como eliminado (cambiar isDelete a true)
    async delete(req, res) {
        try {
            const { id } = req.params;
            const contactos = await Contactos.findByPk(id);
            if (contactos) {
                await contactos.update({ isDelete: true });
                res.status(200).json({ message: 'Contacto marcado como eliminado correctamente' });
            } else {
                res.status(404).json({ error: 'Contacto no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = contactosController;

