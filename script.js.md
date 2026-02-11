``` pyhton
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>🔍 El Impostor</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <!-- ================= MUSICA ================= -->
  <audio id="bgMusic" loop>
    <source src="musica.mp3" type="audio/mpeg">
    Tu navegador no soporta audio.
  </audio>

  <!-- ================= CONTROL DE VOLUMEN ================= -->
  <div id="volumeControl">
    <span>🔊</span>
    <input type="range" id="volumeSlider" min="0" max="1" step="0.01" value="0.3">
  </div>

  <!-- ================= AGRADECIMIENTOS ================= -->
  <section id="agradecimientos" class="screen active">
    <h1>AGRADECIMIENTOS</h1>

    <p><strong>👩‍💻 Desarrollador:</strong><br>Gabriela Lopez</p>
    <p><strong>🎹 Música:</strong><br>Victor Zerpa</p>
    <p><strong>🎨 Arte y Animación:</strong><br>
      Arianna Escalona<br>
      Elian Garcia
    </p>

    <p class="thanks">
      Agradecimientos especiales 🥺 al Profesor
      <strong>Gabriel Baute</strong>
      por guiarnos en el desarrollo de este proyecto 🤠🤞
    </p>

    <button id="btnContinuar">Continuar</button>
  </section>

  <!-- ================= INICIO ================= -->
  <section id="inicio" class="screen">
    <h1>🔍 EL IMPOSTOR 🕵️</h1>
    <button id="btnJugar">Jugar</button>
  </section>

  <!-- ================= JUGADORES ================= -->
  <section id="jugadores" class="screen">
    <h2>Jugadores (2 a 10)</h2>

    <input
      type="text"
      id="nombreJugador"
      placeholder="Nombre del jugador"
      autocomplete="off"
    >

    <button id="btnAgregarJugador">Agregar</button>

    <ul id="listaJugadores"></ul>

    <button id="btnContinuarCategorias">Continuar</button>
  </section>

  <!-- ================= CATEGORIAS ================= -->
  <section id="categorias" class="screen">
    <h2>Selecciona una categoría</h2>

    <select id="selectCategoria">
      <option value="">-- Selecciona --</option>
      <option value="comida">Comida</option>
      <option value="lugares">Lugares</option>
      <option value="animales">Animales</option>
    </select>

    <br><br>

    <button id="btnAsignarPalabras">Asignar Palabras</button>
  </section>

  <!-- ================= PALABRA ================= -->
  <section id="palabra" class="screen">
    <h2 id="turnoJugador"></h2>

    <div id="palabraSecreta" class="blur">
      TOCA PARA VER
    </div>

    <p class="hint">
      No dejes que otros vean la pantalla
    </p>

    <button id="btnSiguienteJugador">Siguiente</button>
  </section>

  <!-- ================= TEMPORIZADOR ================= -->
  <section id="temporizador" class="screen">
    <h2>Tiempo para jugar</h2>
    <div id="tiempo">2:00</div>
    <p>Digan una palabra relacionada</p>
  </section>

  <!-- ================= VOTACION ================= -->
  <section id="votacion" class="screen">
    <h2>Votación</h2>
    <p>¿Quién es el impostor?</p>

    <div id="opcionesVoto"></div>
  </section>

  <!-- ================= RESULTADO ================= -->
  <section id="resultado" class="screen">
    <h2 id="resultadoTexto"></h2>
    <button onclick="location.reload()">Jugar de nuevo</button>
  </section>

  <!-- ================= SCRIPTS ================= -->
  <script src="palabras.js"></script>
  <script src="script.js"></script>

</body>
</html>
```
