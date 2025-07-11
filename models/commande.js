const mongoose = require('mongoose');

const Schemas = mongoose.Schema;

const CommandeSchema = new Schemas({
    client: {
        type: String,
        required: true
    },
    catalogue: {
        type: [
            {
                id: Number,
                categorie: String,
                prix: Number,
                image: String
            }
        ]
    },
    document: String,
    notification: {
        type: [
            {
                utilisateur: String,
                note: String,
                temps: String,
                reponses: {
                    type: [
                        {
                            utilisateur: String,
                            reponse: String,
                            temps: String
                        }
                    ]
                },
            }
        ],
    },
    quantite: Number,
    prix: Number,
    total: Number,
    livraison: {
        type: String,
    },
    payement: {
        type: String,
        infoPayement: {

        }
    }
}, {
    timestamps: true
});

const CommandeModel = mongoose.model("commande", CommandeSchema);
module.exports = CommandeModel;