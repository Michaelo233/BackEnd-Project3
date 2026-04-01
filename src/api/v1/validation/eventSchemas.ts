import Joi from "joi";
// import { register } from "node:module";

/**
 * @openapi
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - name
 *         - capacity
 *         - date
 *       properties:
 *         id:
 *           type: string
 *           description: The event's id
 *           example: "evt_00001"
 *         name:
 *           type: string
 *           description: The event name
 *           example: "RRC Event"
 *         date:
 *           type: string
 *           format: date-time
 *           description: The date and time when the event will happen
 *           example: "2026-06-15T10:30:00Z"
 *         capacity:
 *           type: number
 *           description: The event capacity
 *           example: 100
 *         registrationCount:
 *           type: number
 *           description: Number of registered users
 *           example: 50
 *         status:
 *           type: string
 *           enum: [active, cancelled, completed]
 *           description: The event status
 *           example: "active"
 *         category:
 *           type: string
 *           enum: [conference, workshop, meetup, seminar, general]
 *           description: The event category
 *           example: "general"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: When the event was created
 *           example: "2024-01-15T10:30:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: When the event was last updated
 *           example: "2024-01-20T14:45:00Z"
 *
 *     CreatePostRequest:
 *       type: object
 *       required:
 *         - name
 *         - capacity
 *         - date
 *       properties:
 *         name:
 *           type: string
 *           example: "RRC Event"
 *         capacity:
 *           type: number
 *           example: 100
 *         date:
 *           type: string
 *           format: date-time
 *           example: "2026-06-15T10:30:00Z"
 *         status:
 *           type: string
 *           enum: [active, cancelled, completed]
 *         category:
 *           type: string
 *           enum: [conference, workshop, meetup, seminar, general]
 *         registrationCount:
 *           type: number
 *           example: 0
 *
 *     UpdatePostRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         capacity:
 *           type: number
 *         date:
 *           type: string
 *           format: date-time
 *         status:
 *           type: string
 *           enum: [active, cancelled, completed]
 *         category:
 *           type: string
 *           enum: [conference, workshop, meetup, seminar, general]
 *         registrationCount:
 *           type: number
 *
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Invalid input data"
 */

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
            registrationCount: Joi.number().integer().max(Joi.ref("capacity")).messages({
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