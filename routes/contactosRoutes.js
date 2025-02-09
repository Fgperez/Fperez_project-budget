const express = require('express');
const contactosController = require('../controllers/contactosController');

const router = express.Router();

router.post('/contactos', contactosController.create);
router.get('/contactos', contactosController.getAll);
router.get('/contactos/:id', contactosController.getById);
router.put('/contactos/:id', contactosController.update);
router.delete('/contactos/:id', contactosController.delete);

module.exports = router;
