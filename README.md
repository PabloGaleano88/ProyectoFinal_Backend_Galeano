# Entrega Proyecto Final - Backend
### Alumno: Pablo Galeano

### Profesor: Gonzalo Fernández

### Tutor: Martín Castagno

[![HTML 5](https://img.shields.io/badge/HTML_5-e34c26?style=for-the-badge&logo=html5&logoColor=white&labelColor=101010)]() [![CSS 3](https://img.shields.io/badge/CSS_3-264de4?style=for-the-badge&logo=css3&logoColor=white&labelColor=101010)]()[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white&labelColor=101010)]()[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white&labelColor=101010)]()[![MongoDB](https://img.shields.io/badge/handlebars-F26726?style=for-the-badge&logo=handlebars.js&logoColor=white&labelColor=101010)]()[![Passport](https://img.shields.io/badge/passport-34E27A?style=for-the-badge&logo=passport&logoColor=white&labelColor=101010)]()[![JSON WEB TOKEKS](https://img.shields.io/badge/JWT-f072ac?style=for-the-badge&logo=jsonwebtokens&logoColor=white&labelColor=101010)]()[![Railway](https://img.shields.io/badge/railway-490648?style=for-the-badge&logo=railway&logoColor=white&labelColor=101010)]()

------------------------------------------------------
#### Bibliotecas utilizadas

* Se debe realizar las siguientes instalaciones en caso de no disponer de las mismas en el equipo

#### Nodemon
```
npm install -g nodemon
```
### Express
```
npm install express
```
### Handlebars
```
npm install express-handlebars
```
### Socket io
```
npm install socket.io
```
### Multer
```
npm install multer
```
### Mongoose
```
npm install mongoose
```

### Mongoose Paginate
```
npm install mongoose-paginate-v2
```
### Connect-mongo
```
npm install connect-mongo 
```
### Session
```
npm install express-session 
```
### passport
```
npm install passport
```
### passport GitHub
```
npm install passport-github2
```
### passport-local
```
npm install passport-local
```
### Bcrypt
```
npm install bcrypt
```
### JSON Web Token
```
npm install jsonwebtoken
```
### Cookie Parser
```
npm install cookie-parser
```
### Passport JWT
```
npm install passport-jwt
```
### Dotenv
```
npm install dotenv
```
### Nodemailer

```
npm install nodemailer
```

### Faker
```
npm install @faker-js/faker
```
### Winston
```
npm install winston
```
### Swagger
```
npm install swagger-jsdoc swagger-ui-express
```
### Mocha
```
npm install -D mocha

```
### Chai
```
npm install -D chai
```
### Supertest
```
npm install -D supertest
```


##
* Para correr  la aplicación en modo desarrollador se debe escribir en la terminal:
```
npm run dev 
```
* Para correr  la aplicación en modo produccion se debe escribir en la terminal:
```
npm start
```

---
### Corriendo en Railway

[https://proyectofinalbackendgaleano-production.up.railway.app/login/](https://proyectofinalbackendgaleano-production.up.railway.app/login)

El proceso de logeo se puede realizar tanto desde Github como de forma local.
---
### Corriendo en localhost

Se esuchará por el puerto 8080, con lo cual se puede interactuar con la app a traves de los siguientes endpoints:

[http://localhost:8080/login/](http://localhost:8080/login)

[http://localhost:8080/mockingproducts/](http://localhost:8080/mockingproducts)

[http://localhost:8080/products/](http://localhost:8080/products) -> Si ingresa a acá pedirá Login

[http://localhost:8080/signup/](http://localhost:8080/signup)

[http://localhost:8080/api/products/](http://localhost:8080/api/products/)

[http://localhost:8080/api/carts/](http://localhost:8080/api/carts/)

[http://localhost:8080](http://localhost:8080) -> Se ven los productos en formato Json

[http://localhost:8080/realtimeproducts/](http://localhost:8080/realtimeproducts)  -> con websockets

[http://localhost:8080/chat/](http://localhost:8080/chat)


Tener en cuenta que para probar con el formulario en realtimeproducts se deben llenar todos los campos

---

### Realizar Test

#### Prueba de user/premium
1. Abrir Thunder Cliente y apuntar a la siguiente URL con PUT : http://localhost:8080/api/users/premium/65728905659928a8f4dd9057

el userid corresponde un usuario de la DB

no debería dejar cambiar el usuario a premium


2. Abrir Thunder Client y apuntar la URL a: http://localhost:8080/api/users/65728905659928a8f4dd9057/documents

3. En el tab Form ir a Files y colocar los campos:
* idDoc (*)
* addressDoc (*)
* accountStatus (*)
* profilePic

Subir las imagenes o archivos.

(*) Obligatorios para premium

4. Repetir el paso 1