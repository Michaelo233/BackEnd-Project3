import { Event } from "../models/eventModel";
import * as firestoreRepository from "../repositories/firestoreRepository";
// import { eventSchemas } from "../validation/eventSchemas";
// import { validateRequest } from "../middleWare/validate";

const COLLECTION = "events";

// creating new post 
export const createEvent = async (
    postData: {
        name: string, 
        date: string, 
        capacity: number
        resgistrationCount?: number,
        status?: string,
        category?: string

    }): Promise<Event> => {
    try {

        const events = await firestoreRepository.getAllDocuments<Event>(COLLECTION)
        const newEventData = {
            id: "evt_00000" + (events.length + 1).toString(), 
            name: postData.name,
            date: postData.date,
            capacity: postData.capacity,
            resgistrationCount: postData.resgistrationCount ?? 0,
            status: postData.status ?? "active",
            category: postData.category ?? "general",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        const event = await firestoreRepository.createDocument<Event>(COLLECTION, newEventData);

        return {event, ... newEventData} as Event;

    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to create post: ${errorMessage}`
        );
    }
};