const { Router } = require("express");
const multer = require("multer");
const path = require("path");
const uid = require("uuid");
const {
  commander,
  modifierCommande,
  getAllUserCommandes,
  getCommandes,
} = require("../controllers/commande");

const router = Router();

const stockage = multer.diskStorage({
  destination: function (request, fichier, callBack) {
    return callBack(null, "./public/uploads/command");
  },
  filename: function (request, fichier, callBack) {
    let uimage = uid.v4();
    return callBack(
      null,
      `${uimage + "_command_" + Date.now() + fichier.originalname}`
    );
  },
});

const upload = multer({
  storage: stockage,
  fileFilter: function (request, fichier, callBack) {
    var extValide = path.extname(fichier.originalname);

    if (
      extValide !== ".jpg" &&
      extValide !== ".jpeg" &&
      extValide !== ".png" &&
      extValide !== ".tif" &&
      extValide !== ".cr2" &&
      extValide !== ".jfif" &&
      extValide !== ".JPG" &&
      extValide !== ".JPEG" &&
      extValide !== ".PNG" &&
      extValide !== ".TIF" &&
      extValide !== ".CR2" &&
      extValide !== ".JFIF" &&
      extValide !== ".pdf" &&
      extValide !== ".PDF"
    ) {
      return callBack("Choisissez une  image ou un fichier PDF svp!");
    } else return callBack(null, true);
  },
});

router.post("/command/add", upload.single("document"), commander);
router.put("/command/pay/:id", modifierCommande);
router.get("/command/getusercommand/:id", getAllUserCommandes);
router.get("/command/get/", getCommandes);

module.exports = router;
