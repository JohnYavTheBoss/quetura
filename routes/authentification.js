const { Router } = require("express");
const { logout, signInClient, signInCaissier, loginClient, loginCaissier } = require("../controllers/authentification");
const router = Router();

router.post("/register/client/", signInClient);
router.post("/register/caissier/", signInCaissier);
router.post("/login/client/", loginClient);
router.post("/login/caissier/", loginCaissier);
router.get("/logout/", logout);

module.exports = router;