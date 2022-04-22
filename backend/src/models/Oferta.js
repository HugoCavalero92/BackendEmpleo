const { Schema, model } = require('mongoose');

const ofertaSchema = new Schema(
    {
        title: { type: String, required: true},
        description: { type: String, required: true},
        author: { type: String, required: true},
        date: Date
    }, {
        timestamps: true
    });

module.exports = model('Oferta', ofertaSchema);