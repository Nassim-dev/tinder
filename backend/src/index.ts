import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import { verifyToken } from '../middlewares/authMiddleware';  

import userRoutes from '../routes/user'; 
import photoRoutes from '../routes/photo';
import videoRoutes from '../routes/video';
import matchRoutes from '../routes/match';
import messageRoutes from '../routes/message';


dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;
const CONNECTION_URL = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/test";

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


mongoose.connect(CONNECTION_URL)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);  
    });

// Route de base
app.get('/', (req: Request, res: Response) => {
    res.send('Backend de Tinder Clone fonctionne!');
});

// Route de statut pour vérifier si l'API fonctionne
app.get('/api/status', (req: Request, res: Response) => {
    res.json({ status: 'API is running' });
});

// Middleware d'authentification globale pour toutes les routes
// app.use(verifyToken);  // Décommenter si vous voulez protéger toutes les routes

// Utiliser les routes importées
app.use('/api/user', userRoutes);
app.use('/api/photo', photoRoutes);
app.use('/api/video', videoRoutes);
app.use('/api/match', matchRoutes);
app.use('/api/message', messageRoutes);

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

export default mongoose;


