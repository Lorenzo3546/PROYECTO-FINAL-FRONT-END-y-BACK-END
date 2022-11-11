const bcrypt = require('bcrypt');
const joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const { generateError } = require('../helpers');
const { createUser, getUserById, getUserByEmail, modifyUser, getMeUserById, getUserLikes } = require('../db/users');


const newUserController = async (req, res, next) => {
    try {

        const { email, password, nick } = req.body;


        if (!email || !password || !nick) {
            throw generateError('Debes enviar un email, una password y tu nombre de perfil', 400);
        }
        // Verificamos alta del email con joi
        const schema = joi.string().email();

        const validation = schema.validate(email);

        if (validation.error) {
            throw generateError('Debes enviar un email valido', 400);
        }

        const id = await createUser(email, password, nick);
        res.send({
            status: 'ok',
            message: `User created with id: ${id}`,
        });

    } catch (error) {
        next(error);
    }
};




const getUserController = async (req, res, next) => {
    try {

        const { id } = req.params;

        const user = await getUserById(id);


        res.send({
            status: 'ok',
            data: user,
        });
    } catch (error) {
        next(error);
    }
};


const getMeController = async (req, res, next) => {
    try {
        const user = await getMeUserById(req.userId, false);

        res.send({
            status: 'ok',
            data: user,
        });
    } catch (error) {
        next(error);
    }
};



const loginController = async (req, res, next) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            throw generateError('Debes enviar un email y una password', 400);
        }

        const user = await getUserByEmail(email);

        // Comprobamos que las contraseñas coinciden 
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            throw generateError('La contraseña no coincide', 401);
        }
        // Payload del token y firma del token 
        const payload = { id: user.id };
        const token = jwt.sign(payload, process.env.SECRET, {
            expiresIn: '30d',
        });

        res.send({
            status: 'ok',
            data: token,
        });
    } catch (error) {
        next(error);
    }
};

const modifyUserController = async (req, res, next) => {
    try {

        const { password, nick } = req.body;
        const userId = req.userId;

        await modifyUser(userId, password, nick);


        res.send({
            status: 'ok',
            message: `Datos de usuario modificados correctamente`,
        });
    } catch (error) {
        next(error);
    }
};


const getUserLikesController = async (req, res, next) => {
    try {

        const userId = req.userId;

        const data = await getUserLikes(userId);


        res.send({
            status: 'ok',
            data: data,
        });
    } catch (error) {
        next(error);
    }
};



module.exports = {
    newUserController,
    getUserController,
    getMeController,
    loginController,
    modifyUserController,
    getUserLikesController
};

