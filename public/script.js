// ================= SCRIPT MEJORADO Y CORREGIDO =================
document.addEventListener("DOMContentLoaded", () => {

  // === REFERENCIAS A ELEMENTOS ===
  const music = document.getElementById("bgMusic");
  const volumeSlider = document.getElementById("volumeSlider");
  const screens = document.querySelectorAll(".screen");
  const tiempoDiv = document.getElementById("tiempo");

  // === VARIABLES DE JUEGO (GLOBALES) ===
  window.jugadores = []; 
  window.puntuaciones = {}; 
  let palabra = "", impostorIndex = 0, turno = 0;
  let tiempo = 120, intervalo = null, votos = {}, votosRealizados = 0;
  let rondaActual = 1;
  const totalRondas = 3;

  // === FUNCIONES DE NAVEGACIÓN (GLOBAL PARA EL HTML) ===
  window.mostrarPantalla = (id) => {
    screens.forEach(s => s.classList.remove("active"));
    const target = document.getElementById(id);
    if (target) {
      target.classList.add("active");
    } else {
      console.error("La pantalla con ID '" + id + "' no existe.");
    }
  };

  // === CONTROL DE MÚSICA ===
  const playMusic = () => {
    if (music && music.paused) {
      music.volume = volumeSlider ? volumeSlider.value : 0.3;
      music.play().catch(e => console.log("Esperando interacción para audio"));
    }
  };

  window.addEventListener("click", playMusic, { once: true });

  if (volumeSlider && music) {
    volumeSlider.addEventListener("input", () => { music.volume = volumeSlider.value; });
  }

  // === ASIGNACIÓN DE EVENTOS A BOTONES ===
  
  // 1. Agradecimientos -> Inicio (Si el ID existe)
  const btnCont = document.getElementById("btnContinuar");
  if(btnCont) btnCont.onclick = () => mostrarPantalla("inicio");

  // 2. Inicio -> Jugadores
  const btnJugar = document.getElementById("btnJugar");
  if(btnJugar) {
    btnJugar.onclick = () => {
      renderJugadores();
      mostrarPantalla("jugadores");
    };
  }

  // === GESTIÓN DEL MENÚ ONLINE (DROPDOWN) ===
  const btnMenuOnline = document.getElementById("btnMenuOnline");
  const menuOnlineContent = document.getElementById("menuOnlineContent");
  
  if (btnMenuOnline && menuOnlineContent) {
    btnMenuOnline.onclick = (e) => {
      e.stopPropagation();
      menuOnlineContent.classList.toggle("show");
    };
  }

  // Cerrar el menú si se hace clic fuera
  window.addEventListener("click", () => {
    if (menuOnlineContent) menuOnlineContent.classList.remove("show");
  });

  // === GESTIÓN DE JUGADORES (PANTALLA LIMPIA) ===
  const inputNombre = document.getElementById("nombreJugador");
  const listaJugadoresUI = document.getElementById("listaJugadores");

  document.getElementById("btnAgregarJugador").onclick = () => {
    const nombre = inputNombre.value.trim();
    if (!nombre) return alert("Ingresa un nombre");
    if (jugadores.length >= 10) return alert("Máximo 10 jugadores");

    jugadores.push(nombre);
    puntuaciones[nombre] = 0; 
    inputNombre.value = "";
    renderJugadores();
  };

  window.renderJugadores = () => {
    if(!listaJugadoresUI) return;
    listaJugadoresUI.innerHTML = "";
    jugadores.forEach((j, i) => {
      const li = document.createElement("li");
      li.innerHTML = `${j} <button class="btn-eliminar" onclick="eliminarJugadorLocal(${i})">❌</button>`;
      listaJugadoresUI.appendChild(li);
    });
  };

  window.eliminarJugadorLocal = (i) => {
    const nombre = jugadores[i];
    delete puntuaciones[nombre];
    jugadores.splice(i, 1);
    renderJugadores();
  };

  document.getElementById("btnContinuarCategorias").onclick = () => {
    if (jugadores.length < 3) return alert("Se necesitan al menos 3 jugadores");
    mostrarPantalla("categorias");
  };

  // === LÓGICA DE PARTIDA (PALABRAS Y TURNOS) ===
  document.getElementById("btnAsignarPalabras").onclick = () => {
    const categoria = document.getElementById("selectCategoria").value;
    if (!categoria) return alert("Selecciona una categoría");

    if (typeof palabras === 'undefined') return alert("Error: No se encontró palabras.js");

    palabra = palabras[categoria][Math.floor(Math.random() * palabras[categoria].length)];
    impostorIndex = Math.floor(Math.random() * jugadores.length);
    turno = 0;

    mostrarPantalla("palabra");
    prepararTurno();
  };

  const turnoJugador = document.getElementById("turnoJugador");
  const palabraSecreta = document.getElementById("palabraSecreta");
  const btnSiguiente = document.getElementById("btnSiguienteJugador");

  function prepararTurno() {
    btnSiguiente.disabled = true;
    turnoJugador.textContent = `Turno de: ${jugadores[turno]}`;
    palabraSecreta.textContent = "TOCA PARA VER";
    palabraSecreta.classList.add("blur");
  }

  palabraSecreta.onclick = () => {
    palabraSecreta.textContent = (turno === impostorIndex) ? "🕵️ IMPOSTOR" : `📖 ${palabra}`;
    palabraSecreta.classList.remove("blur");
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

  // === TEMPORIZADOR Y VOTACIÓN ===
  function iniciarTemporizador() {
    clearInterval(intervalo);
    tiempo = 120;
    tiempoDiv.classList.remove("alerta");
    intervalo = setInterval(() => {
      tiempo--;
      let m = Math.floor(tiempo / 60), s = tiempo % 60;
      tiempoDiv.textContent = `${m}:${s < 10 ? "0" : ""}${s}`;
      if (tiempo <= 10) tiempoDiv.classList.add("alerta");
      if (tiempo <= 0) {
        clearInterval(intervalo);
        prepararVotacion();
        mostrarPantalla("votacion");
      }
    }, 1000);
  }

  function prepararVotacion() {
    const opcionesVoto = document.getElementById("opcionesVoto");
    opcionesVoto.innerHTML = "";
    votos = {};
    votosRealizados = 0;

    const contadorVotos = document.createElement("p");
    contadorVotos.textContent = `Votos: 0 / ${jugadores.length}`;
    opcionesVoto.appendChild(contadorVotos);
    
    jugadores.forEach(j => {
      const btn = document.createElement("button");
      btn.textContent = j;
      btn.onclick = () => {
        votos[j] = (votos[j] || 0) + 1;
        votosRealizados++;
        btn.disabled = true;
        btn.style.opacity = "0.5";
        contadorVotos.textContent = `Votos: ${votosRealizados} / ${jugadores.length}`;

        if (votosRealizados >= jugadores.length) {
          setTimeout(() => mostrarResultado(), 800);
        }
      };
      opcionesVoto.appendChild(btn);
    });
  }

  function mostrarResultado() {
    let maxVotos = 0, eliminado = "";
    for (let j in votos) {
      if (votos[j] > maxVotos) { maxVotos = votos[j]; eliminado = j; }
    }

    const esCorrecto = (jugadores.indexOf(eliminado) === impostorIndex);
    const nombreImpostor = jugadores[impostorIndex];

    if (esCorrecto) {
      jugadores.forEach(j => { if (j !== nombreImpostor) puntuaciones[j]++; });
      if(typeof confetti === 'function') confetti(); 
    } else {
      puntuaciones[nombreImpostor] += 2;
    }

    document.getElementById("resultadoTexto").innerHTML = `
      <h3>Ronda ${rondaActual} de ${totalRondas}</h3>
      <p>${esCorrecto ? "¡Atraparon al Impostor!" : "¡El Impostor escapó!"}</p>
      <p>Era: <b>${nombreImpostor}</b></p>
      <button onclick="rondaActual++; mostrarPantalla('categorias')">Siguiente</button>
    `;
    mostrarPantalla("resultado");
  }
});