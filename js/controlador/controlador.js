/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(pregunta, respuestas) {
      this.modelo.agregarPregunta(pregunta, respuestas);
  },
  borrarPregunta: function(id) {
    this.modelo.borrarPregunta(id);
  },
  borrarTodo: function() {
    this.modelo.borrarTodasLasPreguntas();
  },
  editarPregunta: function(id, nuevaPregunta) {
    this.modelo.editarPregunta(id,nuevaPregunta);
  },
  agregarVoto: function(idPregunta,respuestaSeleccionada){
    this.modelo.votarRespuesta(idPregunta, respuestaSeleccionada);
  },
};
