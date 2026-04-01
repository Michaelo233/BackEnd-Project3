import * as serviceModule from "../src/api/v1/services/eventService";
import * as repositoryModule from "../src/api/v1/repositories/firestoreRepository";


jest.mock("../src/api/v1/repositories/firestoreRepository");

const mockedRepository = repositoryModule as jest.Mocked<typeof repositoryModule>;

describe("Event Service", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // CREATE EVENT
    describe("createEvent", () => {

        it("should create event successfully", async () => {

        const mockInput = {
            name: "Test Event",
            date: "2026-02-23",
            capacity: 100
        };

        mockedRepository.getAllDocuments.mockResolvedValue([]);
        mockedRepository.createDocument.mockResolvedValue("evt_000001");

        const result = await serviceModule.createEvent(mockInput);

        expect(mockedRepository.createDocument).toHaveBeenCalled();
        expect(result.name).toBe("Test Event");
        expect(result.capacity).toBe(100);
        expect(result.resgistrationCount).toBe(0);
        });

        it("should throw error if repository fails", async () => {

        mockedRepository.getAllDocuments.mockRejectedValue(new Error("DB error"));

        await expect(
            serviceModule.createEvent({
            name: "Test",
            date: "2026-02-23",
            capacity: 50
            })
        ).rejects.toThrow();
        });
    });

    // GET BY ID

    describe("getEventById", () => {

        beforeEach(() => {
            jest.clearAllMocks();
        });

        it("should return event when found", async () => {

            const mockEvent = {
            id: "evt_000001",
            name: "Test Event",
            date: "2026-02-23",
            capacity: 100
            };

            mockedRepository.getDocById.mockResolvedValue(mockEvent);

            const result = await serviceModule.getEventById("evt_000001");

            expect(mockedRepository.getDocById)
            .toHaveBeenCalledWith("events", "evt_000001");

            expect(result).toEqual(mockEvent);
        });

        it("should throw error when event not found", async () => {

            mockedRepository.getDocById.mockResolvedValue(null);

            await expect(
            serviceModule.getEventById("evt_000999")
            ).rejects.toThrow("Event not found");
        });

    });

    // DELETE EVENT

    describe('deleteEvent', () => {

        it('should delete event successfully', async () => {

            mockedRepository.getDocById.mockResolvedValue({
                id: 'evt_000001'
            } as any);

            mockedRepository.deleteDocument.mockResolvedValue(undefined);

            await serviceModule.deleteEvent("evt_000001");

            expect(mockedRepository.deleteDocument)
                .toHaveBeenCalledWith("events", "evt_000001");

            expect(mockedRepository.deleteDocument)
                .toHaveBeenCalledWith("events", "evt_000001");
        });
    });

});