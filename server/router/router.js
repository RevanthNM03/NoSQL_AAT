const express = require('express');
const router = express.Router();

const model = require('../models/modelSchema');
const service = require('../controllers/controller');


router.get('/', service.find);
router.post('/add', service.create);
router.delete('/remove', service.delete);
router.put('/update', service.update);
router.get('/analyse', service.analysis);

module.exports = router;