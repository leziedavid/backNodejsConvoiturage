"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerDocument = __importStar(require("./swagger"));
const Conn_1 = __importDefault(require("./Conn"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const trajetRoutes_1 = __importDefault(require("./routes/trajetRoutes"));
const commandeRoutes_1 = __importDefault(require("./routes/commandeRoutes"));
const reponseConducteurRoutes_1 = __importDefault(require("./routes/reponseConducteurRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const arretRoutes_1 = __importDefault(require("./routes/arretRoutes"));
const trajetsSearch_1 = __importDefault(require("./routes/trajetsSearch"));
const vehiculeRouter_1 = __importDefault(require("./routes/vehiculeRouter"));
const contactRoutes_1 = __importDefault(require("./routes/contactRoutes")); // Chemin d'importation
const faqRoutes_1 = __importDefault(require("./routes/faqRoutes")); // Chemin d'importation
const plansTarifairesRoutes_1 = __importDefault(require("./routes/plansTarifairesRoutes")); // Chemin d'importation
const aboutRoutes_1 = __importDefault(require("./routes/aboutRoutes")); // Chemin d'importation
const commandeDriversRoutes_1 = __importDefault(require("./routes/commandeDriversRoutes"));
const settingsRoutes_1 = __importDefault(require("./routes/settingsRoutes"));
const rechargementRoutes_1 = __importDefault(require("./routes/rechargementRoutes"));
const dashboardRoutes_1 = __importDefault(require("./routes/dashboardRoutes")); // Assurez-vous que le chemin est correct
const commandeUserRoutes_1 = __importDefault(require("./routes/commandeUserRoutes"));
const paymentRoutes_1 = __importDefault(require("./routes/paymentRoutes"));
const path_1 = __importDefault(require("path"));
const seacheUsersRoutes_1 = __importDefault(require("./routes/seacheUsersRoutes"));
const commandesSearchRoutes_1 = __importDefault(require("./routes/commandesSearchRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
// Middleware pour le logging des requêtes
const requestLogger = (req, res, next) => {
    console.log('Requête reçue:');
    console.log('Méthode:', req.method);
    console.log('Chemin:', req.path);
    console.log('Corps de la requête:', req.body);
    console.log('Headers:', req.headers);
    next();
};
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(requestLogger); // Ajoutez ce middleware pour les logs
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
// Définir le dossier 'uploads' comme dossier statique
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, 'uploads')));
// Configurer les routes
app.use('/api/users', userRoutes_1.default);
app.use('/api/users-mdp', userRoutes_1.default);
app.use('/api/users-search', seacheUsersRoutes_1.default);
app.use('/api/settings', settingsRoutes_1.default);
app.use('/api/trajets', trajetRoutes_1.default);
app.use('/api/updated', trajetRoutes_1.default);
app.use('/api/commandes', commandeRoutes_1.default);
app.use('/api/commandes-search', commandesSearchRoutes_1.default);
app.use('/api/status-commande-users', commandesSearchRoutes_1.default);
app.use('/api/drivers', commandeDriversRoutes_1.default);
app.use('/api/reponseConducteur', reponseConducteurRoutes_1.default);
app.use('/api/auth', authRoutes_1.default);
app.use('/api/arrets', arretRoutes_1.default);
app.use('/api/search-trajets', trajetsSearch_1.default);
app.use('/api/vehicule', vehiculeRouter_1.default);
app.use('/api/contact', contactRoutes_1.default);
app.use('/api/faqs', faqRoutes_1.default);
app.use('/api/plansTarifaires', plansTarifairesRoutes_1.default);
app.use('/api/about', aboutRoutes_1.default);
app.use('/api/userStatistics', userRoutes_1.default);
app.use('/api/rechargements', rechargementRoutes_1.default);
app.use('/api/commndesusers', commandeUserRoutes_1.default);
app.use('/api/status', commandeUserRoutes_1.default);
app.use('/api/payments', paymentRoutes_1.default);
app.use('/api/dashboard/stats', dashboardRoutes_1.default);
app.get('/', (req, res) => {
    res.send('Covoiturage API');
});
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Server running on port ${port}`);
    try {
        yield Conn_1.default.$connect();
        console.log('Connected to the database');
    }
    catch (error) {
        console.error('Error connecting to the database', error);
    }
}));
//# sourceMappingURL=app.js.map