``` pyhton
// ================= INICIO DEL SCRIPT =================
document.addEventListener("DOMContentLoaded", () => {

  // ================= MUSICA =================
  const music = document.getElementById("bgMusic");
  const volumeSlider = document.getElementById("volumeSlider");

  // Iniciar música al primer click (requerido por el navegador)
  window.addEventListener(
    "click",
    () => {
      if (music && music.paused) {
        music.volume = volumeSlider ? volumeSlider.value : 0.3;
        music.play();
      }
    },
    { once: true }
  );

  // Control visual de volumen
  if (volumeSlider && music) {
    music.volume = volumeSlider.value;

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
  let yaVoto = false;

  // ================= FUNCIONES GENERALES =================
  function mostrarPantalla(id) {
    screens.forEach(s => s.classList.remove("active"));
    document.getElementById(id).classList.add("active");
  }

  // ================= AGRADECIMIENTOS =================
  document.getElementById("btnContinuar").addEventListener("click", () => {
    mostrarPantalla("inicio");
  });

  // ================= INICIO =================
  document.getElementById("btnJugar").addEventListener("click", () => {
    mostrarPantalla("jugadores");
  });

  // ================= JUGADORES =================
  const inputNombre = document.getElementById("nombreJugador");
  const listaJugadores = document.getElementById("listaJugadores");

  document.getElementById("btnAgregarJugador").addEventListener("click", () => {
    const nombre = inputNombre.value.trim();
    if (!nombre) return alert("Ingresa un nombre");
    if (jugadores.length >= 10) return alert("Máximo 10 jugadores");

    jugadores.push(nombre);
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

  // ================= CATEGORIAS =================
  document.getElementById("btnAsignarPalabras").addEventListener("click", () => {
    const categoria = document.getElementById("selectCategoria").value;
    if (!categoria) return alert("Selecciona una categoría");

    palabra = palabras[categoria][
      Math.floor(Math.random() * palabras[categoria].length)
    ];

    impostorIndex = Math.floor(Math.random() * jugadores.length);
    turno = 0;

    mostrarPantalla("palabra");
    prepararTurno();
  });

  // ================= PALABRA =================
  const turnoJugador = document.getElementById("turnoJugador");
  const palabraSecreta = document.getElementById("palabraSecreta");
  const btnSiguiente = document.getElementById("btnSiguienteJugador");

  function prepararTurno() {
    palabraRevelada = false;
    btnSiguiente.disabled = true;

    turnoJugador.textContent = `Turno de: ${jugadores[turno]}`;
    palabraSecreta.textContent = "TOCA PARA VER";
    palabraSecreta.classList.add("blur");
  }

  palabraSecreta.onclick = () => {
    if (palabraRevelada) return;

    palabraSecreta.textContent =
      turno === impostorIndex ? "IMPOSTOR" : palabra;

    palabraSecreta.classList.remove("blur");
    palabraRevelada = true;
    btnSiguiente.disabled = false;
  };

  btnSiguiente.onclick = () => {
    if (!palabraRevelada) return;

    turno++;

    if (turno < jugadores.length) {
      prepararTurno();
    } else {
      mostrarPantalla("temporizador");
      iniciarTemporizador();
    }
  };

  // ================= TEMPORIZADOR =================
  const tiempoDiv = document.getElementById("tiempo");

  function iniciarTemporizador() {
    clearInterval(intervalo);
    tiempo = 120;
    tiempoDiv.textContent = "2:00";

    intervalo = setInterval(() => {
      tiempo--;

      const m = Math.floor(tiempo / 60);
      const s = tiempo % 60;
      tiempoDiv.textContent = `${m}:${s < 10 ? "0" : ""}${s}`;

      if (tiempo <= 0) {
        clearInterval(intervalo);
        prepararVotacion();
        mostrarPantalla("votacion");
      }
    }, 1000);
  }

  // ================= VOTACIÓN =================
  const opcionesVoto = document.getElementById("opcionesVoto");

  function prepararVotacion() {
    opcionesVoto.innerHTML = "";
    votos = {};
    yaVoto = false;

    jugadores.forEach(jugador => {
      const btn = document.createElement("button");
      btn.textContent = jugador;

      btn.onclick = () => {
        if (yaVoto) return;
        votos[jugador] = (votos[jugador] || 0) + 1;
        yaVoto = true;
        mostrarResultado();
      };

      opcionesVoto.appendChild(btn);
    });
  }

  // ================= RESULTADO =================
  const resultadoTexto = document.getElementById("resultadoTexto");

  function mostrarResultado() {
    let maxVotos = 0;
    let eliminado = "";

    for (let jugador in votos) {
      if (votos[jugador] > maxVotos) {
        maxVotos = votos[jugador];
        eliminado = jugador;
      }
    }

    if (jugadores.indexOf(eliminado) === impostorIndex) {
      resultadoTexto.textContent =
        `🎉 ¡Correcto! ${eliminado} era el IMPOSTOR`;
    } else {
      resultadoTexto.textContent =
        `😈 Fallaron… El impostor era ${jugadores[impostorIndex]}`;
    }

    mostrarPantalla("resultado");
  }

});
```
