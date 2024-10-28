"use strict";
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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const protect = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            // Rechercher l'utilisateur dans la base de données en utilisant Prisma
            const user = yield prisma.user.findUnique({
                where: { id: decodedToken.id },
                select: {
                    id: true,
                    username: true,
                    email: true,
                    // Vous pouvez exclure des propriétés sensibles ici
                }
            });
            if (!user) {
                res.status(401).json({ message: 'Not authorized, user not found' });
                return;
            }
            req.user = user; // Ajouter l'utilisateur à l'objet req
            next();
        }
        catch (err) {
            console.log(err);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }
    else {
        if (!token) {
            res.status(401).json({ message: 'Not authorized, no token' });
        }
    }
}));
exports.default = protect;
//# sourceMappingURL=Auth.js.map