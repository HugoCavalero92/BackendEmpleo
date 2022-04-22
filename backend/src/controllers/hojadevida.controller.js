const hojadevidaCtrl = {};

const Hoja = require('../models/Hojadevida');

hojadevidaCtrl.getHoja = async (req, res) => {
    try {
        const hojas = await Hoja.find();
        res.json(hojas);
    }
    catch (err) {
        res.status(400).json({
            error: err
        });
    }
};

hojadevidaCtrl.createHoja = async (req, res) => {
    try {
        const { username } = req.body;

        const newHoja = new Hoja({ username });
        await newHoja.save();
        res.json('Hoja creada');
    } catch (e) {
        console.log(e)
        res.json(e.errmsg);
    }
};

hojadevidaCtrl.deleteHoja = async (req, res) => {
    const { id } = req.params;
    await Hoja.findByIdAndDelete(id);
    res.json('Hoja borrada');
}

module.exports = hojadevidaCtrl;