var Usuario = require('../models/usuario');
const view = require('../views/usuarios');
const Post = require('../models/post');
const viewP = require('../views/posts');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.inserirUsuario = function(req, res){
    let usuario = {
        nome: req.body.nome,
        email: req.body.email,
        senha: bcrypt.hashSync(req.body.senha, 10),
    }
    let promise = Usuario.create(usuario)
    promise.then(
        function(usuario) {
            res.status(201).json(view.render(usuario));
        }
    ).catch(
        function(error){
            res.status(400).json(error);
        }
   );
};

module.exports.receberTodosUsuarios = function(req, res){
    let promise = Usuario.find().populate('id_usuario').exec();
    promise.then(
        function(usuarios){
           res.status(200).json(view.renderAll(usuarios));
        }
    ).catch(
       function(error){
           res.status(500).json(error);
       }
)
};


module.exports.buscarUsuarioPorId = function(req,res){
    let id = req.params.id;
    let promise = Usuario.findById(id).exec();
    promise.then(
        function(usuario){
            res.status(200).json(view.render(usuario));
        }
    ).catch(
        function(error){
            res.status(500).json(error)
        }
    )

};

module.exports.deletarUsuario = function(req,res){
    let id_usuario = req.params.id;
    let token = req.headers.token;
    let payload = jwt.decode(token);
    let id_usuario_logado = payload.id;


    if(id_usuario_logado==id_usuario){
        promise = Usuario.findByIdAndDelete(id_usuario);                                                                                                                 
        promise.then(
            function(usuario){
                res.status(200).json("usuário de id "+id_usuario+" removido");
            }
        ).catch(
            function(error){
                res.status(500).json(error);
                console.log(error);
            }
        );
    }else{
        res.status(401).json("Token inválido");
    }

};

module.exports.buscarPostsUsuario = function(req,res){
    let id = req.params.id;
    let promise = Post.find({id_usuario:id});

    promise.then(
        function(posts){
            res.status(200).json(viewP.renderAll(posts));
        }
    ).catch(
        function(error){
            res.status(500).json(error)
            console.log(error)
        }
    )

};
