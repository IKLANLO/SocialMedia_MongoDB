# Proyecto Social Media

En éste proyecto se facilitan diversos endpoints para poder responder a las solicitudes realizadas a la base de datos desde el lado del cliente.

El proyecto consiste en una red social en la que se puedan manejar usuarios, posts, y comentarios y likes de esos posts.

## Badges

![Static Badge](https://img.shields.io/badge/node.js-green)
![Static Badge](https://img.shields.io/badge/Mongoose-8.0.4-red)
![Static Badge](https://img.shields.io/badge/Express-4.18.2-blue)

## Variables de entorno

Para ejecutar este proyecto, deberá agregar las siguientes variables de entorno a su archivo .env

`PORT`

`MONGO_URI`

`JWT_SECRET`

## Utilización

A continuación se detallan los endpoint disponibles, junto a su función y los datos requeridos al hacer la petición (en caso de que sean necesarios).

Se dividen en dos partes principales, '**socialmedia'(usuarios)** y '**posts**'. En cada endpoint hay que sustituir _PORT_ por el puerto que corresponda.

### socialmedia (usuarios)

- **POST => localhost:PORT/socialmedia**: crear un nuevo usuario. Obligatorio incluir por _body_ los campos _first_name_, _last_name_, _email_ y _password_.
- **GET => localhost:PORT/socialmedia**: obtener la lista de los usuarios. Opcional incluir una _query_ para añadir paginación (añadir al endpoint _?page=n&limit=m_, siendo _n_ la página en la que se presentan los datos, y _m_ el número de clientes que se presentan en esa página).
- **POST => localhost:PORT/socialmedia/login**: iniciar la sesión de un usuario para poder hacer ciertas operaciones propias de cada usuario. Obligario incluir en el _body_ el email.
- **DELETE => localhost:PORT/socialmedia/logout**: cerrar la sesión de un usuario. Obligatorio incluir en _headers_ el token de inicio de sesión del usuario a desloguear.
- **GET => localhost:PORT/socialmedia/alldata**: obtener la lista de usuarios justo a datos personales, posts, comentarios y likes.

### posts

- **POST => localhost:PORT/posts**: crear un nuevo post. Obligario incluir por _body_ los campos _name_ y _post_. También necesario incluir en _headers_ el token del usuario logueado que quiera crearlo.
- **PUT => localhost:PORT/posts/update/'\_id'**: modificar un post existente. Obligatorio incluir por _body_ alguno de los campos a modificar (_name_ o _post_). Además debe incluirse por _headers_ el token del usuario logueado, debiendo ser el autor del post. En _'id'_ debe indicarse el nº de id del post a modificar.
- **DELETE => localhost:PORT/posts/delete/'\_id'**: eliminar un post existente. Obligario incluir por _headers_ el token del usuario logueado, debiendo ser el autor del post. En _'id'_ debe indicarse el nº de id del post a modificar.
- **GET => localhost:PORT/posts/id/'\_id'**: obtener los datos de un post por su id. En _'id'_ debe indicarse el nº de id del post.
- **GET => localhost:PORT/posts/name/'\_name'**: obtener los datos de un post por su nombre. En _'name'_ debe indicarse el nombre del post.
- **PUT => localhost:PORT/posts/comments/'\_id'**: añadir un comentario a un post existente. Obligario incluir por _headers_ el token del usuario logueado. Además debe incluirse por _body_ el campo _'comment'_ con el comentario a incluir. En _'id'_ debe indicarse el nº de id del post al que se añade el comentario.
- **PUT => localhost:PORT/posts/likes/'\_id'**: añadir un like a un post existente. Obligario incluir por _headers_ el token del usuario logueado. En _'id'_ debe indicarse el nº de id del post al que se le da el like. También añade el _id_ del post al campo wishList del usuario que dio el like.
- **PUT => localhost:PORT/posts/likes/delete/'\_id'**: borrar un like a un post existente. Obligario incluir por _headers_ el token del usuario logueado que dio el like. En _'id'_ debe indicarse el nº de id del post al que se le borra el like. También borra el _id_ del post al campo wishList del usuario que dio el like.
