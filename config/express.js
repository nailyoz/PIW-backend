const bodyParser = require("body-parser");
const express = require('express');
const routesUsuarios = require("../app/routes/usuarios")
const routesPosts = require("../app/routes/posts")
const routesComentarios = require("../app/routes/comentarios")


module.exports = function() {
   let app = express();
   app.set("port", 8070);
   
   app.use(express.static('./public'));
   app.use(bodyParser.json());
   app.use(bodyParser.urlencoded({ extended: false}))

   routesPosts(app);
   routesUsuarios(app);   
   routesComentarios(app);
   return app;
};


