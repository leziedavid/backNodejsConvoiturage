import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger';

import prisma from './Conn';
import userRoutes from './routes/userRoutes';
import trajetRoutes from './routes/trajetRoutes';
import commandeRoutes from './routes/commandeRoutes';
import reponseDuConducteurRoutes from './routes/reponseConducteurRoutes';
import authRoutes from './routes/authRoutes';
import arretRoutes from './routes/arretRoutes';
import trajetsSearch from './routes/trajetsSearch';
import vehiculeRouter from './routes/vehiculeRouter';
import contactRouter from './routes/contactRoutes';  // Chemin d'importation
import faqRouter from './routes/faqRoutes';            // Chemin d'importation
import plansTarifairesRouter from './routes/plansTarifairesRoutes'; // Chemin d'importation
import aboutRoutes from './routes/aboutRoutes'; // Chemin d'importation
import commandeDriversRoutes from './routes/commandeDriversRoutes';
import settingsRoutes from './routes/settingsRoutes';

import rechargementRoutes from './routes/rechargementRoutes';

import path from 'path';
import commandeUserRoutes from './routes/commandeUserRoutes';
import paymentRoutes from './routes/paymentRoutes';
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 4000;


app.use(cors());
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Définir le dossier 'uploads' comme dossier statique
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configurer les routes
app.use('/api/users', userRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/trajets', trajetRoutes);
app.use('/api/commandes', commandeRoutes);
app.use('/api/drivers', commandeDriversRoutes);
app.use('/api/reponseConducteur', reponseDuConducteurRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/arrets', arretRoutes);
app.use('/api/search', trajetsSearch);
app.use('/api/vehicule', vehiculeRouter);
app.use('/api/contact', contactRouter);
app.use('/api/faqs', faqRouter);
app.use('/api/plansTarifaires', plansTarifairesRouter);
app.use('/api/about', aboutRoutes);

app.use('/api/userStatistics', userRoutes);
app.use('/api/rechargements', rechargementRoutes);
app.use('/api/commndesusers', commandeUserRoutes);

app.use('/api/status', commandeUserRoutes);
// Ajoutez les nouvelles routes pour les paiements
app.use('/api/payments', paymentRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Covoiturage API');
});

app.listen(port, async () => {
    console.log(`Server running on port ${port}`);
    try {
        await prisma.$connect();
        console.log('Connected to the database');
    } catch (error) {
        console.error('Error connecting to the database', error);
    }
});
