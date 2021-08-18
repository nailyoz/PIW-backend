var Comentario = require('../models/comentario');
const viewC =require("../views/comentarios");
const jwt = require("jsonwebtoken");
const comentario = require('../models/comentario');


module.exports.inserirComentario = function(req, res){
    let id_post = req.body.id_post;
    let token = req.headers.token;
    let payload = jwt.decode(token);
    let texto = req.body.texto;
    let id_usuario_logado = payload.id;

    let promise = Comentario.create({id_post: id_post, id_usuario:id_usuario_logado, texto:texto});
    promise.then(
        function(comentario) {
            res.status(201).json(viewC.render(comentario));
        }
    ).catch(
        function(error){
            console.log(error);
        }
     );
};
module.exports.receberTodosComentarios = function(req, res){
  
    let promise = Comentario.find().populate('id_comentario').exec();
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

module.exports.buscarComentarioPorId = function(req,res){
    let id = req.params.id;
    let promise = Comentario.findById(id).exec();
    promise.then(
        function(comentario){
            res.status(200).json(viewC.render(comentario));
        }
    ).catch(
        function(error){
            res.status(500).json(error)
        }
    )

};

module.exports.deletarComentario = function(req,res){
    let id_comentario = req.params.id;
    let token = req.headers.token;
    let payload = jwt.decode(token);
    let id_usuario_logado = payload.id;


    let find = Comentario.findById(id_comentario).exec();
    find.then(
        function(comentario){
               if(id_usuario_logado==comentario.id_usuario){
                   promise = Comentario.deleteOne(comentario);
                   promise.then(
                       function(comentarioB){
                          res.status(200).json(viewC.render(comentario)); 
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

