const CommandeModel = require("../models/commande");
const NotificationModel = require("../models/notification");

module.exports.getCommandes = async (request, response) => {
  try {
    await CommandeModel.find()
      .select()
      .sort({ createdAt: -1 })
      .then((data) => {
        if (data) return response.status(200).json(data);
      });
  } catch (error) {
    console.log(error);
  }
};
module.exports.getAllUserCommandes = async (request, response) => {
  try {
    await CommandeModel.find({ client: request.params.id })
      .select()
      .sort({ createdAt: -1 })
      .then((data) => {
        if (data) return response.status(200).json(data);
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports.commander = async (request, response) => {
  let { client, id, categorie, prix, qt, image } = request.body;

  try {
    if (request.file !== undefined) {
      let document = request.file.filename;

      (
        await CommandeModel.create({
          client: client,
          catalogue: {
            id: id,
            categorie: categorie,
            image: image,
            prix: prix,
          },
          document:
            request.file.filename != null ? document : "commande sans document",
          prix: prix,
          quantite: qt,
          total: prix * qt,
        })
      )
        .save()
        .then((data) => {
          if (data) return response.status(200).json(data);
        });
    } else {
      (
        await CommandeModel.create({
          client: client,
          catalogue: {
            id: id,
            categorie: categorie,
            image: image,
            prix: prix,
          },
          prix: prix,
          quantite: qt,
          total: prix * qt,
        })
      )
        .save()
        .then((data) => {
          if (data) return response.status(200).json(data);
        });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.modifierCommande = async (request, response) => {
  try {
    await CommandeModel.findByIdAndUpdate(
      { _id: request.params.id },
      {
        $push: {
          notification: {
            utilisate: request.body.client,
            note: "Bonjour cher client la caisse tiens à vous confirmer que votre commande a été bien recu, le service de livraison passera livrer votre commande dans 24h temps maximum. Merci de nous avoir fait confiance!",
            temps: new Date().getDate(),
          },
          livraison: "en attente de la livraison",
          payement: "payée",
        },
      },
      { new: true, upsert: true }
    ).then(async (data) => {
      if (data) {
        await NotificationModel.create({
          recepteur: request.body.client,
          envoyeur: "caisse",
          continue:
            "Bonjour cher client la caisse tiens à vous confirmer que votre commande a été bien recu, le service de livraison passera livrer votre commande dans 24h temps maximum. Merci de nous avoir fait confiance!",
        }).then((data) => {
          return response.status(200).json(data);
        });
      }
    });
  } catch (error) {
    console.error(error);
  }
};
