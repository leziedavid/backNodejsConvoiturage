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
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginate = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const paginate = (query, // Typage de la fonction query
options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit } = options;
    // Calculer l'offset pour la pagination
    const offset = (page - 1) * limit;
    // Exécuter la requête avec la pagination
    const [data, total] = yield Promise.all([
        query({
            skip: offset,
            take: limit,
        }),
        prisma.commande.count() // Compter le total directement via PrismaClient
    ]);
    return { data, total };
});
exports.paginate = paginate;
//# sourceMappingURL=odersPaginate.js.map