// ================= INICIO DEL SCRIPT =================
document.addEventListener("DOMContentLoaded", () => {

  // ================= MUSICA =================
  const music = document.getElementById("bgMusic");
  const volumeSlider = document.getElementById("volumeSlider");

  window.addEventListener("click", () => {
      if (music && music.paused) {
        music.volume = volumeSlider ? volumeSlider.value : 0.3;
        music.play().catch(e => console.log("Audio esperando interacción"));
      }
    }, { once: true }
  );

  if (volumeSlider && music) {
    volumeSlider.addEventListener("input", () => {
      music.volume = volumeSlider.value;
    });
  }

  // ================= VARIABLES =================
  const screens = document.querySelectorAll(".screen");
  let jugadores = [];
  let palabra = "";
  let impostorIndex = 0;
  let turno = 0;
  let palabraRevelada = false;
  let tiempo = 120;
  let intervalo = null;
  let votos = {};
  let votosRealizados = 0;

  let rondaActual = 1;
  const totalRondas = 3; 
  let puntuaciones = {}; 

  // ================= FUNCIONES GENERALES =================
  function mostrarPantalla(id) {
    screens.forEach(s => s.classList.remove("active"));
    document.getElementById(id).classList.add("active");
  }

  // ================= PANTALLAS INICIALES =================
  document.getElementById("btnContinuar").addEventListener("click", () => mostrarPantalla("inicio"));
  document.getElementById("btnJugar").addEventListener("click", () => mostrarPantalla("jugadores"));

  // ================= GESTIÓN DE JUGADORES =================
  const inputNombre = document.getElementById("nombreJugador");
  const listaJugadores = document.getElementById("listaJugadores");

  document.getElementById("btnAgregarJugador").addEventListener("click", () => {
    const nombre = inputNombre.value.trim();
    if (!nombre) return alert("Ingresa un nombre");
    if (jugadores.length >= 10) return alert("Máximo 10 jugadores");

    jugadores.push(nombre);
    puntuaciones[nombre] = 0; 
    inputNombre.value = "";
    renderJugadores();
  });

  function renderJugadores() {
    listaJugadores.innerHTML = "";
    jugadores.forEach((j, i) => {
      const li = document.createElement("li");
      li.textContent = j;
      const del = document.createElement("button");
      del.textContent = "❌";
      del.classList.add("btn-eliminar");
      del.onclick = () => {
        delete puntuaciones[jugadores[i]];
        jugadores.splice(i, 1);
        renderJugadores();
      };
      li.appendChild(del);
      listaJugadores.appendChild(li);
    });
  }

  document.getElementById("btnContinuarCategorias").addEventListener("click", () => {
    if (jugadores.length < 2) return alert("Mínimo 2 jugadores");
    mostrarPantalla("categorias");
  });

  // ================= LÓGICA DE RONDA =================
  document.getElementById("btnAsignarPalabras").addEventListener("click", () => {
    const categoria = document.getElementById("selectCategoria").value;
    if (!categoria) return alert("Selecciona una categoría");

    palabra = palabras[categoria][Math.floor(Math.random() * palabras[categoria].length)];
    impostorIndex = Math.floor(Math.random() * jugadores.length);
    turno = 0;

    mostrarPantalla("palabra");
    prepararTurno();
  });

  const turnoJugador = document.getElementById("turnoJugador");
  const palabraSecreta = document.getElementById("palabraSecreta");
  const btnSiguiente = document.getElementById("btnSiguienteJugador");

  function prepararTurno() {
    palabraRevelada = false;
    btnSiguiente.disabled = true;
    turnoJugador.textContent = `Turno de: ${jugadores[turno]} (Ronda ${rondaActual})`;
    palabraSecreta.textContent = "TOCA PARA VER";
    palabraSecreta.classList.add("blur");
  }

  palabraSecreta.onclick = () => {
    if (palabraRevelada) return;
    palabraSecreta.textContent = (turno === impostorIndex) ? "🕵️ IMPOSTOR" : `📖 ${palabra}`;
    palabraSecreta.classList.remove("blur");
    palabraRevelada = true;
    btnSiguiente.disabled = false;
  };

  btnSiguiente.onclick = () => {
    turno++;
    if (turno < jugadores.length) {
      prepararTurno();
    } else {
      mostrarPantalla("temporizador");
      iniciarTemporizador();
    }
  };

  function iniciarTemporizador() {
    clearInterval(intervalo);
    tiempo = 120;
    tiempoDiv.classList.remove("alerta");
    intervalo = setInterval(() => {
      tiempo--;
      const m = Math.floor(tiempo / 60);
      const s = tiempo % 60;
      tiempoDiv.textContent = `${m}:${s < 10 ? "0" : ""}${s}`;
      if (tiempo <= 10) tiempoDiv.classList.add("alerta");
      if (tiempo <= 0) {
        clearInterval(intervalo);
        prepararVotacion();
        mostrarPantalla("votacion");
      }
    }, 1000);
  }

  // ================= VOTACIÓN Y RESULTADOS =================
  const opcionesVoto = document.getElementById("opcionesVoto");
  const resultadoTexto = document.getElementById("resultadoTexto");

  function prepararVotacion() {
    opcionesVoto.innerHTML = "";
    votos = {};
    votosRealizados = 0;
    jugadores.forEach(j => {
      const btn = document.createElement("button");
      btn.textContent = j;
      btn.onclick = () => {
        votos[j] = (votos[j] || 0) + 1;
        votosRealizados++;
        btn.disabled = true;
        if (votosRealizados >= jugadores.length) mostrarResultado();
      };
      opcionesVoto.appendChild(btn);
    });
  }

  function mostrarResultado() {
    let maxVotos = 0;
    let eliminado = "";
    for (let j in votos) {
      if (votos[j] > maxVotos) { maxVotos = votos[j]; eliminado = j; }
    }

    let esCorrecto = jugadores.indexOf(eliminado) === impostorIndex;
    let nombreImpostor = jugadores[impostorIndex];
    let mensajeHTML = "";

    if (esCorrecto) {
      mensajeHTML = `<span style="color: #10b981; font-weight: bold;">¡LO LOGRARON!</span><br>Votaron por <b>${eliminado}</b> y era el impostor.`;
      jugadores.forEach(j => { if (jugadores.indexOf(j) !== impostorIndex) puntuaciones[j]++; });
    } else {
      mensajeHTML = `<span style="color: #ef4444; font-weight: bold;">¡EL IMPOSTOR GANÓ!</span><br>Votaron por <b>${eliminado}</b>, pero el real era <b style="color: #a78bfa;">${nombreImpostor}</b>.`;
      puntuaciones[nombreImpostor] += 2;
    }

    resultadoTexto.innerHTML = `
      <h3>Ronda ${rondaActual} Finalizada</h3>
      <div style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 10px; margin: 15px 0;">
        ${mensajeHTML}
      </div>
      <h4>Puntos:</h4>
      <ul style="list-style: none; padding: 0;">
        ${jugadores.map(j => `<li>${j}: ${puntuaciones[j]} pts</li>`).join('')}
      </ul>
      <div id="btnContenedor"></div>
    `;

    const btnContenedor = document.getElementById("btnContenedor");
    const btnAccion = document.createElement("button");
    btnAccion.classList.add("btn-principal");

    if (rondaActual < totalRondas) {
      btnAccion.textContent = "Siguiente Ronda";
      btnAccion.onclick = () => { rondaActual++; mostrarPantalla("categorias"); };
    } else {
      btnAccion.textContent = "Ver Ganador Final";
      btnAccion.onclick = mostrarGanadorFinal;
    }
    btnContenedor.appendChild(btnAccion);
    mostrarPantalla("resultado");
  }

  function mostrarGanadorFinal() {
    let ganador = "";
    let maxPuntos = -1;
    for (let j in puntuaciones) {
      if (puntuaciones[j] > maxPuntos) { maxPuntos = puntuaciones[j]; ganador = j; }
    }

    resultadoTexto.innerHTML = `
      <h2 style="color: #ffd700;">🏆 GANADOR FINAL 🏆</h2>
      <h1 style="font-size: 3rem;">${ganador}</h1>
      <p>Total: ${maxPuntos} puntos.</p>
      <button onclick="location.reload()" class="btn-principal">Reiniciar Juego</button>
    `;
  }
});