const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const joi= require('joi')
const { generateError } = require('../helpers');
const { createUser, getUserById, getUserByEmail, modifyUser } = require('../db/users');


const newUserController = async (req, res, next) => {
    try {

        const { email, password, nick } = req.body;

// Aqui falta usar joi 
        if(!email || !password || !nick) {
            throw generateError('Debes enviar un email y una password y tu nombre de perfil público', 400);
        }
        const schema = joi.string().email();
        const validation = schema.validate (email);
    
        if (validation.error){
          throw generateError('Debes enviar un email válido', 400);
        }

        const id = await createUser(email, password, nick);
        res.send({
            status: 'ok',
            message: `User created with id: ${id}`,
        });
    } catch(error) {
        next(error);
    }
};

const getUserController = async (req, res, next) => {
    try {

        const {id} = req.params; 

        const user = await getUserById(id);


        res.send({
            status: 'ok',
            data: user, 
        });
    } catch(error) {
        next(error);
    }
};

const loginController = async (req, res, next) => {
    try {

    const { email, password } = req.body; 
    
    if(!email || !password) {
    throw generateError('Debes enviar un email y una password', 400);
}

    const user = await getUserByEmail(email); 

// Comprobamos que las contraseñas coinciden 
    const validPassword = await bcrypt.compare(password, user.password); 
    
    if(!validPassword) {
        throw generateError('La contraseña no coincide', 401);
    }
// Payload del token y firma del token 
    const payload = {id: user.id};
    const token = jwt.sign(payload, process.env.SECRET, {
        expiresIn: '30d',
    });

        res.send({
            status: 'ok',
            data: token,
        });
    } catch(error) {
        next(error);
    }
};

const modifyUserController = async (req, res, next) => {
    try {

        const {email, password, nick} = req.body; 

        const editedUser = await modifyUser(req.userId, email, password, nick);


        res.send({
            status: 'ok',
            data: editedUser, 
        });
    } catch(error) {
        next(error);
    }
};

const getLoggedUserController = async (req, res, next) => {
    try {
      const user = await getUserById(req.userId, false);
  
      res.send({
        status: 'ok',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };




module.exports = {
    newUserController,
    getUserController, 
    loginController,
    modifyUserController,
    getLoggedUserController
};
