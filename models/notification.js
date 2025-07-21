const mongoose = require("mongoose");
const Schemas = mongoose.Schema;

const NotificationSchemas = new Schemas(
  {
    receveur: String,
    envoyeur: String,
    command: String,
    message: String,
    statut: {
      type: String,
      enums: ["lu","non lu"],
      default: "non lu"
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

const NotificationModel = mongoose.model("notification", NotificationSchemas);
module.exports = NotificationModel;
