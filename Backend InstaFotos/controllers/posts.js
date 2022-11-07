const { createPost, getAllPosts, getImageById,getImageByDescription,getUserPosts, deletePost } = require("../db/posts");
const { createPathIfNotExists } = require("../helpers");
const path = require('path'); 
const sharp = require('sharp');
const {nanoid} = require('nanoid');



const newPostController = async (req, res, next) => {
    try {

    const {text} = req.body;
// falta ver si procesa el texto sin esto, en vez de ir como raw json, va como form data todo ¿?

//gestiono la imagen 

    let imageFileName; 

    if(req.files && req.files.image) {

// creo el path en el directorio uploads 
    const uploadsDir = path.join(__dirname, '../uploads');

// creo el directorio si no existe (funcion)
        await createPathIfNotExists(uploadsDir); 

// proceso la imagen 
        const image = sharp(req.files.image.data);
        image.resize(1000);

// guardo imagen con nombre aleatorio
        imageFileName = `${nanoid(24)}.jpg`;

        await image.toFile(path.join(uploadsDir, imageFileName));
    }
// dentro falta recoger del req.files.image la description ¿?

const id = await createPost(req.userId, text, imageFileName); 


        res.send({
            status: 'ok',
            message: `Post con id: ${id} creado correctamente`,
        });
    } catch(error) {
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
    } catch(error) {
        next(error);
    }
};

const deletePostController = async (req,res,next) => {
    try {
        const id = req.params.id
        const post= await deletePost(id);
        res.send({
            status: 'ok',
            data: post,
        });

    } catch (error) {
        next(error);
        
    }
}


/*const getPostsUserController = async (req, res, next) => {
    try {

        res.send({
            status: 'error',
            message: 'Not implemented'
        });
    } catch(error) {
        next(error);
    }
};*/

const getPostsUserController = async (req, res, next) => { 
    try { 
        const id  = req.params.id; 
    const postsUser = await getUserPosts(id); 
    res.send({
    status: 'ok',
     data: postsUser, }); } 
    catch (error) { next(error); } }; 



const getImageByIdController = async (req, res, next) => {
    try {
        let id = req.params.id;
        
        const image = await getImageById(id)

        res.send({
            status: 'Ok',
            data: image
        });
    } catch(error) {
        next(error);
    }
};

const getImageByDescriptionController = async (req, res, next) => {

    
    try {
            let text = req.query.texto;
            if (!text)
        text = "%";

    else
        text = `%${text}%`;

        const image = await getImageByDescription(text);

        res.send({
            status: 'ok',
            data: image,
        });
    } catch(error) {
        next(error);
    }
};




module.exports = {
    newPostController,
    getPostsController,
    deletePostController,
    getPostsUserController,
    getImageByIdController,
    getImageByDescriptionController,
};
