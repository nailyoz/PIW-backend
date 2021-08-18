
const viewP = require('./posts');

function render(comentario){
    return{
        id_comentario: comentario._id,
        id_usuario: comentario.id_usuario,
        texto: comentario.texto,
        id_post: comentario.id_post,
    }   
   }
   module.exports.render = render;
   
   renderAll = function(comentarios){
       return comentarios.map(render);
   }
   module.exports.renderAll = renderAll;