import { FormSection } from "./ui/layout/FormSection";
import ProjectsSection from "./ui/layout/ProjectsSection";
import Header from "./ui/layout/Header";
import { useEffect, useState, useRef } from "react";
import type { FileInputHandler } from "./ui/components/FileInput";
import { Toaster, toast } from "sonner";
import { useAuth } from "./hooks/useAuth";
import type { Database } from "../types/database.types";
import { useProjectForm } from "./hooks/useProjectForm";
import { useProjects } from "./hooks/useProjects";

const dummyProjects: Database["public"]["Tables"]["portfolio-projects"]["Row"][] =
  [
    {
      id: 1,
      position: 1,
      title: "Beispielprojekt 1",
      desc: "",
      tags: ["React", "TypeScript", "TailwindCSS"],
      img: "https://via.placeholder.com/150",
      code: "https://via.placeholder.com/150",
      live: "https://via.placeholder.com/150",
      created_at: new Date().toISOString(),
    },
    {
      id: 2,
      position: 2,
      title: "Beispielprojekt 2",
      desc: "",
      tags: ["Vue", "JavaScript", "Bootstrap"],
      img: "https://via.placeholder.com/150",
      code: "https://via.placeholder.com/150",
      live: "https://via.placeholder.com/150",
      created_at: new Date().toISOString(),
    },
    {
      id: 3,
      position: 3,
      title: "Beispielprojekt 3",
      desc: "",
      tags: ["React", "TypeScript", "TailwindCSS"],
      img: "https://via.placeholder.com/150",
      code: "https://via.placeholder.com/150",
      live: "https://via.placeholder.com/150",
      created_at: new Date().toISOString(),
    },
  ];

function App() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const fileInputRef = useRef<FileInputHandler>(null);
  const [editingProjectId, setEditingProjectId] = useState<number | null>(null);

  const { isLoggedIn, password, setPassword, login, logout } = useAuth();
  const {
    isLoading,
    projects,
    updateProject,
    addProject,
    deleteProject,
    reorderProjects,
    loadProjects,
    clearProjects,
  } = useProjects();

  const {
    formState,
    error,
    isUploading,
    handleChange,
    handleFileSelect,
    save,
    resetForm,
    loadIntoForm,
  } = useProjectForm(
    addProject,
    updateProject,
    projects.length + 1,
    editingProjectId,
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleEdit = (id: number) => {
    const project = projects.find((p) => p.id === id);
    if (project) {
      setEditingProjectId(id);
      loadIntoForm(project);
    }
  };

  const handleDelete = (id: number) => {
    toast.warning(
      "Möchten Sie dieses Projekt wirklich löschen?",

      {
        cancel: {
          label: "Abbrechen",

          onClick: () => {
            toast.dismiss();
          },
        },
        action: {
          label: "Löschen",

          onClick: () => {
            deleteProject(id);
          },
        },
        actionButtonStyle: {
          background: "#3d5a8a",
          color: "#ffffff",
          border: "1px solid #3d5a8a",
        },
        cancelButtonStyle: {
          background: "transparent",
          color: "#fff",
          border: "1px solid #334155",
        },
      },
    );
  };

  const handleCancel = () => {
    setEditingProjectId(null);
    resetForm();
    fileInputRef.current?.reset();
  };

  const handleLogoutClick = () => logout(clearProjects);

  if (isLoggedIn === null) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-bg/30 text-ink">
        <span className="sr-only">Session loading...</span>
      </main>
    );
  }

  return (
    <>
      <Header
        onChangePassword={setPassword}
        onLogin={login}
        onLogout={handleLogoutClick}
        isLoggedIn={isLoggedIn}
        password={password}
      />
      <Toaster
        theme="system"
        position="top-center"
        richColors
        closeButton
        expand
        visibleToasts={4}
        toastOptions={{
          duration: 3000,
          className: "border border-line bg-bg text-ink shadow-lg",
          descriptionClassName: "text-ink-soft",
          actionButtonStyle: {
            background: "#2563eb",
            color: "#fff",
          },

          cancelButtonStyle: {
            background: "transparent",
            color: "#94a3b8",
            border: "1px solid #334155",
          },
        }}
      />
      <main className="flex flex-col items-center justify-start min-h-screen bg-bg/30 text-ink">
        <div className="flex flex-col gap-5 w-full max-w-(--maxw) px-7 pb-10">
          <FormSection
            isUploading={isUploading}
            inputRef={inputRef}
            titleError={error.title}
            descriptionError={error.description}
            tagsError={error.tags}
            githubRepoError={error.githubRepo}
            liveDemoError={error.liveDemo}
            fileError={error.fileName}
            position={projects.length + 1 + ""}
            ref={fileInputRef}
            fileName={formState.fileName || ""}
            onSave={save}
            onCancel={handleCancel}
            onChange={handleChange}
            onFileChange={handleFileSelect}
            isLoggedIn={isLoggedIn}
            title={formState.title}
            description={formState.description}
            tags={formState.tags}
            githubRepo={formState.githubRepo}
            liveDemo={formState.liveDemo}
          />
          <ProjectsSection
            handleDragAndDrop={reorderProjects}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            isLoading={isLoading}
            projects={isLoggedIn ? projects : dummyProjects}
            onRefresh={loadProjects}
          />
        </div>
      </main>
    </>
  );
}

export default App;
