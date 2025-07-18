const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const ClientModel = require("../models/client");
const CaissierModel = require("../models/caissier");

const TOKEN_SECRET =
  "kjdbck3WEOFUHSOFDUHSDSJ0998765554433221234567KJBKBKBKHHHhjhbksdbcvksbk";
const createToken = (id) => {
  return jwt.sign({ id }, TOKEN_SECRET, {
    expiresIn: 365 * 24 * 60 * 60 * 1000,
  });
};

module.exports.signInClient = async (request, response) => {
  let { nom, prenom, telephone, adresseLocale, psw } = request.body;
  var password = await bcrypt.hashSync(psw, await bcrypt.genSaltSync(10));

  try {
    await ClientModel.findOne({ telephone: telephone }).then(async (data) => {
      if (data) {
        return response.status(400).json({
          error: "Ce numéro de téléphone est déjà pris, Choisissez un autre !",
        });
      } else {
        (
          await ClientModel.create({
            nom: nom,
            prenom: prenom,
            telephone: telephone,
            adresseLocale: adresseLocale,
            password: password,
          })
        )
          .save()
          .then((data) => {
            if (data) {
              var token = createToken(data._id);
              response.cookie("jwt", token, {
                httpOnly: true,
                maxAge: 365 * 24 * 60 * 60 * 1000,
              });
              return response.status(200).json(data);
            } else {
              response
                .status(400)
                .json({ error: "quelques chose s'est mal passee" });
            }
          });
      }
    });
  } catch (error) {
    return response.status(400).send({ error });
  }
};

module.exports.loginClient = async (request, response) => {
  let { login, psw } = request.body;

  try {
    await ClientModel.findOne({ telephone: login }).then((data) => {
      if (data) {
        (async () => {
          var password = await bcrypt.compareSync(psw, data.password);
          if (password === true) {
            var token = createToken(data._id);
            response.cookie("jwt", token, {
              httpOnly: true,
              maxAge: 365 * 24 * 60 * 60 * 1000,
            });
            return response.status(200).json(data);
          } else {
            return response.status(401).send("Le mot de passe est incorrect");
          }
        })();
      } else {
        return response
          .status(400)
          .send("Numéro de téléphone ou identifiant incorrect");
      }
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports.signInCaissier = async (request, response) => {
  let { nom, prenom, telephone, psw } = request.body;
  var password = await bcrypt.hashSync(psw, await bcrypt.genSaltSync(10));

  try {
    await CaissierModel.findOne({ telephone: telephone }).then(async (data) => {
      if (data) {
        return response.status(400).json({
          error:
            "Ce numéro de téléphone est déjà utilisé, Veuillez utiliser un autre",
        });
      } else {
        (
          await CaissierModel.create({
            nom: nom,
            prenom: prenom,
            telephone: telephone,
            password: password,
          })
        )
          .save()
          .then((data) => {
            var token = createToken(data._id);
            response.cookie("jwtCaisse", token, {
              httpOnly: true,
              maxAge: 365 * 24 * 60 * 60 * 1000,
            });
            if (data) return response.status(200).json(data);
          });
      }
    });
  } catch (error) {
    return response.status(400).send({ error });
  }
};

module.exports.loginCaissier = async (request, response) => {
  let { login, psw } = request.body;

  try {
    await CaissierModel.findOne({
      $or: [{ telephone: login }, { matricule: login }],
    }).then((data) => {
      if (data) {
        (async () => {
          var password = await bcrypt.compareSync(psw, data.password);
          if (password == true) {
            var token = createToken(data._id);
            response.cookie("jwtCaisse", token, {
              httpOnly: true,
              maxAge: 365 * 24 * 60 * 60 * 1000,
            });
            return response.status(200).json(data);
          } else {
            return response.status(400).send("Le mot de passe est incorrect");
          }
        })();
      } else {
        return response.status(400).send("Numéro de téléphone incorrect");
      }
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports.logout = async (request, response) => {
  response.cookie("jwt", "", { maxAge: 1 });
  console.log("cookie suprimer avec succes");
  response.redirect("/");
};
