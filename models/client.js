const mongoose = require("mongoose");
const Schemas = mongoose.Schema;

var clientSchemas = new Schemas({
    nom: {
        type: String,
        minLenght: 2,
        maxLehgtn: 15,
        required: true,
        trim: true
    },
    prenom:  {
        type: String,
        minLenght: 2,
        maxLehgtn: 15,
        trim: true
    },
    email: String,
    telephone: {
        type: String
    },
    password: {
        type: String
    },
    adresseLocale: String,
    avatar: String,
    couverture: String,
},{
    timestamps: true
})

var ClientModel = mongoose.model("client", clientSchemas);
module.exports = ClientModel;