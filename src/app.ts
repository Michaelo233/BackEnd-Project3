import express, { Express } from "express";
// import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables BEFORE your internal imports!
dotenv.config();

import { apiHelmetConfig } from "../config/helmetConfig";
import { getCorsOptions } from "../config/corsConfig";

import setupSwagger from "../config/swagger";
import morgan from "morgan";
import router from "./api/v1/routes/eventRoutes";

const app: Express = express();

// Apply basic Helmet security
// app.use(helmet());
app.use(apiHelmetConfig);

// apply environment specific cors config
app.use(cors(getCorsOptions()));

// Use Morgan for HTTP request logging
app.use(morgan("combined"));

app.use(express.json());

// add API endpoint routes
app.use("/api/v1/events", router);

// Interface for health check response
interface HealthCheckResponse {
    status: string;
    uptime: number;
    timestamp: string;
    version: string;
}

// api healthcheck
app.get("/api/v1/health", (req, res) => {
    const healthData: HealthCheckResponse = {
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    };
    res.json(healthData);
});

// Setup Swagger
setupSwagger(app);

// Export the app
export default app;