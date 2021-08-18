const viewU = require("../views/usuarios");

function render(post){
    return{
        id_post: post._id,
        id_usuario: viewU.render(post.id_usuario),
        texto: post.texto,
        likes: post.likes
    }   
   }
   module.exports.render = render;
   
   renderAll = function(posts){
       return posts.map(render);
   }
   module.exports.renderAll = renderAll;