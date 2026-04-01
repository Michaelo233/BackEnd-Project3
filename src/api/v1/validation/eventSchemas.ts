import Joi from "joi";
// import { register } from "node:module";

// Post operation schemas organized by request part
export const eventSchemas = {
    // POST /events - Create new event
    create: {
        body: Joi.object({
            name: Joi.string().min(3).required().messages({
                "any.required": "Name is required",
                "string.min": "Name length must be at least 3 characters longs",
            }),
            capacity: Joi.number().integer().min(5).required().messages({
                "any.required": "Capacity is required",
                "number.min": "Capacity must be greater than or equal to 5",
                "number.integer": "Capacity must be an integer"
            }),
            date: Joi.date().iso().greater("now").required().messages({
                "any.required": "date is required"
            }),
            status: Joi.string().valid("active", "cancelled", "completed").messages({
                "any.required": "Status is required",
                "any.only": "Status must be one of [active, cancelled, completed]"
            }),
            category: Joi.string().valid("conference", "workshop", "meetup", "seminar", "general").messages({
                "any.required": "Category is required",
                "any.only": "Category must be one of [conference, workshop, meetup, seminar, general]"
            }),
            registrationCount: Joi.number().integer().max(Joi.ref("capacity")).messages({
                "any.required": "Capacity is required",
                "number.min": "Capacity must be greater than or equal to 5",
                "number.integer": "Capacity must be an integer"
            }),
        }),
    },

     // GET /events/:id - Get single event
    getById: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Event ID is required",
                "string.empty": "Event ID cannot be empty",
            }),
        }),
        query: Joi.object({
            include: Joi.string().valid("comments", "author").optional(),
        }),
    },
        // PUT /events/:id - Update event
    update: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Event ID is required",
                "string.empty": "Event ID cannot be empty",
            }),
        }),
        body: Joi.object({
            name: Joi.string().min(3).messages({
                "any.required": "Name is required",
                "string.min": "Name length must be at least 3 characters longs",
            }),
            capacity: Joi.number().integer().min(5).messages({
                "any.required": "Capacity is required",
                "number.min": "Capacity must be greater than or equal to 5",
                "number.integer": "Capacity must be an integer"
            }),
            date: Joi.date().iso().greater("now").messages({
                "any.required": "date is required"
            }),
            status: Joi.string().valid("active", "cancelled", "completed").messages({
                "any.required": "Status is required",
                "any.only": "Status must be one of [active, cancelled, completed]"
            }),
            category: Joi.string().valid("conference", "workshop", "meetup", "seminar", "general").messages({
                "any.required": "Category is required",
                "any.only": "Category must be one of [conference, workshop, meetup, seminar, general]"
            }),
            registrationCount: Joi.number().integer().max(Joi.ref("category")).messages({
                "any.required": "Capacity is required",
                "number.min": "Capacity must be greater than or equal to 5",
                "number.integer": "Capacity must be an integer"
            }),
        }),
    },

    // DELETE /events/:id - Delete event
    delete: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Event ID is required",
                "string.empty": "Event ID cannot be empty",
            }),
        }),
    },
    
};