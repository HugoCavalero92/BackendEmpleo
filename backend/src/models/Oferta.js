const { Schema, model } = require('mongoose');

const ofertaSchema = new Schema(
    {
        title: { type: String, required: true},
        description: { type: String, required: true},
        author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
        date:{type: Date} 
    }, {
        timestamps: true
    });

module.exports = model('Oferta', ofertaSchema);