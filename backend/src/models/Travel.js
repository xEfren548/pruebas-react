const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const travelSchema = new Schema({
    diaInicio: {
        type: Date,
        required: true
    },
    diaFin: {
        type: Date,
        required: true
    },
    horasInicio: {
        type: Array,
        required: true
    },
    horasFin: {
        type: Array,
        required: true
    },
    lugaresInicio: {
        type: Array,
        required: true
    },
    lugaresFin: {
        type: Array,
        required: true
    },
    kilometros: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Travel', travelSchema);