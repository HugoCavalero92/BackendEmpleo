const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { getOfertas, createOferta, getOferta, deleteOferta, updateOferta } = require('../controllers/ofertas.controller');
const { validateFields } = require('../middleware/validate-fields');
const { validateJwt } = require('../middleware/validate-jwt');

router.route('/')
    .get(getOfertas)
    .post([
        validateJwt,
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('description', 'La descripción es obligatoria').not().isEmpty(),
        validateFields
    ],
        createOferta);

router.route('/:id')
    .get(getOferta)
    .delete(deleteOferta)
    .put(updateOferta);

module.exports = router;
