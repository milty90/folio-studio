import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  fetchProjectDataFromSupabase,
  deleteProjectFromSupabase,
  updateProjectPositions,
} from "../api/fetchProjectData";
import type { Database } from "../../types/database.types";

type Project = Database["public"]["Tables"]["portfolio-projects"]["Row"];

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadProjects = useCallback(async () => {
    setIsLoading(true);
    if (!isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
    const data = await fetchProjectDataFromSupabase();
    if (data) setProjects(data);
  }, [isLoading]);

  useEffect(() => {
    let isCancelled = false;

    fetchProjectDataFromSupabase().then((data) => {
      if (!isCancelled && data) {
        setProjects(data);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, []);

  const addProject = (project: Project | Project[]) => {
    const items = Array.isArray(project) ? project : [project];
    setProjects((prev) => [...prev, ...items]);
  };

  const updateProject = (updatedProject: Project) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === updatedProject.id ? updatedProject : project,
      ),
    );
  };

  const deleteProject = (id: number) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    deleteProjectFromSupabase(id);
    toast.success("Projekt erfolgreich gelöscht!");
  };

  const reorderProjects = (draggedIndex: number, dragOverIndex: number) => {
    setProjects((prev) => {
      const sorted = [...prev].sort(
        (a, b) => (a.position ?? prev.length) - (b.position ?? prev.length),
      );
      const [moved] = sorted.splice(draggedIndex, 1);
      sorted.splice(dragOverIndex, 0, moved);

      const withNewPositions = sorted.map((p, i) => ({ ...p, position: i }));

      updateProjectPositions(
        withNewPositions.map((p) => ({ id: p.id, position: p.position })),
      ).then(({ error }) => {
        if (error) {
          toast.error("Reihenfolge konnte nicht gespeichert werden.");
          console.error(error);
        } else {
          toast.success("Reihenfolge erfolgreich gespeichert!");
        }
      });

      return withNewPositions;
    });
  };

  const clearProjects = () => setProjects([]);

  return {
    projects,
    updateProject,
    setProjects,
    loadProjects,
    addProject,
    deleteProject,
    reorderProjects,
    clearProjects,
    isLoading,
  };
}
