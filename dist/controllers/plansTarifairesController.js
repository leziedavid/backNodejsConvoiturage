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
exports.handleDeletePlanTarifaire = exports.handleGetPlanTarifaireById = exports.handleGetPlansTarifaires = exports.handleUpdatePlanTarifaire = exports.handleCreatePlanTarifaire = void 0;
const plansTarifairesService_1 = require("../services/plansTarifairesService");
const plansTarifairesValidation_1 = require("../validation/plansTarifairesValidation");
const handleCreatePlanTarifaire = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const planData = plansTarifairesValidation_1.createPlansTarifairesSchema.parse(req.body);
        const newPlan = yield (0, plansTarifairesService_1.createPlanTarifaire)(planData);
        res.status(201).json(newPlan);
    }
    catch (error) {
        res.status(400).json({ error: error.errors ? error.errors.map((e) => e.message).join(', ') : error.message });
    }
});
exports.handleCreatePlanTarifaire = handleCreatePlanTarifaire;
const handleUpdatePlanTarifaire = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const planData = plansTarifairesValidation_1.updatePlansTarifairesSchema.parse(req.body);
        const updatedPlan = yield (0, plansTarifairesService_1.updatePlanTarifaire)(req.params.id, planData);
        res.status(200).json(updatedPlan);
    }
    catch (error) {
        res.status(400).json({ error: error.errors ? error.errors.map((e) => e.message).join(', ') : error.message });
    }
});
exports.handleUpdatePlanTarifaire = handleUpdatePlanTarifaire;
const handleGetPlansTarifaires = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const plans = yield (0, plansTarifairesService_1.getPlansTarifaires)();
        res.status(200).json(plans);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.handleGetPlansTarifaires = handleGetPlansTarifaires;
const handleGetPlanTarifaireById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const plan = yield (0, plansTarifairesService_1.getPlanTarifaireById)(req.params.id);
        if (!plan)
            return res.status(404).json({ error: 'Plan tarifaire non trouvé' });
        res.status(200).json(plan);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.handleGetPlanTarifaireById = handleGetPlanTarifaireById;
const handleDeletePlanTarifaire = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, plansTarifairesService_1.deletePlanTarifaire)(req.params.id);
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.handleDeletePlanTarifaire = handleDeletePlanTarifaire;
//# sourceMappingURL=plansTarifairesController.js.map