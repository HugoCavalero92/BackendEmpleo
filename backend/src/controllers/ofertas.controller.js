const ofertasCtrl = {};

const Oferta = require('../models/Oferta');

ofertasCtrl.getOfertas = async (req, res) => {
    const ofertas = await Oferta.find();
    res.json(ofertas);
};

ofertasCtrl.createOferta = async (req, res) => {
    const { title, description, date, author } = req.body;
    const newOferta = new Oferta({
        title,
        description,
        date,
        author
    });
    await newOferta.save();
    res.json('New Ofert added');
};

ofertasCtrl.getOferta = async (req, res) => {
    const oferta = await Oferta.findById(req.params.id);
    res.json(oferta);
}

ofertasCtrl.deleteOferta = async (req, res) => {
    await Oferta.findByIdAndDelete(req.params.id)
    res.json('ofert Deleted');
}

ofertasCtrl.updateOferta = async (req, res) => {
    const { title, description, duration, date, author } = req.body;
    await Oferta.findByIdAndUpdate(req.params.id, {
        title,
        description,
        duration,
        author
    });
    res.json('Ofert Updated');
}

module.exports = ofertasCtrl;