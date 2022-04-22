const { Router } = require('express');
const router = Router();

const { getOfertas, createOferta, getOferta, deleteOferta, updateOferta } = require('../controllers/ofertas.controller');

router.route('/')
    .get(getOfertas)
    .post(createOferta);

router.route('/:id')
    .get(getOferta)
    .delete(deleteOferta)
    .put(updateOferta);

module.exports = router;
