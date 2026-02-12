# 🔍 EL IMPOSTOR 🕵️

Juego interactivo de deducción social inspirado en dinámicas de impostor, desarrollado como proyecto académico utilizando tecnologías web.

---

## 📝 Descripción del Proyecto

**El Impostor** es un juego multijugador local en el que los participantes reciben una palabra secreta perteneciente a una categoría específica, excepto uno de ellos: **el impostor**. 

A diferencia de versiones básicas, este proyecto incluye un **sistema de competencia por rondas**, donde los jugadores acumulan puntos para coronar a un ganador final después de una serie de partidas.

---

## 🎮 ¿Cómo se juega?

1. **Registro:** Se ingresan entre **2 y 10 jugadores**.
2. **Categoría:** Se selecciona una categoría temática.
3. **Reparto:** El sistema asigna una palabra secreta a todos excepto a un impostor elegido al azar.
4. **Privacidad:** Cada jugador toca la pantalla para ver su rol con un efecto de desenfoque por seguridad.
5. **Debate y Tiempo:** Se inicia un **temporizador de 2:00 minutos**. Cada jugador dice una palabra relacionada para demostrar que conoce la palabra secreta.
6. **Votación:** Al finalizar el tiempo, el grupo vota por quién creen que es el impostor.
7. **Puntuación Acumulada:** - Si los inocentes descubren al impostor: **+1 punto** para cada inocente.
   - Si el impostor escapa: **+2 puntos** para el impostor.
8. **Ciclo de Rondas:** El juego se repite automáticamente durante **3 rondas**.
9. **Ganador Final:** Al terminar todas las rondas, el sistema calcula quién tuvo el mejor desempeño y lo proclama campeón.

---

## ✨ Funcionalidades Principales

* **Sistema de Rondas:** Lógica integrada para jugar múltiples partidas (3 rondas por defecto).
* **Tabla de Puntuación Real:** Seguimiento dinámico de puntos que no se borran entre rondas.
* **Temporizador Inteligente:** Cambia a color rojo y activa una animación de alerta cuando quedan menos de 10 segundos.
* **Control de Audio:** Música de fondo con barra de volumen ajustable en tiempo real.
* **Seguridad Visual:** Efecto *blur* en las palabras secretas para evitar que otros jugadores las vean.
* **Diseño Moderno:** Interfaz tipo tarjetas, colores degradados y totalmente responsiva.

---

## 🛠️ Tecnologías Utilizadas

* **HTML5:** Estructura de pantallas y secciones.
* **CSS3:** Estilos, animaciones de transición y diseño "Dark Mode".
* **JavaScript (Vanilla JS):** Motor lógico, manejo del DOM, sistema de puntos y control de tiempos.

---

## 📂 Estructura del Proyecto

```text
El-Impostor/
│
├─ index.html          # Estructura base y control de secciones (screens)
├─ style.css           # Estética, animaciones y efectos visuales
├─ script.js           # Cerebro del juego: Rondas, puntos y lógica de votos
├─ palabras.js         # Diccionario de categorías (Comida, Lugares, Animales)
└─ public/            # Carpeta de recursos multimedia y estáticos
   └─ musica.mp3       # Ambientación sonora del juego

⚙️ Descripción de Archivos
index.html: Es el esqueleto del juego. Contiene todas las pantallas (.screen) organizadas en una sola página (SPA). Aquí se vinculan los estilos, la música y los scripts.

style.css: Define la estética "Dark Mode". Incluye las animaciones de las tarjetas, el efecto de desenfoque (blur) para la privacidad y los colores vibrantes para las alertas del temporizador.

script.js: El motor principal. Contiene la lógica de asignación de roles, el sistema de votación, el temporizador y el control de flujo entre rondas y puntuaciones acumuladas.

palabras.js: Actúa como la base de datos del juego. Contiene los listados de palabras categorizados por temas (Comida, Animales y Lugares).

publics/: Carpeta destinada a recursos estáticos. Centraliza archivos multimedia como musica.mp3, que proporciona la ambientación sonora durante la partida.

👥 Créditos del Proyecto
Desarrollador: Gabriela Lopez

Música: Victor Zerpa

Arte y Animación: Arianna Escalona & Elian Garcia

Mentoría: Prof. Gabriel Baute
