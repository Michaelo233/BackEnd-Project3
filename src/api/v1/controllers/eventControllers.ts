import { Request, Response, NextFunction } from "express";
import * as eventService from "../services/eventService";
import { successResponse } from "../models/responseModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";

// handles POST request to create new event
export const createEventHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const {name, date, capacity, resgistrationCount, status, category} = req.body;
        const eventData = {name, date, capacity, resgistrationCount, status, category};

        const newEvent = await eventService.createEvent(eventData);

        res.status(HTTP_STATUS.OK).json(successResponse({newEvent}, "Event created successfully"));
    } catch (error: unknown) {
        next(error);
    }
};

// handles GET request to read all events
export const getAllEventsHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const events = await eventService.getAllEvents();

        res.status(HTTP_STATUS.OK).json(successResponse({events}, "Events retrieved successfully"));
    } catch (error: unknown) {
        next(error);
    }
};

// handles GET request to read a single event by ID
export const getEventByIdHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;

        const event = await eventService.getEventById(id as string);

        res.status(HTTP_STATUS.OK).json(successResponse({event}, "Event retrieved successfully"));
    } catch (error: unknown) {
        next(error);
    }
};

