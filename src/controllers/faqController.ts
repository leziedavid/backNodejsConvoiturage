import { Request, Response } from 'express';
import { BaseResponse } from '../interfaces/BaseResponse';
import {
    createFAQService,
    updateFAQService,
    getAllFAQsService,
    getFAQByIdService,
    deleteFAQService,
} from '../services/faqService';
import { createFAQSchema, updateFAQSchema } from '../validation/faqValidation';

export const getFAQs = async (req: Request, res: Response) => {
    try {
        const faqs = await getAllFAQsService();
        const response: BaseResponse<typeof faqs> = {
            code: 200,
            messages: 'FAQs retrieved successfully',
            data: faqs,
        };
        res.json(response);
    } catch (error) {
        console.error('Error retrieving FAQs:', error);
        const response: BaseResponse<null> = {
            code: 500,
            messages: 'Internal server error',
        };
        res.status(500).json(response);
    }
};

export const getFAQById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const faq = await getFAQByIdService(id);
        if (faq) {
            const response: BaseResponse<typeof faq> = {
                code: 200,
                messages: 'FAQ retrieved successfully',
                data: faq,
            };
            res.json(response);
        } else {
            const response: BaseResponse<null> = {
                code: 404,
                messages: 'FAQ not found',
            };
            res.status(404).json(response);
        }
    } catch (error) {
        console.error('Error retrieving FAQ by id:', error);
        const response: BaseResponse<null> = {
            code: 500,
            messages: 'Internal server error',
        };
        res.status(500).json(response);
    }
};

export const createFAQ = async (req: Request, res: Response) => {
    const result = createFAQSchema.safeParse(req.body);
    if (result.success) {
        try {
            const newFAQ = await createFAQService(result.data);
            const response: BaseResponse<typeof newFAQ> = {
                code: 201,
                messages: 'FAQ created successfully',
                data: newFAQ,
            };
            res.status(201).json(response);
        } catch (error) {
            console.error('Error creating FAQ:', error);
            const response: BaseResponse<null> = {
                code: 500,
                messages: 'Internal server error',
            };
            res.status(500).json(response);
        }
    } else {
        res.status(400).json({
            code: 400,
            messages: result.error.format(),
        });
    }
};

export const updateFAQ = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = updateFAQSchema.safeParse(req.body);
    if (result.success) {
        try {
            const updatedFAQ = await updateFAQService(id, result.data);
            const response: BaseResponse<typeof updatedFAQ> = {
                code: 200,
                messages: 'FAQ updated successfully',
                data: updatedFAQ,
            };
            res.json(response);
        } catch (error) {
            console.error('Error updating FAQ:', error);
            const response: BaseResponse<null> = {
                code: 500,
                messages: 'Internal server error',
            };
            res.status(500).json(response);
        }
    } else {
        res.status(400).json({
            code: 400,
            messages: result.error.format(),
        });
    }
};

export const deleteFAQ = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await deleteFAQService(id);
        const response: BaseResponse<null> = {
            code: 204,
            messages: 'FAQ deleted successfully',
        };
        res.status(204).send(response);
    } catch (error) {
        console.error('Error deleting FAQ:', error);
        const response: BaseResponse<null> = {
            code: 500,
            messages: 'Internal server error',
        };
        res.status(500).json(response);
    }
};
