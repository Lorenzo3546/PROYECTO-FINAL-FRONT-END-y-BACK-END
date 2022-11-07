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
USERS
. POST /user       Registro de usuario ✅
. GET /user/:id    Devuelve info de un usuario ✅
. POST /login      Login de usuario ✅
. PUT /user/  Gestion del perfil(cambios en los datos de registro) ✅

POSTS

. POST /           Subir una foto con descripcion (solo usuarios registrados) ✅
. GET /            Lista de todas las fotos (ordenadas por fecha de publicacion) ✅
. GET /post/:id    Ver perfil de usuario con su galeria de fotos ✅
. GET /post/text/:text   Buscar una foto por su descripcion ✅

. GET /likes       Hacer/quitar likes a una foto ✅

. POST /comments  Comentar una foto (OPCIONAL)✅


ENTIDADES: 

. User: 
id
email
password
created_at
avatar
public_profile

. Posts: 
id
image
text
caption ¿?
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
