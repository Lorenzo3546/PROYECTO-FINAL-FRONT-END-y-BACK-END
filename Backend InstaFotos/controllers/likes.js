const { generateError } = require('../helpers');
const { createLike, dislike, getLikes, totalLikes } = require("../db/likes");



const likePostController = async (req, res, next) => {
    try {
        const userId = req.userId;
        const { postId } = req.params;

        await createLike(userId, postId);


        res.send({
            status: "ok",
            message: `like`,
        });
    } catch (error) {
        next(error);
    }
};



const dislikeController = async (req, res, next) => {

    try {
        const userId = req.userId;

        const { postId } = req.params;

        //console.log(userId);
        //console.log(postId);


        //conseguir la info del like que quiero borrar      

        const likeUser = await getLikes(userId, postId);

        //console.log(likeUser);

        //comprobar que el usuario del token es el mismo que creo el like

        if (userId !== likeUser.user_id) {
            throw generateError('Estas intentando borrar un like que no es tuyo', 401);
        }

        //borrar el like
        await dislike(userId, postId);

        res.send({
            status: "ok",
            message: `El like fue eliminado`,
        });
    } catch (error) {
        next(error);
    }
};


const likesController = async (req, res, next) => {
    try {
        const { postId } = req.params;

        const likesNumber = await totalLikes(postId);

        //console.log(likesNumber);


        const [total] = Object.values(likesNumber);


        //console.log(total);


        res.send({
            status: "ok",
            data: total,
        });
    } catch (error) {
        next(error);
    }
};


module.exports = {
    likePostController,
    dislikeController,
    likesController,
};

