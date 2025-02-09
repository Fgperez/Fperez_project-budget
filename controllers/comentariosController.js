const Comentarios = require('../models/comentarios');

const comentariosController = {
    // Crear un nuevo comentario
    async create(req, res) {
        try {
            const { usuario, calificacion, descripcion } = req.body;
            const comentario = await Comentarios.create({ usuario, calificacion, descripcion });
            res.status(201).json(comentario);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Obtener todos los comentarios que no están eliminados
    async getAll(req, res) {
        try {
            const comentarios = await Comentarios.findAll({
                where: {
                    isDelete: false,  // Solo comentarios donde isDelete es false
                }
            });
            res.status(200).json(comentarios);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },


    // Obtener un comentario por ID
    async getById(req, res) {
        try {
            const { id } = req.params;
            const comentario = await Comentarios.findByPk(id);
            if (comentario) {
                res.status(200).json(comentario);
            } else {
                res.status(404).json({ error: 'Comentario no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Actualizar un comentario por ID
    async update(req, res) {
        try {
            const { id } = req.params;
            // const { usuario, calificacion, descripcion, isDelete = false} = req.body;
            const { usuario, calificacion, descripcion} = req.body;
            const comentario = await Comentarios.findByPk(id);
            if (comentario) {
                // await comentario.update({ usuario, calificacion, descripcion, isDelete});
                await comentario.update({ usuario, calificacion, descripcion });
                res.status(200).json(comentario);
            } else {
                res.status(404).json({ error: 'Comentario no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Marcar un comentario como eliminado (cambiar isDelete a true)
    async delete(req, res) {
        try {
            const { id } = req.params;
            const comentario = await Comentarios.findByPk(id);
            if (comentario) {
                await comentario.update({ isDelete: true });
                res.status(200).json({ message: 'Comentario marcado como eliminado correctamente' });
            } else {
                res.status(404).json({ error: 'Comentario no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = comentariosController;

