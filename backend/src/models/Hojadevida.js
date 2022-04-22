const { Schema, model } = require('mongoose');

const hojaSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        }
    }, {
        timestamps: true
    });

module.exports = model('Hojadevida', hojaSchema);