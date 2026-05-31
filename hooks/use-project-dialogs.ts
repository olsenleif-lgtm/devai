"use client";

import { useState } from "react";
import { MOCK_PROJECTS, type Project } from "@/types/project";

export type DialogType = "create" | "rename" | "delete" | null;

export interface FormState {
  name: string;
  slug: string;
}

export interface UseProjectDialogsReturn {
  projects: Project[];
  openDialog: DialogType;
  selectedProject: Project | null;
  formState: FormState;
  isLoading: boolean;
  openCreateDialog: () => void;
  openRenameDialog: (project: Project) => void;
  openDeleteDialog: (project: Project) => void;
  closeDialog: () => void;
  handleNameChange: (name: string) => void;
  handleCreate: () => void;
  handleRename: () => void;
  handleDelete: () => void;
}

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function generateId(): string {
  return Math.random().toString(36).slice(2, 9);
}

export function useProjectDialogs(): UseProjectDialogsReturn {
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [openDialog, setOpenDialog] = useState<DialogType>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [formState, setFormState] = useState<FormState>({ name: "", slug: "" });
  const [isLoading, setIsLoading] = useState(false);

  const openCreateDialog = () => {
    setFormState({ name: "", slug: "" });
    setSelectedProject(null);
    setOpenDialog("create");
  };

  const openRenameDialog = (project: Project) => {
    setFormState({ name: project.name, slug: project.slug });
    setSelectedProject(project);
    setOpenDialog("rename");
  };

  const openDeleteDialog = (project: Project) => {
    setSelectedProject(project);
    setOpenDialog("delete");
  };

  const closeDialog = () => {
    setOpenDialog(null);
    setSelectedProject(null);
    setFormState({ name: "", slug: "" });
    setIsLoading(false);
  };

  const handleNameChange = (name: string) => {
    setFormState({ name, slug: generateSlug(name) });
  };

  const handleCreate = () => {
    setIsLoading(true);
    const newProject: Project = {
      id: generateId(),
      name: formState.name.trim(),
      slug: formState.slug,
      owned: true,
    };
    setProjects((prev) => [...prev, newProject]);
    closeDialog();
  };

  const handleRename = () => {
    setIsLoading(true);
    if (!selectedProject) return;
    setProjects((prev) =>
      prev.map((p) =>
        p.id === selectedProject.id
          ? { ...p, name: formState.name.trim(), slug: formState.slug }
          : p
      )
    );
    closeDialog();
  };

  const handleDelete = () => {
    setIsLoading(true);
    if (!selectedProject) return;
    setProjects((prev) => prev.filter((p) => p.id !== selectedProject.id));
    closeDialog();
  };

  return {
    projects,
    openDialog,
    selectedProject,
    formState,
    isLoading,
    openCreateDialog,
    openRenameDialog,
    openDeleteDialog,
    closeDialog,
    handleNameChange,
    handleCreate,
    handleRename,
    handleDelete,
  };
}
