const express = require('express');
const comentariosController = require('../controllers/comentariosController');

const router = express.Router();

router.post('/comentarios', comentariosController.create);
router.get('/comentarios', comentariosController.getAll);
router.get('/comentarios/:id', comentariosController.getById);
router.put('/comentarios/:id', comentariosController.update);
router.delete('/comentarios/:id', comentariosController.delete);

module.exports = router;
