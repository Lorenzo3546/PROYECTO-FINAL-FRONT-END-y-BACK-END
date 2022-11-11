require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const {
    newUserController,
    getUserController,
    loginController,
    modifyUserController,
    getMeController,
    getUserLikesController,
} = require('./controllers/users');


const {
    newPostController,
    getPostsController,
    getPostsUserController,
    getPostByIdController,
    getImageByDescriptionController,
    deletePostController,
} = require('./controllers/posts');


const {
    createCommentController,
    deleteCommentController,
} = require('./controllers/comments');


const {
    likePostController,
    dislikeController,
    likesController,
} = require('./controllers/likes');




const { authUser } = require('./middlewares/auth');

const app = express();

app.use(fileUpload());
app.use(express.json());
app.use(morgan('dev'));
app.use('/uploads', express.static('./uploads'));
app.use(cors());

//Rutas 

app.post('/user', newUserController); //Crear usuarios
app.get('/user/info/:id', getUserController);//Obtener datos publicos de un usuarios
app.post('/login', loginController); //Login de usuarios
app.get('/user/info', authUser, getMeController); // Datos privados de un usuario logeado
app.put('/user/info', authUser, modifyUserController); //Modificar datos privados de usuario
app.get('/user/likes', authUser, getUserLikesController); //Info de likes de un usuario

app.get('/post/:id', getPostByIdController,); //Obtener un post por su id
app.post('/', authUser, newPostController); //Crear un post
app.get('/', getPostsController); //Obtener todos los posts
app.get('/:id', getPostsUserController); //Obtener todos los posts de un usuario 
app.get('/posts/imagenes/:texto', getImageByDescriptionController); //Obtener imagen por su descripcion
app.delete('/post/:id', authUser, deletePostController); ///eliminar un post (ese id es el del post)

app.post('/likes/:postId', authUser, likePostController); // Dar like a un post
app.delete('/likes/:postId', authUser, dislikeController); //Sacar like de un post
app.get('/likes/:postId', likesController); //Obtener info de los likes

app.post('/comments/:postId', authUser, createCommentController); //Comentar un post
app.delete('/comments/:commentId', authUser, deleteCommentController); //elimiar comentario de un post 




// Gestion de errores (middleware 404 y middleware gestor errores)

app.use((req, res) => {
    res.status(404).send({
        status: 'error',
        message: 'Not found',
    });
});


app.use((error, req, res, next) => {
    console.error(error);

    res.status(error.httpStatus || 500).send({
        status: 'error',
        message: error.message,
    });
});


// Lanzamos servidor 
app.listen(3002, () => {
    console.log('Servidor funcionando✔');
});

