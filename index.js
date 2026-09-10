// index.js
// Punto de entrada del backend. Arranca el servidor Express,
// conecta las rutas de autenticación y de contratos.

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const contractRoutes = require('./routes/contracts');

const app = express();

app.use(cors());          // permite que el HTML (otro origen) llame a esta API
app.use(express.json());  // permite leer JSON en el body de las peticiones

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/contracts', contractRoutes);

// Ruta de salud, útil para comprobar que el servidor está vivo
app.get('/api/health', (req, res) => {
  res.json({ estado: 'ok', mensaje: 'Contrato Claro API funcionando.' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Contrato Claro API escuchando en http://localhost:${PORT}`);
});

const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a Supabase mediante variables de entorno
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// --- TUS RUTAS /api/auth/login, /api/contracts, etc. ---

// Exportar app para funciones Serverless de Vercel
module.exports = app;

// Solo escuchar puerto si se ejecuta localmente
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`Servidor local en puerto ${PORT}`));
}
