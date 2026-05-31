"use client";

import { Plus, X, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Project } from "@/types/project";

interface ProjectSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNewProject: () => void;
  onRenameProject: (project: Project) => void;
  onDeleteProject: (project: Project) => void;
  projects: Project[];
}

function ProjectItem({
  project,
  onRename,
  onDelete,
}: {
  project: Project;
  onRename: (project: Project) => void;
  onDelete: (project: Project) => void;
}) {
  return (
    <div className="group flex items-center gap-1 px-2 py-1.5 rounded-xl hover:bg-subtle cursor-pointer">
      <span className="flex-1 text-sm text-copy-primary truncate">{project.name}</span>
      {project.owned && (
        <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
          <Button
            variant="ghost"
            size="xs"
            className="text-copy-muted hover:text-copy-primary"
            onClick={(e) => {
              e.stopPropagation();
              onRename(project);
            }}
            aria-label={`Rename ${project.name}`}
          >
            <Pencil className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="xs"
            className="text-copy-muted hover:text-state-error"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(project);
            }}
            aria-label={`Delete ${project.name}`}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      )}
    </div>
  );
}

export function ProjectSidebar({
  isOpen,
  onClose,
  onNewProject,
  onRenameProject,
  onDeleteProject,
  projects,
}: ProjectSidebarProps) {
  const ownedProjects = projects.filter((p: Project) => p.owned);
  const sharedProjects = projects.filter((p: Project) => !p.owned);

  return (
    <>
      {/* Mobile backdrop scrim */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 sm:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <div
        aria-hidden={!isOpen}
        className={`fixed top-12 left-0 bottom-0 z-40 w-72 flex flex-col bg-elevated border-r border-surface-border transition-transform duration-200 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-surface-border">
          <span className="text-sm font-medium text-copy-primary">Projects</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close project sidebar"
            className="h-7 w-7 text-copy-muted hover:text-copy-primary"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <Tabs defaultValue="my-projects" className="flex flex-col flex-1 overflow-hidden px-4 pt-3">
          <TabsList className="w-full">
            <TabsTrigger value="my-projects" className="flex-1">My Projects</TabsTrigger>
            <TabsTrigger value="shared" className="flex-1">Shared</TabsTrigger>
          </TabsList>

          <TabsContent value="my-projects" className="flex-1 overflow-hidden mt-2">
            {ownedProjects.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-sm text-copy-muted">No projects yet</p>
              </div>
            ) : (
              <ScrollArea className="h-full">
                <div className="flex flex-col gap-0.5 pb-2">
                  {ownedProjects.map((project) => (
                    <ProjectItem
                      key={project.id}
                      project={project}
                      onRename={onRenameProject}
                      onDelete={onDeleteProject}
                    />
                  ))}
                </div>
              </ScrollArea>
            )}
          </TabsContent>

          <TabsContent value="shared" className="flex-1 overflow-hidden mt-2">
            {sharedProjects.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-sm text-copy-muted">No shared projects</p>
              </div>
            ) : (
              <ScrollArea className="h-full">
                <div className="flex flex-col gap-0.5 pb-2">
                  {sharedProjects.map((project) => (
                    <ProjectItem
                      key={project.id}
                      project={project}
                      onRename={onRenameProject}
                      onDelete={onDeleteProject}
                    />
                  ))}
                </div>
              </ScrollArea>
            )}
          </TabsContent>
        </Tabs>

        <div className="p-4 border-t border-surface-border">
          <Button className="w-full gap-2" onClick={onNewProject}>
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>
      </div>
    </>
  );
}
