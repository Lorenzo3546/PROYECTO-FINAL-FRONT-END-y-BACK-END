const jwt = require('jsonwebtoken');
const { generateError } = require("../helpers");

const authUser = async (req, res, next) => {
    try {
    const {authorization} = req.headers;
    if(!authorization) {
        throw generateError('Falta la cabecera de Authorization', 401);
    }

// Comprobamos que el token sea correcto
    let token; 
    try {
        token = jwt.verify(authorization, process.env.SECRET);
    } catch {
        throw generateError('Token incorrecto', 401);
    }

// Metemos la info del token en la request 
req.userId = token.id; 

next();
    } catch (error) {
next(error);
    }
};





module.exports = {
    authUser,
};
