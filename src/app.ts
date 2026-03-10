import express from "express";
import projectRoutes from "./api/v1/routes/projectRoutes";
import adminRoutes from "./api/v1/routes/adminRoutes";
import { AppError } from "./api/v1/errors/errors";
import { HTTP_STATUS } from "./constants/httpConstants";

const app = express();

app.use(express.json());

// Routes
app.use("/api/v1", projectRoutes);
app.use("/api/v1/admin", adminRoutes);

// Error handler
app.use(
  (
    err: Error | null,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (!err) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        error: {
          message: "An unexpected error occurred",
          code: "UNKNOWN_ERROR",
        },
        timestamp: new Date().toISOString(),
      });
      return;
    }

    if (err instanceof AppError) {
      res.status(err.statusCode).json({
        success: false,
        error: {
          message: err.message,
          code: err.code,
        },
        timestamp: new Date().toISOString(),
      });
    } else {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        error: {
          message: "An unexpected error occurred",
          code: "UNKNOWN_ERROR",
        },
        timestamp: new Date().toISOString(),
      });
    }
  }
);

export default app;