import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import http from 'http';
import { Server } from 'socket.io';  // Importation de Socket.IO

import userRoutes from '../routes/user';
import photoRoutes from '../routes/photo';
import videoRoutes from '../routes/video';
import matchRoutes from '../routes/match';
import messageRoutes from '../routes/message';
import conversationRoutes from '../routes/conversation';  // Importation des routes pour les conversations

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;
const CONNECTION_URL = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/test";

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connexion à MongoDB
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

// Utiliser les routes importées
app.use('/api/user', userRoutes);
app.use('/api/photo', photoRoutes);
app.use('/api/video', videoRoutes);
app.use('/api/match', matchRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/conversation', conversationRoutes);  // Ajout des routes pour les conversations

// Créer le serveur HTTP
const server = http.createServer(app);

// Configurer Socket.IO
const io = new Server(server, {
    cors: {
        origin: "*",  // Tu peux restreindre à ton domaine plus tard
        methods: ["GET", "POST"]
    }
});

// Configurer les événements Socket.IO
io.on('connection', (socket) => {
    console.log('Un utilisateur est connecté', socket.id);

    // Rejoindre une conversation spécifique
    socket.on('joinConversation', (conversationId) => {
        console.log(`L'utilisateur ${socket.id} a rejoint la conversation ${conversationId}`);
        socket.join(conversationId);
    });

    // Envoyer un message
    socket.on('sendMessage', (data) => {
        const { conversationId, message } = data;
        console.log(`Message reçu pour la conversation ${conversationId}:`, message);
        io.to(conversationId).emit('receiveMessage', message);  // Diffuser le message à tous les utilisateurs dans la conversation
    });

    // Déconnexion de l'utilisateur
    socket.on('disconnect', () => {
        console.log('Un utilisateur est déconnecté', socket.id);
    });
});

// Remplacer app.listen par server.listen pour supporter les WebSockets
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

export default mongoose;
