function render(usuario){
 return{
     id_usuario: usuario._id,
     nome: usuario.nome,
     email: usuario.email,
 }   
};
module.exports.render = render;

renderAll = function(usuarios){
    return usuarios.map(render);
}
module.exports.renderAll = renderAll;