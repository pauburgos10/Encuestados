/*
 * Modelo
 */
var Modelo = function() {
  this.preguntasGuardadas = JSON.parse(localStorage.getItem('preguntas'));
  if (this.preguntasGuardadas !== null) {
    this.preguntas = this.preguntasGuardadas;
  } else {
    this.preguntas = [];
  }  
  this.ultimoId = 0;
  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaBorrada = new Evento(this);
  this.preguntaEditada = new Evento(this);
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
    //completar 
    var ids = this.preguntas.map(pregunta => pregunta.id);
    return Math.max(0,...ids);
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    //console.log('nueva pregunta '+ nuevaPregunta)
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },

  borrarPregunta: function(id) {
    var borrar = this.encontrarPreguntaPorId(id);
    if (borrar != null){
      this.preguntas.splice(this.preguntas.indexOf(borrar),1);
    }
    this.guardar();
    this.preguntaBorrada.notificar();
  },

  editarPregunta: function(id, nuevaPregunta) {
    var editar = this.encontrarPreguntaPorId(id);
    if (editar != null){
      editar.textoPregunta = nuevaPregunta;
    }
    this.guardar();
    this.preguntaEditada.notificar();    
  },

  votarRespuesta: function(id, respuesta){
    var votada = this.encontrarPreguntaPorId(id);
    var respuestaVotar = votada.cantidadPorRespuesta.find(resp => resp.textoRespuesta == respuesta);
    respuestaVotar.cantidad ++;
    this.guardar();
  },

  borrarTodasLasPreguntas: function(){
    this.preguntas = [];
    this.guardar();
    this.preguntaBorrada.notificar();
  },

  //se guardan las preguntas
  guardar: function(){
    localStorage.setItem('preguntas',JSON.stringify(this.preguntas));
  },

  encontrarPreguntaPorId: function(id){
    return this.preguntas.find(pregunta =>  pregunta.id == id);
  }
};
