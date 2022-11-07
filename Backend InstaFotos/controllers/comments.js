const { createComment , deleteComment} = require("../db/comments");
const { generateError } = require('../helpers');


const createCommentController = async (req, res, next) => {
    try {
 

        const { text } = req.body; 

        if(!text) {
    throw generateError('Debes introducir un comentario', 400);
 }
        const userId = req.userId; 
    
        const { postId } = req.params; 
    

const id = await createComment (text, userId, postId); 


        res.send({
            status: 'ok',
            message: `Comment con id: ${id} creado correctamente`,
        });
    } catch(error) {
        next(error);
    }
};


const deleteCommentController = async (req, res, next) => {
    try {
 

        
        const {postId } = req.params; 
    

const id = await deleteComment (postId); 


        res.send({
            status: 'ok',
            message: `Comentario borrado correctamente`,
        });
    } catch(error) {
        next(error);
    }
};


module.exports = {
    createCommentController,
    deleteCommentController
};

