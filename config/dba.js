const mongoose = require("mongoose");
const DB_CONNEXION_STRING_LOCALHOST = 'mongodb+srv://johnyav19:john19@cluster0.ddunn7v.mongodb.net/quetura';

try {
    mongoose.connect(DB_CONNEXION_STRING_LOCALHOST).then(()=> {
        console.log("connexion à mongodb ATLAS etablie avec succes");
    })
} catch (error) {
    console.log("erreur de la connexion "+" ", error);
}