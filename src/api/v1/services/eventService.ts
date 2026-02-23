import { Event } from "../models/eventModel";
import * as firestoreRepository from "../repositories/firestoreRepository";
// import { eventSchemas } from "../validation/eventSchemas";
// import { validateRequest } from "../middleWare/validate";

const COLLECTION = "events";

// creating new event 
export const createEvent = async (
    eventData: {
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
            name: eventData.name,
            date: eventData.date,
            capacity: eventData.capacity,
            resgistrationCount: eventData.resgistrationCount ?? 0,
            status: eventData.status ?? "active",
            category: eventData.category ?? "general",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        
        const eventId = await firestoreRepository.createDocument<Event>(COLLECTION, newEventData);
        
        return {eventId, ... newEventData} as Event;
        
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to create event: ${errorMessage}`
        );
    }
};

// to get all event in a collection 
export const getAllEvents = async (): Promise<Event[]> => {
    try {
        // const event = await firestoreRepository.createDocument<Event>(COLLECTION, newEventData);
        const events = await firestoreRepository.getAllDocuments<Event>(COLLECTION);

        return events;

    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to retrieve all events: ${errorMessage}`
        );
    }
};

// to find an existing event by id
export const getEventById = async (id: string): Promise<Event> => {
    try {
        const event = await firestoreRepository.getDocById<Event>(COLLECTION, id);

        if(!event){
            throw new Error("Event not found");
        } else {
            return event;
        }


    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to retrieve the event: ${errorMessage}`
        );
    }
};

