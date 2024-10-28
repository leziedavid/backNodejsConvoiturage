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
exports.deleteFAQ = exports.updateFAQ = exports.createFAQ = exports.getFAQById = exports.getFAQs = void 0;
const faqService_1 = require("../services/faqService");
const faqValidation_1 = require("../validation/faqValidation");
const getFAQs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const faqs = yield (0, faqService_1.getAllFAQsService)();
        const response = {
            code: 200,
            messages: 'FAQs retrieved successfully',
            data: faqs,
        };
        res.json(response);
    }
    catch (error) {
        console.error('Error retrieving FAQs:', error);
        const response = {
            code: 500,
            messages: 'Internal server error',
        };
        res.status(500).json(response);
    }
});
exports.getFAQs = getFAQs;
const getFAQById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const faq = yield (0, faqService_1.getFAQByIdService)(id);
        if (faq) {
            const response = {
                code: 200,
                messages: 'FAQ retrieved successfully',
                data: faq,
            };
            res.json(response);
        }
        else {
            const response = {
                code: 404,
                messages: 'FAQ not found',
            };
            res.status(404).json(response);
        }
    }
    catch (error) {
        console.error('Error retrieving FAQ by id:', error);
        const response = {
            code: 500,
            messages: 'Internal server error',
        };
        res.status(500).json(response);
    }
});
exports.getFAQById = getFAQById;
const createFAQ = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = faqValidation_1.createFAQSchema.safeParse(req.body);
    if (result.success) {
        try {
            const newFAQ = yield (0, faqService_1.createFAQService)(result.data);
            const response = {
                code: 201,
                messages: 'FAQ created successfully',
                data: newFAQ,
            };
            res.status(201).json(response);
        }
        catch (error) {
            console.error('Error creating FAQ:', error);
            const response = {
                code: 500,
                messages: 'Internal server error',
            };
            res.status(500).json(response);
        }
    }
    else {
        res.status(400).json({
            code: 400,
            messages: result.error.format(),
        });
    }
});
exports.createFAQ = createFAQ;
const updateFAQ = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = faqValidation_1.updateFAQSchema.safeParse(req.body);
    if (result.success) {
        try {
            const updatedFAQ = yield (0, faqService_1.updateFAQService)(id, result.data);
            const response = {
                code: 200,
                messages: 'FAQ updated successfully',
                data: updatedFAQ,
            };
            res.json(response);
        }
        catch (error) {
            console.error('Error updating FAQ:', error);
            const response = {
                code: 500,
                messages: 'Internal server error',
            };
            res.status(500).json(response);
        }
    }
    else {
        res.status(400).json({
            code: 400,
            messages: result.error.format(),
        });
    }
});
exports.updateFAQ = updateFAQ;
const deleteFAQ = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield (0, faqService_1.deleteFAQService)(id);
        const response = {
            code: 204,
            messages: 'FAQ deleted successfully',
        };
        res.status(204).send(response);
    }
    catch (error) {
        console.error('Error deleting FAQ:', error);
        const response = {
            code: 500,
            messages: 'Internal server error',
        };
        res.status(500).json(response);
    }
});
exports.deleteFAQ = deleteFAQ;
//# sourceMappingURL=faqController.js.map