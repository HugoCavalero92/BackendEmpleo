const { response } = require("express");
const { updateImage } = require("../helpers/updateImage");
const uuidv4 = require('uuid').v4;
const path = require('path');
const fs = require('fs');

const fileUpload = (req, res=response) => {

    const { type, id } = req.params;

    const validTypes = ['usuarios'];
    // Validar tipo
    if(!validTypes.includes(type)){
        return res.status(400).json({
            ok: false,
            msg: 'El tipo seleccionado no es usuarios'
        });
    }

    if(!req.files || Object.keys(req.files).length === 0){
        return res.status(400).json({
            ok: false,
            msg: 'No se subio un archivo'
        });
    }

    // Procesar el archivo subido
    const file = req.files.image;

    const splittedName = file.name.split('.');
    const fileExtension = splittedName[splittedName.length - 1];

    const validExtensions = ['png', 'jpg', 'jpeg', 'gif'];

    if(!validExtensions.includes(fileExtension)){
        return res.status(400).json({
            ok: false,
            msg: 'No se subio un archivo con una extensión valida'
        });
    }
    
    const fileName = `${uuidv4()}.${fileExtension}`;
    
    // Path para guardar la imagen
    const path = `./uploads/${type}/${fileName}`;

    // Use mv para mover la imagen
    file.mv(path, (err) => {
        if(err){
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }
        
        const isUploaded = updateImage(type, id, fileName);
        if(!isUploaded){
            return res.status(500).json({
                ok: false,
                msg: 'Error al subir la imagen'
            });
        }
        res.json({
            ok: true,
            msg: 'Se subio la imagen exitosamente',
            image: fileName
        });
    })

}

const getImage = (req, res=response) => {

    const { type, img } = req.params;

    const pathImg = path.join(__dirname, `../../uploads/${type}/${img}`);

    if(fs.existsSync(pathImg)){
        res.sendFile(pathImg);
    } else{
        res.sendFile(path.join(__dirname, `../../uploads/no-img.jpg`));
    }

    
}

module.exports = {
    fileUpload,
    getImage
}