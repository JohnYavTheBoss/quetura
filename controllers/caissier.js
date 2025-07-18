const CaissierModel = require("../models/caissier");

module.exports.getCaissier = async (request, response) => {
  try {
    await CaissierModel.findById({ _id: request.params.id }).then((data) => {
      if (data) return response.status(200).json(data);
      else return response.status(400).send("utilisateur inconnu");
    });
  } catch (error) {
    console.log(error);
  }
};