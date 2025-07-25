const express = require("express");
require("./config/dba");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const PORT = 5000;
const authRoute = require("./routes/authentification");
const {
  checkClient,
  requireAuth,
  requireAuthCaisse,
  checkCaissier,
} = require("./middlewares/authMiddleware");
const clientRoute = require("./routes/client");
const commandeRoute = require("./routes/commande");
const caissierRoute = require("./routes/caissier");
const notificationRoute = require("./routes/notification");


const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//JWT
app.get("*", checkClient);
app.get("*", checkCaissier);
app.get("/jwtid", requireAuth, (request, response) => {
  response.status(200).send(response.locals.client._id);
});
app.get("/jwtidCaissier", requireAuthCaisse, (request, response) => {
  response.status(200).send(response.locals.caissier._id);
});

//routes
app.use("/api/v1", authRoute);
app.use("/api/v1", commandeRoute);
app.use("/api/v1", clientRoute);
app.use("/api/v1", caissierRoute);
app.use("/api/v1", notificationRoute);

app.listen(PORT, () => {
  console.log(`le serveur est lancé au port` + ` ` + `${PORT}`);
});
