const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { getHoja, createHoja, deleteHoja, updateHoja, getHojaById } = require('../controllers/hojadevida.controller');
const { validateFields } = require('../middleware/validate-fields');
const { validateJwt } = require('../middleware/validate-jwt');

router.route('/')
    .get(getHoja)
    .post([
        validateJwt,
        check('experience', 'La experiencia es obligatorio').not().isEmpty(),
        check('education', 'La educacion es obligatoria').not().notEmpty(),
        check('language', 'El lenguaje es obligatorio').not().isEmpty(),
        check('personalInformation', 'La información personal es obligatoria').not().isEmpty(),
        validateFields
    ], createHoja);

router.route('/:id')
    .get(getHojaById)
    .put(updateHoja)
    .delete(deleteHoja);

module.exports = router;