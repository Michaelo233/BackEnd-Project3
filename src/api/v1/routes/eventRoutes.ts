import express from "express";
import { validateRequest } from "../middleWare/validate";
import * as eventController from "../controllers/eventControllers";
import { eventSchemas } from "../validation/eventSchemas";

const router = express.Router();

router.post("/", validateRequest(eventSchemas.create), eventController.createEventHandler);
router.get("/", eventController.getAllEventsHandler);
// router.get("/:id", validateRequest(postSchemas.getById), postController.getPostByIdHandler);
// router.put("/:id", validateRequest(postSchemas.update), postController.updatePostHandler);
// router.delete("/:id", validateRequest(postSchemas.delete), postController.deletePostHandler);



export default router;