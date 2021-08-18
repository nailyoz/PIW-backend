const controller = require("../controllers/posts")
const controllerAuth = require("../controllers/auth");

module.exports = function(app){
    app.use("/posts", controllerAuth.checar);

    app.get("/posts", controller.receberTodosPosts);
    
    app.get("/posts/:id", controller.buscarPostPorId);

    app.post("/posts", controller.inserirPost);

    app.delete("/posts/:id", controller.deletarPost);

    app.get("/posts/:id/comentarios", controller.buscarComentariosPorPost);


};

