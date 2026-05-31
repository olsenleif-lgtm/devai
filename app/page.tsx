"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EditorNavbar } from "@/components/editor/editor-navbar";
import { ProjectSidebar } from "@/components/editor/project-sidebar";
import { ProjectDialogs } from "@/components/editor/project-dialogs";
import { useProjectDialogs } from "@/hooks/use-project-dialogs";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();

  const {
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
  } = useProjectDialogs();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.replace("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) return null;
  if (!isSignedIn) return null;

  return (
    <div className="flex flex-col h-screen bg-base">
      <EditorNavbar
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
      />
      <ProjectSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNewProject={openCreateDialog}
        onRenameProject={openRenameDialog}
        onDeleteProject={openDeleteDialog}
        projects={projects}
      />
      <main className="flex-1 mt-12 flex items-center justify-center">
        <div className="flex flex-col items-center gap-6 text-center px-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-semibold text-copy-primary">
              Create a project or open an existing one
            </h1>
            <p className="text-sm text-copy-muted">
              Start a new architecture workspace, or choose a project from the sidebar.
            </p>
          </div>
          <Button onClick={openCreateDialog} className="gap-2">
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>
      </main>
      <ProjectDialogs
        openDialog={openDialog}
        selectedProject={selectedProject}
        formState={formState}
        isLoading={isLoading}
        closeDialog={closeDialog}
        handleNameChange={handleNameChange}
        handleCreate={handleCreate}
        handleRename={handleRename}
        handleDelete={handleDelete}
      />
    </div>
  );
}
