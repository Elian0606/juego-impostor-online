```python
// server.mjs
import express from "express";
import cors from "cors";
import { crearPartida } from "./bot.mjs";

const app = express();

// Configuraciones
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Ruta para crear partida
app.post("/crear-partida", async (req, res) => {
  const { jugadores } = req.body;

  if (!jugadores || jugadores.length < 3) {
    return res.status(400).json({
      error: "Se necesitan al menos 3 jugadores"
    });
  }

  try {
    // Llamamos a la función que exportamos desde bot.js
    await crearPartida(jugadores);
    res.json({ ok: true, mensaje: "Partida creada" });
  } catch (error) {
    console.error("Error en el servidor:", error);
    res.status(500).json({
      error: "Error interno del servidor"
    });
  }
});

// Arrancar servidor
app.listen(3000, () => {
  console.log(" Servidor activo en http://localhost:3000");
});
```
