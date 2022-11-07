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
    getLoggedUserController
} = require('./controllers/users');


const {
    newPostController,
    getPostsController,
    deletePostController,
    getPostsUserController,
    getImageByIdController,
    getImageByDescriptionController,
} = require('./controllers/posts');

const {
    createCommentController,
    deleteCommentController
} = require('./controllers/comments');

const {
    likePostController,
    dislikeController,
} = require('./controllers/likes'); 



const { authUser } = require('./middlewares/auth');

const app = express();

app.use(fileUpload());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/uploads', express.static('./uploads')); 


//Rutas 

app.post('/user', newUserController); //Crear Usuarios
app.get('/user/info/:id', getUserController);//Obtener datos de usuarios
app.post('/login', loginController); //Login de usuarios
app.put('/user/info/', authUser, modifyUserController) //Modificar usuarios
app.get('/user/info/', authUser, getLoggedUserController); //Obtiene datos del usuario logueado
app.get('/post/:id', getImageByIdController,) //Obtener imagen por ID
app.post('/', authUser, newPostController); //Craer un post
app.get('/', getPostsController); //Obtener posts
app.get('/:id', getPostsUserController); //Obtener los posts de un usuario
app.get('/posts/imagenes/:?', getImageByDescriptionController); //Obtener imagen por su descripcion

app.post('/:postId/likes', authUser, likePostController); // Dar like a un post
app.delete('/:postId/likes', authUser, dislikeController); //Sacar like

app.post('/comments/:postId', authUser, createCommentController); //Comentar un post
app.delete('/comments/:postId', authUser, deleteCommentController); //Borrar Comentario

app.delete('/post/:id',authUser, deletePostController); //Borrar un post


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
app.listen(3000, () => {
    console.log('Servidor funcionando✔');
});
