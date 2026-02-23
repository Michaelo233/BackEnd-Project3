import { Request, Response, NextFunction } from "express";
import { validateRequest } from "../src/api/v1/middleWare/validate";
import Joi from "joi";

describe("validateRequest Middleware", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        mockReq = {
            body: {},
            params: {},
            query: {},
        };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            locals: {},
        };
        mockNext = jest.fn();
    });

    // We'll add our test setup and test cases here

    // test case # 1: validate valid body input
    it("should pass for valid body input", () => {
        // Arrange
        const testSchemas = {
            body: Joi.object({
                name: Joi.string().min(3),
                capacity: Joi.number().integer().min(5),
                date: Joi.date().iso().greater("now"),
                status: Joi.string().valid("active", "cancelled", "completed"),
                category: Joi.string().valid("conference", "workshop", "meetup", "seminar", "general"),
                registrationCount: Joi.number().integer().max(Joi.ref("capacity"))
            }),
        };
        mockReq.body = { name: "Duncan MacLeod", capacity: 200, date: "2026-02-23T02:00:00.00Z", status: "active", category: "general", registrationCount: 100 };
        const middleware = validateRequest(testSchemas);

        // Act
        middleware(mockReq as Request, mockRes as Response, mockNext);

        // Assert
        expect(mockNext).toHaveBeenCalled();
        expect(mockRes.status).not.toHaveBeenCalled();
        expect(mockRes.json).not.toHaveBeenCalled();
    });

    // test case # 2: invalid input
    it("should fail for invalid body input", () => {
        // Arrange
        const testSchemas = {
            body: Joi.object({
                name: Joi.string().min(3),
                capacity: Joi.number().integer().min(5),
                date: Joi.date().iso().greater("now"),
                status: Joi.string().valid("active", "cancelled", "completed"),
                category: Joi.string().valid("conference", "workshop", "meetup", "seminar", "general"),
                registrationCount: Joi.number().integer().max(Joi.ref("capacity")),
            }),
        };

        // Age is out of range
        mockReq.body = { name: "Du", capacity: 200, date: "2026-02-23T02:00:00.00Z" };
        const middleware = validateRequest(testSchemas);

        // Act
        middleware(mockReq as Request, mockRes as Response, mockNext);

        // Assert
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            error: expect.stringContaining("Validation error"),
        });
        expect(mockNext).not.toHaveBeenCalled();
    });

    // test case # 2: invalid input
    it("should fail for invalid body input", () => {
        // Arrange
        const testSchemas = {
            body: Joi.object({
                name: Joi.string().min(3),
                capacity: Joi.number().integer().min(5),
                date: Joi.date().iso().greater("now"),
                status: Joi.string().valid("active", "cancelled", "completed"),
                category: Joi.string().valid("conference", "workshop", "meetup", "seminar", "general"),
                registrationCount: Joi.number().integer().max(Joi.ref("capacity")),
            }),
        };

        // Age is out of range
        mockReq.body = { name: "Dun", capacity: 200, date: "2026-02-23T02:00:00.00Z", status: "active", category: "general", registrationCount: 300 };
        const middleware = validateRequest(testSchemas);

        // Act
        middleware(mockReq as Request, mockRes as Response, mockNext);

        // Assert
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            error: expect.stringContaining("Validation error"),
        });
        expect(mockNext).not.toHaveBeenCalled();
    });

    // test case # 3: validate params
    it("should validate params correctly", () => {
        // Arrange
        const testSchemas = {
            params: Joi.object({
                id: Joi.string().required(),
            }),
        };
        mockReq.params = { id: "post123" };
        const middleware = validateRequest(testSchemas);

        // Act
        middleware(mockReq as Request, mockRes as Response, mockNext);

        // Assert
        expect(mockNext).toHaveBeenCalled();
    });

    // test case # 4: validate params are missing or not
    it("should fail when required params are missing", () => {
        // Arrange
        const testSchemas = {
            params: Joi.object({
                id: Joi.string().required(),
            }),
        };

        // Missing required id
        mockReq.params = {};
        const middleware = validateRequest(testSchemas);

        // Act
        middleware(mockReq as Request, mockRes as Response, mockNext);

        // Assert
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            error: expect.stringContaining('Params: "id" is required'),
        });
    });

    // test case # 5: validate all req parts together
    it("should validate multiple request parts together", () => {
        // Arrange
        const testSchemas = {
            params: Joi.object({
                id: Joi.string().required(),
            }),
            body: Joi.object({
                name: Joi.string().required(),
            }),
            query: Joi.object({
                include: Joi.string().valid("details", "summary").optional(),
            }),
        };
        mockReq.params = { id: "event123" };
        mockReq.body = { name: "Updated Event" };
        mockReq.query = { include: "details" };
        const middleware = validateRequest(testSchemas);

        // Act
        middleware(mockReq as Request, mockRes as Response, mockNext);

        // Assert
        expect(mockNext).toHaveBeenCalled();
    });


});