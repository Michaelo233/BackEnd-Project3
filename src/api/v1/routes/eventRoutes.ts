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



router.get("/", eventController.getAllEventsHandler);



router.get("/:id", validateRequest(eventSchemas.getById), eventController.getEventByIdHandler);



router.put("/:id", validateRequest(eventSchemas.update), eventController.updateEventHandler);


router.delete("/:id", validateRequest(eventSchemas.delete), eventController.deleteEventHandler);



export default router;