const express = require('express');
const datapageController = require('../controllers/datapageController');

const router = express.Router();

router.post('/datapage', datapageController.create);
router.get('/datapage', datapageController.getAll);
router.get('/datapage/:id', datapageController.getById);
router.put('/datapage/:id', datapageController.update);
router.delete('/datapage/:id', datapageController.delete);

module.exports = router;
