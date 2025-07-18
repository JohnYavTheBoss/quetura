const ClientModel = require("../models/client");

module.exports.getClient = async (request, response) => {
  try {
    await ClientModel.findById({ _id: request.params.id }).then((data) => {
      if (data) return response.status(200).json(data);
      else return response.status(400).send("utilisateur inconnu");
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.getAllClient = async (request, response) => {
  try {
    await ClientModel.find()
      .sort({ createdAt: -1 })
      .then((data) => {
        if (data) return response.status(200).json(data);
        else return response.status(400).send("utilisateur inconnu");
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports.modifierProfile = async (request, response) => {
  if (!ObjectID.isValid(request.params.id))
    return response.status(400).send("l'identifiant inconnu");

  let { nom, prenom, adresseLocale } = request.body;

  try {
    await ClientModel.findById({ _id: request.params.id }).then(
      async (data) => {
        await ClientModel.findByIdAndUpdate(
          { _id: request.params.id },
          {
            $set: {
              prenom: prenom,
              nom: nom,
              adresseLocale: adresseLocale,
            },
          },
          { new: true, setDefaultsOnInsert: true, upsert: true }
        ).then((data) => response.status(200).json(data));
      }
    );
  } catch (error) {
    console.log(error);
  }
};
