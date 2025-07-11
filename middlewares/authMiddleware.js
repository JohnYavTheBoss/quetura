const jwt = require('jsonwebtoken');
const ClientModel = require('../models/client');


const TOKEN_SECRET = 'kjdbck3WEOFUHSOFDUHSDSJ0998765554433221234567KJBKBKBKHHHhjhbksdbcvksbk';

module.exports.checkClient = async (request, response, next) => {
    const token = request.cookies.jwt;
    if (token) {
        jwt.verify(token, TOKEN_SECRET, async (err, decodeToken) => {
            if (err) {
                response.locals.client = null;
                //response.cookies('jwt', '', {maxAxe: 1});
                next();
            } else {
                let client = await ClientModel.findById(decodeToken.id);
                response.locals.client = client;
                console.log(response.locals.client);
                next();
            }
        });
    } else {
        response.locals.client = null;
        next();
    }
}

module.exports.requireAuth = async (request, response, next) => {
    const token = request.cookies.jwt;
    if (token) {
        jwt.verify(token, TOKEN_SECRET, async (err, decodeToken) => {
            if (err) {
                console.log(err);
            } else {
                console.log(decodeToken.id);
                next();
            }
        });
    } else return console.log('utilisateur inconnu ou aucun utilisateur connecté');
};