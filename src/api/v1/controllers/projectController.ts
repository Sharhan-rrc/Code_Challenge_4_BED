import { Request, Response } from "express";
import projectService from "../../v1/services/projectServices";
import { HTTP_STATUS } from "../../../constants/httpConstants";

export const healthCheck = (req: Request, res: Response): void => {
  res.status(HTTP_STATUS.OK).json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
};

export const getProjects = (req: Request, res: Response): void => {
  const projects = projectService.getAll();
  res.status(HTTP_STATUS.OK).json({
    message: "Projects retrieved",
    count: projects.length,
    data: projects,
  });
};

export const getProjectById = (req: Request, res: Response): void => {
  const { id } = req.params;
  const project = projectService.getById(Number(id));

  if (!project) {
    res.status(HTTP_STATUS.NOT_FOUND).json({
      message: "Project not found",
    });
    return;
  }

  res.status(HTTP_STATUS.OK).json({
    message: "Project retrieved",
    data: project,
  });
};

export const createProject = (req: Request, res: Response): void => {
  const { name, status } = req.body;

  if (!name || !status) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: "Name and status are required",
    });
    return;
  }

  const project = projectService.create(name, status);

  res.status(HTTP_STATUS.CREATED).json({
    message: "Project created",
    data: project,
  });
};

export const updateProject = (req: Request, res: Response): void => {
  const { id } = req.params;
  const { name, status } = req.body;

  const project = projectService.update(Number(id), name, status);

  if (!project) {
    res.status(HTTP_STATUS.NOT_FOUND).json({
      message: "Project not found",
    });
    return;
  }

  res.status(HTTP_STATUS.OK).json({
    message: "Project updated",
    data: project,
  });
};

export const deleteProject = (req: Request, res: Response): void => {
  const { id } = req.params;

  const deleted = projectService.delete(Number(id));

  if (!deleted) {
    res.status(HTTP_STATUS.NOT_FOUND).json({
      message: "Project not found",
    });
    return;
  }

  res.status(HTTP_STATUS.OK).json({
    message: "Project deleted",
  });
};