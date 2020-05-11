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

  editarPregunta: function(id, editada) {
    this.modelo.editarPregunta(id, editada);
  },

  borrarTodo: function () {
    this.modelo.borrarTodo();
  },

  agregarVoto: function (nombrePregunta, respuestaSeleccionada) {
    this.modelo.agregarVoto(nombrePregunta, respuestaSeleccionada);
  },
};