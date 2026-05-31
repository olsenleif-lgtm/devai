"use client";

import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import type { DialogType, FormState, UseProjectDialogsReturn } from "@/hooks/use-project-dialogs";
import type { Project } from "@/types/project";

interface ProjectDialogsProps {
  openDialog: DialogType;
  selectedProject: Project | null;
  formState: FormState;
  isLoading: boolean;
  closeDialog: UseProjectDialogsReturn["closeDialog"];
  handleNameChange: UseProjectDialogsReturn["handleNameChange"];
  handleCreate: UseProjectDialogsReturn["handleCreate"];
  handleRename: UseProjectDialogsReturn["handleRename"];
  handleDelete: UseProjectDialogsReturn["handleDelete"];
}

export function ProjectDialogs({
  openDialog,
  selectedProject,
  formState,
  isLoading,
  closeDialog,
  handleNameChange,
  handleCreate,
  handleRename,
  handleDelete,
}: ProjectDialogsProps) {
  const renameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (openDialog === "rename") {
      requestAnimationFrame(() => {
        renameInputRef.current?.focus();
      });
    }
  }, [openDialog]);

  return (
    <>
      {/* Create Project */}
      <Dialog
        open={openDialog === "create"}
        onOpenChange={(open: boolean) => { if (!open) closeDialog(); }}
      >
        <DialogContent className="rounded-3xl bg-elevated sm:max-w-md" showCloseButton={false}>
          <DialogHeader>
            <DialogTitle className="text-copy-primary">New project</DialogTitle>
            <DialogDescription className="text-copy-muted">
              Give your project a name. You can rename it later.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-2 py-1">
            <Input
              value={formState.name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="My project"
              autoFocus
            />
            {formState.slug && (
              <p className="text-xs text-copy-muted">
                Slug:{" "}
                <span className="font-mono text-copy-secondary">{formState.slug}</span>
              </p>
            )}
          </div>

          <DialogFooter className="rounded-b-3xl">
            <Button variant="outline" onClick={closeDialog} disabled={isLoading}>
              Cancel
            </Button>
            <Button
              onClick={handleCreate}
              disabled={!formState.name.trim() || isLoading}
            >
              Create project
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rename Project */}
      <Dialog
        open={openDialog === "rename"}
        onOpenChange={(open: boolean) => { if (!open) closeDialog(); }}
      >
        <DialogContent className="rounded-3xl bg-elevated sm:max-w-md" showCloseButton={false}>
          <DialogHeader>
            <DialogTitle className="text-copy-primary">Rename project</DialogTitle>
            <DialogDescription className="text-copy-muted">
              Renaming &ldquo;{selectedProject?.name}&rdquo;
            </DialogDescription>
          </DialogHeader>

          <div className="py-1">
            <Input
              ref={renameInputRef}
              value={formState.name}
              onChange={(e) => handleNameChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && formState.name.trim()) handleRename();
              }}
              placeholder="Project name"
            />
          </div>

          <DialogFooter className="rounded-b-3xl">
            <Button variant="outline" onClick={closeDialog} disabled={isLoading}>
              Cancel
            </Button>
            <Button
              onClick={handleRename}
              disabled={!formState.name.trim() || isLoading}
            >
              Rename
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Project */}
      <Dialog
        open={openDialog === "delete"}
        onOpenChange={(open: boolean) => { if (!open) closeDialog(); }}
      >
        <DialogContent className="rounded-3xl bg-elevated sm:max-w-md" showCloseButton={false}>
          <DialogHeader>
            <DialogTitle className="text-copy-primary">Delete project</DialogTitle>
            <DialogDescription className="text-copy-muted">
              &ldquo;{selectedProject?.name}&rdquo; will be permanently deleted. This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="rounded-b-3xl">
            <Button variant="outline" onClick={closeDialog} disabled={isLoading}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={isLoading}>
              Delete project
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
