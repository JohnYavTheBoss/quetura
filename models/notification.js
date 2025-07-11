const mongoose = require("mongoose");
const Schemas = mongoose.Schema;

const NotificationSchemas = new Schemas(
  {
    recepteur: String,
    envoyeur: String,
    continue: String,
  },
  { timestamps: true }
);

const NotificationModel = mongoose.model("notification", NotificationSchemas);
module.exports = NotificationModel;
