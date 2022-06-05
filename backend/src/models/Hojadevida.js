const { Schema, model } = require('mongoose');

const hojaSchema = new Schema(
    {
        experience: {
            type: String,
        },
        education: {
            type: String,
        },
        language: {
            type: String,
        },
        personalInformation: {
            type: String,
        },
        user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    }, {
        timestamps: true
    });

module.exports = model('Hojadevida', hojaSchema);