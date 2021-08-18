const Post = require('../models/post');
const viewP = require('../views/posts');
const Comentario = require('../models/comentario');
const viewC = require('../views/comentarios');
const jwt = require('jsonwebtoken');

module.exports.inserirPost = function(req,res){
    let token = req.headers.token;
    let payload = jwt.decode(token);
    let id_usuario_logado = payload.id;
    let texto = req.body.texto;
    let likes = req.body.likes;
    
    let promise = Post.create({id_usuario: id_usuario_logado, texto:texto, likes: likes});

    promise.then(
        function(post){ 
            res.status(201).json(viewP.render(post));
        }
    ).catch(
        function(error){
            res.status(500).json(error);
        }
    )
};

module.exports.receberTodosPosts = function(req, res){
    let promise = Post.find().populate('id_post').exec();
    promise.then(
        function(posts){
           res.status(200).json(viewP.renderAll(posts));
        }
    ).catch(
       function(error){
           res.status(500).json(error);

       }
)
};

module.exports.buscarPostPorId = function(req,res){
    let id = req.params.id;
    let promisse = Post.findById(id).exec();
    promisse.then(
        function(post){
            res.status(201).json(viewP.render(post));
        }
    ).catch(
        function(error){
            res.status(400).json(error);
        }
    )
}; 

module.exports.deletarPost = function(req,res){
    let id_post = req.params.id;
    let token = req.headers.token;
    let payload = jwt.decode(token);
    let id_usuario_logado = payload.id;


    let find = Post.findById(id_post).exec();
    find.then(
        function(post){
               if(id_usuario_logado==post.id_usuario){
                   promise = Post.deleteOne(post);
                   promise.then(
                       function(postB){
                          res.status(200).json(viewP.render(post)); 
                       }
                   ).catch(
                       function(error){
                          res.status(500).json(error);
                       }
                   );
               }else{
                   res.status(401).json("Token inválido");
               }
        }
    ).catch(
        function(error){
            res.status(400).json(error);
        }
        
    );
   
};

module.exports.buscarComentariosPorPost = function(req,res){
    let id = req.params.id;
    let promise = Comentario.find({id_post:id});

    promise.then(
        function(comentarios){
            res.status(200).json(viewC.renderAll(comentarios));
        }
    ).catch(
        function(error){
            res.status(500).json(error);
        }
    )

};

