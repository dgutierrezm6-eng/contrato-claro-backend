require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const contractRoutes = require('./routes/contracts');

const app = express();

app.use(cors());          // permite que el HTML llame a esta API
app.use(express.json());  // permite leer JSON en el body de las peticiones

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/contracts', contractRoutes);

// Ruta de comprobación
app.get('/api/health', (req, res) => {
  res.json({ estado: 'ok', mensaje: 'Contrato Claro API funcionando.' });
});

// Exportar la app para funciones Serverless de Vercel
module.exports = app;

// Escuchar en puerto solo en entorno local
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`✅ Contrato Claro API escuchando en http://localhost:${PORT}`);
  });
}
