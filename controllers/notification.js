const NotificationModel = require("../models/notification");



module.exports.sendNotification = async (request, response) => {
    try {
        (await NotificationModel.create({
            envoyeur: request.body.envoyeur,
            receveur: request.body.receveur,
            message: request.body.message,
            command: request.body.command
        })).save().then((data)=>{
            if(data) return response.status(200).json(data);
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports.getNotifications = async (request, response) => {
    try {
        (await NotificationModel.find().then((data)=>{
            if(data) return response.status(200).json(data);
        }))
    } catch (error) {
        console.log(error);
    }
}
