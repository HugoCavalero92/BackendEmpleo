const ofertasCtrl = {};

const Oferta = require('../models/Oferta');

ofertasCtrl.getOfertas = async (req, res) => {
    try{
        const ofertas = await Oferta.find().populate('user', 'name email');
        res.status(200).json({
            ok: true,
            ofertas
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error inesperado, contactese con el administrador'
        })
    }
    
};

ofertasCtrl.createOferta = async (req, res) => {
    const { title, description, date, author, uid } = req.body;

    try{
        const newOferta = new Oferta({
            title,
            description,
            date,
            author,
            user: uid
        });
    
        await newOferta.save();
        res.status(201).json({
            ok: true,
            msg: 'Nueva oferta creada exitosamente!',
            oferta: newOferta
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error inesperado, contactese con el administrador'
        });
    }
};

ofertasCtrl.getOferta = async (req, res) => {
    const { id } = req.params
    try{
        const oferta = await Oferta.findById(id);
        if(!oferta){
            res.status(404).json({
                ok: false,
                msg: 'No existe una oferta con ese id'
            });
        }

        res.json({
            ok: true,
            oferta
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error inesperado, contactese con el administrador'
        });
    }
    
}

ofertasCtrl.deleteOferta = async (req, res) => {
    const { id } = req.params
    try{
        console.log(id);
        const ofertaBorrada = await Oferta.findByIdAndDelete(id);
        console.log(ofertaBorrada);
        if(!ofertaBorrada){
            res.status(404).json({
                ok: false,
                msg: 'No existe una oferta con ese id'
            });
        }

        res.json({
            ok: true,
            msg: 'Se borro la oferta exitosamente',
            oferta: ofertaBorrada
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error inesperado, contactese con el administrador'
        });
    }

}

ofertasCtrl.updateOferta = async (req, res) => {
    const { id } = req.params
    try{
        const oferta = await Oferta.findById(id);
        if(!oferta){
            res.status(404).json({
                ok: false,
                msg: 'No existe una oferta con ese id'
            });
        }
        const datosActualizados = {
            ...req.body
        };

        const ofertaActualizada = await Oferta.findByIdAndUpdate(id, datosActualizados, {new: true});
        res.json({
            ok: true,
            msg: 'Oferta actualizada correctamente!',
            oferta: ofertaActualizada
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error inesperado, contactese con el administrador'
        });
    }
}

module.exports = ofertasCtrl;