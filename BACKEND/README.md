TÍTULO
App de fotos (clon de Instagram).

DESCRIPCIÓN
Implementar una API que permita publicar fotos (añadiendo o no textos) y que otras
personas puedan verlas.

USUARIOS ANÓNIMOS:
● Ver las últimas fotos publicadas por otros usuarios
● Ver el perfil de un usuario con su galería de fotos
● Buscar fotos (por su texto descriptivo)
● Login
● Registro

USUARIOS REGISTRADOS PUEDEN ADEMÁS:
● Hacer una publicación de una foto (la foto debe ajustarse automáticamente a un
tamaño máximo y unas proporciones establecidas por la plataforma). Y añadirle una
descripción.
● Hacer/Quitar un “like” a una foto
● Opcional:
○ Gestión del perfil (cambios en los datos de registro)
○ Comentar una foto (no se permiten comentarios a comentarios)

ENDPOINTS: 

post('/user', newUserController); //Crear usuarios
get('/user/info/:id', getUserController);//Obtener datos publicos de un usuarios
post('/login', loginController); //Login de usuarios
get('/user/info', authUser, getMeController); // Datos privados de un usuario logeado
put('/user/info', authUser, modifyUserController); //Modificar datos privados de usuario

get('/post/:id', getPostByIdController,); //Obtener un post por su id
post('/', authUser, newPostController); //Crear un post
get('/', getPostsController); //Obtener todos los posts
get('/:id', getPostsUserController); //Obtener todos los posts de un usuario 
get('/posts/imagenes/:texto', getImageByDescriptionController); //Obtener imagen por su descripcion
delete('/post/:id', authUser, deletePostController); ///eliminar un post (ese id es el del post)

post('/likes/:postId', authUser, likePostController); // Dar like a un post
delete('/likes/:postId', authUser, dislikeController); //Sacar like de un post
get('/likes/:postId', likesController); //Obtener info de los likes que tiene un post

post('/comments/:postId', authUser, createCommentController); //Comentar un post
delete('/comments/:commentId', authUser, deleteCommentController); //elimiar comentario de un post 



ENTIDADES: 

. User: 
id
email
password
nick
created_at


. Posts: 
id
image
text
created_at
user_id

. Likes: 
user_id
post_id
created_at

. Comments:
id
text
created_at
user_id
post_id


