const { Router } = require('express');
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/users');
const { check } = require('express-validator');
const { validateFields } = require('../middleware/validate-fields');
const { validateJwt } = require('../middleware/validate-jwt');

/* Route: /api/usuarios */

const router = Router();

router.get('/', getUsers);

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    validateFields
] ,createUser);

router.put('/:id', [
    validateJwt,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('role', 'El rol es obligatorio').not().isEmpty(),
    validateFields
] ,updateUser);

router.delete('/:id',[
    validateJwt,
] ,deleteUser);

module.exports = router;