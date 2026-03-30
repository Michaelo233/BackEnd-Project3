import express from "express";
import { validateRequest } from "../middleWare/validate";
import * as eventController from "../controllers/eventControllers";
import { eventSchemas } from "../validation/eventSchemas";

const router = express.Router();

//API Doc 2: POST endpoint with request body
/**
 * @openapi
 * /events:
 *   post:
 *     summary: Create a new event item
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - capacity
 *               - date
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 *                 example: "RRC Event"
 *               date:
 *                 type: string
 *                 example: 2026-05-12
 *               capacity:
 *                 type: number
 *                 example: 100
 *               resgistrationCount:
 *                 type: number
 *                 example: 50
 *               status:
 *                 type: string
 *                 example: "active"
 *               category:
 *                 type: string
 *                 example: "general"
 *               createdAt:
 *                 type: date
 *                 example: 2026-03-12
 *               updatedAt:
 *                 type: date
 *                 example: 2026-03-12
 *     responses:
 *       '201':
 *         description: Post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       '400':
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

router.post("/", validateRequest(eventSchemas.create), eventController.createEventHandler);

/**
 * @openapi
 * /events:
 *   get:
 *     summary: Retrieve all events
 *     tags: [Posts]
 *     responses:
 *       '200':
 *         description: A list of events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

router.get("/", eventController.getAllEventsHandler);

/**
 * @openapi
 * /events/{id}:
 *   get:
 *     summary: Get an event by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: evt_000001
 *         description: The event ID
 *     responses:
 *       '200':
 *         description: Event retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       '400':
 *         description: Invalid ID supplied
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       '404':
 *         description: Event not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

router.get("/:id", validateRequest(eventSchemas.getById), eventController.getEventByIdHandler);

/**
 * @openapi
 * /events/{id}:
 *   put:
 *     summary: Update an existing event
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The event ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       '200':
 *         description: Event updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       '400':
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       '404':
 *         description: Event not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

router.put("/:id", validateRequest(eventSchemas.update), eventController.updateEventHandler);


router.delete("/:id", validateRequest(eventSchemas.delete), eventController.deleteEventHandler);



export default router;