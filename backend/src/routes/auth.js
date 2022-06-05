const { Router } = require('express');
const { check } = require('express-validator');
const { loginUser, renewToken } = require('../controllers/auth');
const { validateFields } = require('../middleware/validate-fields');
const { validateJwt } = require('../middleware/validate-jwt');


/* Route: /api/login */

const router = Router();

router.post('/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validateFields
], loginUser);


router.get('/renew', [
    validateJwt,
], renewToken);

module.exports = router;
