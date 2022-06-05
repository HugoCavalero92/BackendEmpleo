const hojadevidaCtrl = {};

const Hoja = require('../models/Hojadevida');

hojadevidaCtrl.getHoja = async (req, res) => {
    try {
        const hojas = await Hoja.find().populate('user', 'name email img');
        res.json({
            ok: true,
            hojasDeVida: hojas
        });
    }
    catch (err) {
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error al obtener las hojas de vida'
        });
    }
};

hojadevidaCtrl.createHoja = async (req, res) => {
    try {
        const { experience, education, language, personalInformation } = req.body;
        const uid = req.uid;
        const newHoja = new Hoja({ user: uid, experience, education, language, personalInformation });
        await newHoja.save();
        res.status(201).json({
            ok: true,
            msg: 'Hoja de vida creada exitosamente',
            hoja: newHoja
        });
    } catch (e) {
        console.log(e)
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error al crear la hoja de vida'
        });
    }
};

hojadevidaCtrl.deleteHoja = async (req, res) => {
    const { id } = req.params
    try{
        const hojaBorrada = await Hoja.findByIdAndDelete(id);
        if(!hojaBorrada){
            res.status(404).json({
                ok: false,
                msg: 'No existe una hoja de vida con ese id'
            });
        }

        res.json({
            ok: true,
            msg: 'Se borro la hoja de vida exitosamente',
            hoja: hojaBorrada
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error inesperado, contactese con el administrador'
        });
    }
}

hojadevidaCtrl.updateHoja = async (req, res) => {
    const { id } = req.params;
    try{
        const hoja = await Hoja.findById(id);
        if(!hoja){
            res.status(404).json({
                ok: false,
                msg: 'No existe una hoja con ese id'
            });
        }
        const datosActualizados = {
            ...req.body
        };

        const hojaActualizada = await Hoja.findByIdAndUpdate(id, datosActualizados, {new: true});
        res.json({
            ok: true,
            msg: 'Hoja de vida actualizada correctamente!',
            hoja: hojaActualizada
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error inesperado, contactese con el administrador'
        });
    }
}

hojadevidaCtrl.getHojaById = async (req, res) => {
    const { id } = req.params
    try{
        const hoja = await Hoja.findById(id).populate('user', 'name email img');
        if(!hoja){
            res.status(404).json({
                ok: false,
                msg: 'No existe una hoja de vida con ese id'
            });
        }
        res.json({
            ok: true,
            hoja
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error inesperado, contactese con el administrador'
        });
    }
    
}

module.exports = hojadevidaCtrl;