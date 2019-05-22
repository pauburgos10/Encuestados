/*
 * Vista administrador
 */
var VistaAdministrador = function(modelo, controlador, elementos) {
  this.modelo = modelo;
  this.controlador = controlador;
  this.elementos = elementos;
  var contexto = this;

  // suscripción de observadores
  this.modelo.preguntaAgregada.suscribir(function() {
    contexto.reconstruirLista();
  });
  this.modelo.preguntaBorrada.suscribir(function() {
    contexto.reconstruirLista();
  });
  this.modelo.preguntaEditada.suscribir(function() {
    contexto.reconstruirLista();
  });
};


VistaAdministrador.prototype = {
  //lista
  inicializar: function() {
    //llamar a los metodos para reconstruir la lista, configurar botones y validar formularios
    validacionDeFormulario();
    this.reconstruirLista();
    this.configuracionDeBotones();
  },

  construirElementoPregunta: function(pregunta){
    var contexto = this;
    var nuevoItem = $("<li></li>").addClass('list-group-item');
    nuevoItem.attr('id', pregunta.id);    
    nuevoItem.attr('text' , pregunta.textoPregunta);
    //completar
    //asignar a nuevoitem un elemento li con clase "list-group-item", id "pregunta.id" y texto "pregunta.textoPregunta"
    var interiorItem = $('.d-flex');
    var titulo = interiorItem.find('h5');    
    titulo.text(pregunta.textoPregunta);
    
    //console.log('respuestas'  + pregunta.cantidadPorRespuesta);
    interiorItem.find('small').text(pregunta.cantidadPorRespuesta.map(function(resp){
        return " " + resp.textoRespuesta;
    }));
    nuevoItem.html($('.d-flex').html());
    return nuevoItem;
  },

  reconstruirLista: function() {
    var lista = this.elementos.lista;
    lista.html('');
    var preguntas = this.modelo.preguntas;
    for (var i=0;i<preguntas.length;++i){
      lista.append(this.construirElementoPregunta(preguntas[i]));
    }
  },

  configuracionDeBotones: function(){
    var e = this.elementos;
    var contexto = this;

    //asociacion de eventos a boton
    e.botonAgregarPregunta.click(function() {
      var value = e.pregunta.val();
      var respuestas = [];

      $('[name="option[]"]').each(function() {
        //completar
        if($(this).val().trim().length > 0){
          var resp = respuestas.find(respuesta => respuesta.textoRespuesta == $(this).val().trim());
          if(resp == null){
            respuestas.push({'textoRespuesta': $(this).val().trim(), 'cantidad':0});
          }
        }
      })
      contexto.limpiarFormulario();      
      contexto.controlador.agregarPregunta(value, respuestas);
    });

    e.botonBorrarPregunta.click(function(){
      var elemento = $('.list-group-item.active');
      if (elemento.length > 0) {
        var id = parseInt($('.list-group-item.active').attr('id'));
        contexto.controlador.borrarPregunta(id);
      } else {
        alert('Seleccione la pregunta que desea borrar');
      }
    });

    e.borrarTodo.click(function(){
      contexto.controlador.borrarTodo();
    });

    e.botonEditarPregunta.click(function(){
      var elemento = $('.list-group-item.active');
      if (elemento.length > 0) {
        var id = parseInt(elemento.attr('id'));
        var nuevaPregunta = prompt('Cambiar Pregunta por: ');
        contexto.controlador.editarPregunta(id, nuevaPregunta);
      } else {
        alert("Seleccione la pregunta que desea editar");
      }     
    });
    //asociar el resto de los botones a eventos
  },

  limpiarFormulario: function(){
    $('.form-group.answer.has-feedback.has-success').remove();
  },

};
