const fs = require('fs');

const User = require('../models/user');



const removeImage = (path) => {
    if(fs.existsSync(path)){
        // Borramos la imagen anterior
        fs.unlinkSync(path);
    }
}

const updateImage = async(type, id, fileName) => {
    let oldPath;
    switch (type) {
        case 'usuarios':
            const user = await User.findById(id);
            if(!user){
                console.log('No se encontro un usuario con ese id');
                return false;
            }
            oldPath = `./uploads/${type}/${user.img}`;
            removeImage(oldPath);
            user.img = fileName;
            await user.save();
            return true;
        default:
            break;
    }
}

module.exports = {
    updateImage
}