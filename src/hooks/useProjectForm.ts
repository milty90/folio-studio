import { useState } from "react";
import { toast } from "sonner";
import {
  uploadFile,
  addProjectToSupabase,
  updateProjectInSupabase,
  deleteFileFromBucket,
} from "../api/fetchProjectData";
import type { Database } from "../../types/database.types";

type Project = Database["public"]["Tables"]["portfolio-projects"]["Row"];

interface FormState {
  title: string;
  description: string;
  tags: string;
  githubRepo: string;
  liveDemo: string;
  image: File | null;
  fileName: string;
  existingImageUrl?: string;
}

const initialFormState: FormState = {
  title: "",
  description: "",
  tags: "",
  githubRepo: "",
  liveDemo: "",
  image: null,
  fileName: "",
  existingImageUrl: undefined,
};

const getFileNameFromUrl = (url: string) => {
  try {
    console.log(url);
    return decodeURIComponent(url.split("/").pop()?.split("?token")[0] ?? "");
  } catch {
    return "";
  }
};

const parseTags = (tags: string) =>
  tags
    .split(/[,\s]+/)
    .map((tag) => tag.trim().replace(/^"|"$/g, ""))
    .filter((tag) => tag.length > 0);

export function useProjectForm(
  onCreated: (project: Project | Project[]) => void,
  onUpdated: (project: Project) => void,
  nextPosition: number,
  editingProjectId: number | null,
) {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [error, setError] = useState({
    title: false,
    description: false,
    tags: false,
    githubRepo: false,
    liveDemo: false,
    image: false,
    fileName: false,
  });

  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (field: string, value: string | string[]) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileSelect = (image: File | null) => {
    setFormState((prev) => ({
      ...prev,
      image: image,
      fileName: image ? image.name : "Kein Bild ausgewählt",
    }));

    setError((prev) => ({
      ...prev,
      image: false,
      fileName: false,
    }));
  };

  const resetForm = () => {
    setFormState(initialFormState);
    setError({
      title: false,
      description: false,
      tags: false,
      githubRepo: false,
      liveDemo: false,
      image: false,
      fileName: false,
    });
  };

  const validate = () => {
    const isCreatingProject = editingProjectId === null;
    const hasImage = Boolean(formState.image || formState.existingImageUrl);

    const newError = {
      title: !formState.title.trim(),
      description: !formState.description.trim(),
      tags: !formState.tags.trim(),
      githubRepo: !formState.githubRepo.trim(),
      liveDemo: !formState.liveDemo.trim(),
      image: !hasImage && isCreatingProject,
      fileName: !formState.fileName.trim(),
    };

    setError(newError);
    return !Object.values(newError).some(Boolean);
  };

  const save = async () => {
    if (!validate()) {
      toast.error("Bitte füllen Sie die erforderlichen Felder aus.");
      return;
    }

    setIsUploading(true);

    try {
      let imageUrl = formState.existingImageUrl;

      if (formState.image) {
        const fileName = `${Date.now()}-${formState.image.name.replace(/\s+/g, "_")}`;
        const { error: uploadError, imageUrl: uploadedUrl } = await uploadFile(
          formState.image,
          fileName,
        );

        if (uploadError || !uploadedUrl) {
          deleteFileFromBucket(fileName);
          toast.error("Datei-Upload fehlgeschlagen.");
          return;
        }

        imageUrl = uploadedUrl;
      }

      const projectPayload = {
        title: formState.title,
        desc: formState.description,
        tags: parseTags(formState.tags),
        code: formState.githubRepo,
        live: formState.liveDemo,
        img: imageUrl,
      };

      if (editingProjectId !== null) {
        const { data, error: updateError } = await updateProjectInSupabase(
          editingProjectId,
          projectPayload,
        );

        if (updateError || !data) {
          console.error(updateError);
          toast.error("Projekt konnte nicht aktualisiert werden.");
          return;
        }

        onUpdated(data);
        toast.success("Projekt erfolgreich aktualisiert!");
      } else {
        const { data, error: createError } = await addProjectToSupabase({
          ...projectPayload,
          position: nextPosition,
          created_at: new Date().toISOString(),
        });

        if (createError || !data) {
          toast.error("Projekt konnte nicht gespeichert werden.");
          return;
        }

        onCreated(data);
        toast.success("Projekt erfolgreich gespeichert!");
      }

      resetForm();
    } finally {
      setIsUploading(false);
    }
  };

  const loadIntoForm = (project: Project) => {
    setFormState({
      title: project.title || "",
      description: project.desc || "",
      tags: (project.tags as string[])?.join(", ") || "",
      githubRepo: project.code || "",
      liveDemo: project.live || "",
      image: null,
      fileName: getFileNameFromUrl(project.img || ""),
      existingImageUrl: project.img || undefined,
    });
  };

  return {
    formState,
    setFormState,
    error,
    setError,
    isUploading,
    setIsUploading,
    handleChange,
    handleFileSelect,
    resetForm,
    loadIntoForm,
    save,
  };
}
