const mongoose = require("mongoose");

const Schemas = mongoose.Schema;

const CommandeSchema = new Schemas(
  {
    client: {
      type: String,
      required: true,
    },
    catalogue: String,
    id: Number,
    categorie: String,
    document: String,
    notification: String,
     prix: Number,
    quantite: Number,
   
    total: Number,
    livraison: String,
    payement: String,
  },
  {
    timestamps: true,
  }
);

const CommandeModel = mongoose.model("commande", CommandeSchema);
module.exports = CommandeModel;
