const { Router } = require('express');
const { fileUpload, getImage } = require('../controllers/uploads');
const expressFileUpload = require('express-fileupload');

const { validateJwt } = require('../middleware/validate-jwt');
/*
route: api/uploads
*/

const router = Router();

router.use(expressFileUpload());
router.put('/:type/:id', [
validateJwt
], fileUpload);

router.get('/:type/:img', [

    ], getImage);


module.exports = router;