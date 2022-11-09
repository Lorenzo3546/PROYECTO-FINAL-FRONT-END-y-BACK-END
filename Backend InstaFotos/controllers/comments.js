const { createComment, deleteComment, getCommentId } = require("../db/comments");
const { generateError } = require('../helpers');


const createCommentController = async (req, res, next) => {
    try {


        const { text } = req.body;

        if (!text) {
            throw generateError('Debes introducir un comentario', 400);
        }
        const userId = req.userId;

        const { postId } = req.params;


        const id = await createComment(text, userId, postId);


        res.send({
            status: 'ok',
            message: `Comment con id: ${id} creado correctamente`,
        });
    } catch (error) {
        next(error);
    }
};



const deleteCommentController = async (req, res, next) => {

    try {
        const userId = req.userId;

        const { commentId } = req.params;


        //conseguir la info del comment que quiero borrar      
        const commentUser = await getCommentId(commentId);

        //console.log(commentUser);
        //comprobar que el usuario del token es el mismo que creo el comment

        if (userId !== commentUser.user_id) {
            throw generateError('Estas intentando borrar un comment que no es tuyo', 401);
        }

        //borrar el post
        await deleteComment(commentId);

        res.send({
            status: "ok",
            message: `El comment con id: ${commentId} fue eliminado correctamente`,
        });
    } catch (error) {
        next(error);
    }
};



module.exports = {
    createCommentController,
    deleteCommentController,
};

