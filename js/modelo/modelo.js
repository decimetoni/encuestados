/*
 * Modelo
 */

var Modelo = function() {
  this.preguntas = [];
  this.ultimoId = 0;
  this.cargarStorage();

 
  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaEliminada = new Evento(this);
  this.preguntaEditada = new Evento(this);
  this.todasBorradas = new Evento(this);
  this.votoAgregado = new Evento(this);
};

  Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function () {
    var id;
    var ultimoValorId = this.preguntas.length;
    ultimoValorId > 0 ? id = ultimoValorId : id = 0;
    return id;
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function (nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = {
      'textoPregunta': nombre,
      'id': id,
      'cantidadPorRespuesta': respuestas
    };
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },

  borrarPregunta: function (id) {
    //se filtar  y retorna las preguntas que no son iguales al id pasado por parametro
    this.preguntas = this.preguntas.filter((pregunta) => pregunta.id !== id);
    this.guardar();
    this.preguntaEliminada.notificar();
  },

  editarPregunta: function (id, nueva) {
    //se filtar  y retorna las preguntas que no son iguales al id pasado por parametro
    var pregunta = this.preguntas.find(pregunta => pregunta.id == id);
    pregunta.textoPregunta = nueva;
    this.guardar();
    this.preguntaEditada.notificar();

  },

  borrarTodo: function () {
    //borra el array de las preguntas
    this.preguntas = [];
    this.guardar();
    this.todasBorradas.notificar();
  },

  //se gardan las preguntas en el storage  
  guardar: function () {
    localStorage.setItem('preguntas', JSON.stringify(this.preguntas));
  },

  //se recuperan las preguntas del storage
  cargarStorage: function () {
  var preguntasEnStorage = JSON.parse(localStorage.getItem("preguntas"));
   if (preguntasEnStorage !== null) {
     this.preguntas = preguntasEnStorage; 
   }
  },

agregarVoto: function (nombrePregunta, respuestaSeleccionada) {
  var votadas = this.preguntas.find((pregunta) => pregunta.textoPregunta === nombrePregunta);
  var votada = votadas.cantidadPorRespuesta.find((votada) => votada.textoRespuesta === respuestaSeleccionada);
  votada.cantidad++;
  this.guardar();
  this.votoAgregado.notificar();
}
};