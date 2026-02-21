import { Request, Response, NextFunction } from "express";
import * as postService from "../services/eventService";
import { successResponse } from "../models/responseModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";

// handles POST request to create new post
export const createEventHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const {name, date, capacity, resgistrationCount, status, category} = req.body;
        const eventData = {name, date, capacity, resgistrationCount, status, category};

        const newEvent = await postService.createEvent(eventData);

        res.status(HTTP_STATUS.OK).json(successResponse({newEvent}, "Post created successfully"));
    } catch (error: unknown) {
        next(error);
    }
};
