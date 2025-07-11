const mongoose = require("mongoose");
const Schemas = mongoose.Schema;

var caissierSchemas = new Schemas({
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
    telephone: {
        type: String
    },
    password: {
        type: String
    }
},{
    timestamps: true
})

var CaissierModel = mongoose.model("caissier", caissierSchemas);
module.exports = CaissierModel;