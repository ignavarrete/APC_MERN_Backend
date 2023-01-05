import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import conectarDB from './config/db.js'; 
import medicoRoutes from './routes/medicoRoutes.js';
import pacienteRoutes from './routes/pacienteRoutes.js';

const app = express();
app.use(express.json());

dotenv.config();

conectarDB();

const dominiosPermitidos = [process.env.FRONTEND_URL];

const corsOpciones = {
    origin: function(origin, callback) {
        if(dominiosPermitidos.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('No permitido por CORS'))
        }
    }
}

app.use(cors(corsOpciones));
app.use('/api/medicos', medicoRoutes);
app.use('/api/pacientes', pacienteRoutes);

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
});