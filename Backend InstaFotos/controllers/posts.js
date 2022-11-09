const { createPost, getAllPosts, getUserPosts, getImageByDescription, deletePost, getPostById } = require("../db/posts");
const { createPathIfNotExists } = require("../helpers");
const path = require('path');
const sharp = require('sharp');
const { nanoid } = require('nanoid');
const { generateError } = require('../helpers');



const newPostController = async (req, res, next) => {
    try {

        //gestiono el texto (si tiene)
        const { text } = req.body;

        //gestiono la imagen 

        let imageFileName;

        if (req.files && req.files.image) {

            // creo el path en el directorio uploads 
            const uploadsDir = path.join(__dirname, '../uploads');

            // creo el directorio si no existe (funcion de helpers)
            await createPathIfNotExists(uploadsDir);

            // proceso la imagen 
            const image = sharp(req.files.image.data);
            image.resize(1000);

            // guardo imagen con nombre aleatorio
            imageFileName = `${nanoid(24)}.jpg`;

            await image.toFile(path.join(uploadsDir, imageFileName));
        }

        //podriamos gestionar si no hay image, con un if(!image){throw generateError()}


        const id = await createPost(req.userId, imageFileName, text);

        //req.userId me dice que id esta logeado, es decir, que usuario creó el post
        //id es donde meto el valor de la func createPost, el return es el id del post

        res.send({
            status: 'ok',
            message: `Post con id: ${id} creado correctamente`,
            data: { id, text, image: imageFileName }


        });
    } catch (error) {
        next(error);
    }
};



const getPostsController = async (req, res, next) => {
    try {

        const posts = await getAllPosts();

        res.send({
            status: 'ok',
            data: posts,
        });
    } catch (error) {
        next(error);
    }
};



const getPostsUserController = async (req, res, next) => {
    try {

        const id = req.params.id;

        const postsUser = await getUserPosts(id);

        res.send({
            status: 'ok',
            data: postsUser,
        });
    } catch (error) {
        next(error);
    }
};


const getPostByIdController = async (req, res, next) => {

    try {
        const { id } = req.params;

        const post = await getPostById(id);

        res.send({
            status: 'Ok',
            data: post,
        });
    } catch (error) {
        next(error);
    }
};



const getImageByDescriptionController = async (req, res, next) => {


    try {
        let text = req.params.texto;

        if (!text)
            text = "%";

        else
            text = `%${text}%`;

        // const image = await getImageByDescription(text).toString();
        const image = await getImageByDescription(text);


        //console.log(image);


        res.send({
            status: 'ok',
            data: image,
        });
    } catch (error) {
        next(error);
    }
};



const deletePostController = async (req, res, next) => {

    try {

        //req.userId es el id del usuario que manda la autorizacion del token
        const { id } = req.params;


        //conseguir la info del post que quiero borrar      

        const post = await getPostById(id);

        //console.log(post);
        //console.log(req.userId);
        //console.log(post.user_id);

        //comprobar que el usuario del token es el mismo que creo el post

        if (req.userId !== post.user_id) {
            throw generateError('Estas intentando borrar un post que no es tuyo', 401);
        }

        //borrar el post
        await deletePost(id);

        res.send({
            status: "ok",
            message: `El post con id: ${id} fue eliminado correctamente`,
        });
    } catch (error) {
        next(error);
    }
};




module.exports = {
    newPostController,
    getPostsController,
    getPostsUserController,
    getPostByIdController,
    getImageByDescriptionController,
    deletePostController,
};
