const controller = require("../controllers/comentarios")
const controllerAuth = require("../controllers/auth");

module.exports = function(app){
    app.use("/comentarios", controllerAuth.checar);
    
    app.get("/comentarios", controller.receberTodosComentarios);
  
    app.get("/comentarios/:id", controller.buscarComentarioPorId);

    app.post("/comentarios", controller.inserirComentario);

    app.delete("/comentarios/:id", controller.deletarComentario);

};
