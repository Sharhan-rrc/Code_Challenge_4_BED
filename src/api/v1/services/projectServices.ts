import { Project, PROJECTS } from "../models/interfaces";

class ProjectService {
  getAll(): Project[] {
    return PROJECTS;
  }

  getById(id: number): Project | null {
    return PROJECTS.find((p) => p.id === id) || null;
  }

  create(name: string, status: string): Project {
    const newProject: Project = {
      id: Math.max(...PROJECTS.map((p) => p.id)) + 1,
      name,
      status,
      createdAt: new Date().toISOString(),
    };
    PROJECTS.push(newProject);
    return newProject;
  }

  update(id: number, name?: string, status?: string): Project | null {
    const project = PROJECTS.find((p) => p.id === id);
    if (!project) return null;

    if (name) project.name = name;
    if (status) project.status = status;

    return project;
  }

  delete(id: number): boolean {
    const index = PROJECTS.findIndex((p) => p.id === id);
    if (index === -1) return false;

    PROJECTS.splice(index, 1);
    return true;
  }
}

export default new ProjectService();