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
exports.deleteAbout = exports.getAboutById = exports.getAbouts = exports.updateAbout = exports.createAbout = void 0;
// src/services/aboutService.ts
const Conn_1 = __importDefault(require("../Conn"));
const createAbout = (aboutData) => __awaiter(void 0, void 0, void 0, function* () {
    return Conn_1.default.about.create({ data: aboutData });
});
exports.createAbout = createAbout;
const updateAbout = (aboutId, aboutData) => __awaiter(void 0, void 0, void 0, function* () {
    const about = yield Conn_1.default.about.findUnique({ where: { id: aboutId } });
    if (!about)
        throw new Error('About not found');
    return Conn_1.default.about.update({
        where: { id: aboutId },
        data: aboutData,
    });
});
exports.updateAbout = updateAbout;
const getAbouts = () => __awaiter(void 0, void 0, void 0, function* () {
    return Conn_1.default.about.findMany();
});
exports.getAbouts = getAbouts;
const getAboutById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return Conn_1.default.about.findUnique({ where: { id } });
});
exports.getAboutById = getAboutById;
const deleteAbout = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield Conn_1.default.about.delete({ where: { id } });
});
exports.deleteAbout = deleteAbout;
//# sourceMappingURL=aboutService.js.map