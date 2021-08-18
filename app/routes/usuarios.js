const controller = require("../controllers/usuarios")
const controllerAuth = require("../controllers/auth");

module.exports = function(app){

    app.post("/usuarios/signin", controllerAuth.logar);

    app.post("/usuarios", controller.inserirUsuario);

    app.use("/usuarios", controllerAuth.checar);

    app.get("/usuarios", controller.receberTodosUsuarios);
    
    app.get("/usuarios/:id", controller.buscarUsuarioPorId);

    app.delete("/usuarios/:id", controller.deletarUsuario);

    app.get("/usuarios/:id/posts", controller.buscarPostsUsuario);
};

