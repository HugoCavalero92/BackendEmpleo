const { Router } = require('express');
const router = Router();

const { getHoja, createHoja, deleteHoja } = require('../controllers/hojadevida.controller');

router.route('/')
    .get(getHoja)
    .post(createHoja);

router.route('/:id')
    .delete(deleteHoja);

module.exports = router;