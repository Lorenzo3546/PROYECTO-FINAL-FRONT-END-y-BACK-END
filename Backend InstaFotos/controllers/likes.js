const Joi = require("@hapi/joi");
const { generateError } = require('../helpers');
const { schema } = require("@hapi/joi/lib/compile");
const { createLike, disLike, getUserId } = require("../db/likes");

async function validate(payload) {
    const schema = Joi.object({
        postId: Joi.number().integer().positive().required(),
    });
    Joi.assert(payload, schema);
}




const likePostController = async (req, res, next) => {
    try {
        const userId = req.userId; 
        const { postId } = req.params; 


    try {
        const datosAValidar = {
            postId,
        };
        await validate(datosAValidar);
    } catch (e) {
        return res.status(400).send(e);
    }
    

    const like = await createLike(userId, postId); 


    res.send({
        status: "ok",
        data: like,
    });
    } catch (error) {
      next(error);
    }
};



const dislikeController = async (req, res, next) => {

    try {
        const userId = req.userId; 

        const {postId} = req.params;

        console.log(postId);
        console.log(userId);

//conseguir la info del post que quiero borrar      

       const likeUser = await getUserId(userId, postId);

console.log(likeUser);

//comprobar que el usuario del token es el mismo que creo el like

        if(userId !== likeUser.user_id) {
        throw generateError('Estas intentando borrar un like que no es tuyo', 401);
        }

//borrar el like
        await disLike(userId, postId);

        res.send({
            status: "ok",
            message: `El like fue eliminado`,
        });
    } catch (error) {
      next(error);
    }
}; 





module.exports = {
    likePostController, 
   dislikeController,
};

