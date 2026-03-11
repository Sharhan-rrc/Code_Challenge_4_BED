import express from "express";
import {
  healthCheck,
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const router = express.Router();

// Public endpoint
router.get("/health", healthCheck);

// Get all projects - requires auth (all roles)
router.get(
  "/projects",
  authenticate,
  isAuthorized({ hasRole: ["admin", "lead", "developer"] }),
  getProjects
);

// Get single project - requires auth (all roles)
router.get(
  "/projects/:id",
  authenticate,
  isAuthorized({ hasRole: ["admin", "lead", "developer"] }),
  getProjectById
);

// Create project - admin or lead only
router.post(
  "/projects",
  authenticate,
  isAuthorized({ hasRole: ["admin", "lead"] }),
  createProject
);

// Update project - admin or lead only
router.put(
  "/projects/:id",
  authenticate,
  isAuthorized({ hasRole: ["admin", "lead"] }),
  updateProject
);

// Delete project - admin only
router.delete(
  "/projects/:id",
  authenticate,
  isAuthorized({ hasRole: ["admin"] }),
  deleteProject
);

export default router;