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
exports.deleteFAQService = exports.getFAQByIdService = exports.getAllFAQsService = exports.updateFAQService = exports.createFAQService = void 0;
const Conn_1 = __importDefault(require("../Conn"));
// Fonction pour créer une FAQ
const createFAQService = (faqData) => __awaiter(void 0, void 0, void 0, function* () {
    const { question, reponse } = faqData;
    return Conn_1.default.fAQ.create({
        data: {
            question,
            reponse,
        },
    });
});
exports.createFAQService = createFAQService;
// Fonction pour mettre à jour une FAQ
const updateFAQService = (faqId, faqData) => __awaiter(void 0, void 0, void 0, function* () {
    const { question, reponse } = faqData;
    // Vérifier si la FAQ existe avant la mise à jour
    const existingFAQ = yield Conn_1.default.fAQ.findUnique({ where: { id: faqId } });
    if (!existingFAQ)
        throw new Error('FAQ not found');
    return Conn_1.default.fAQ.update({
        where: { id: faqId },
        data: {
            question: question !== null && question !== void 0 ? question : existingFAQ.question,
            reponse: reponse !== null && reponse !== void 0 ? reponse : existingFAQ.reponse,
        },
    });
});
exports.updateFAQService = updateFAQService;
// Fonction pour obtenir toutes les FAQ
const getAllFAQsService = () => __awaiter(void 0, void 0, void 0, function* () {
    return Conn_1.default.fAQ.findMany();
});
exports.getAllFAQsService = getAllFAQsService;
// Fonction pour obtenir une FAQ par ID
const getFAQByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return Conn_1.default.fAQ.findUnique({
        where: { id },
    });
});
exports.getFAQByIdService = getFAQByIdService;
// Fonction pour supprimer une FAQ
const deleteFAQService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield Conn_1.default.fAQ.delete({ where: { id } });
});
exports.deleteFAQService = deleteFAQService;
//# sourceMappingURL=faqService.js.map