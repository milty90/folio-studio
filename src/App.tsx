import { FormSection } from "./ui/layout/FormSection";
import ProjectsSection from "./ui/layout/ProjectsSection";
import Header from "./ui/layout/Header";
import { useEffect, useState, useRef } from "react";
import type { FileInputHandler } from "./ui/components/FileInput";
import { Toaster, toast } from "sonner";
import { getSession, signOut } from "./api/supabaseClient";
import {
  uploadFile,
  addProjectToSupabase,
  fetchProjectDataFromSupabase,
  deleteFileFromBucket,
} from "./api/fetchProjectData";
import { signInWithEmail } from "./api/supabaseClient";
import type { Database } from "../types/database.types";
const { VITE_ADMIN_EMAIL } = import.meta.env;

const dummyProjects: Database["public"]["Tables"]["portfolio-projects"]["Row"][] =
  [
    {
      id: 1,
      title: "Beispielprojekt 1",
      descr: "",
      tags: ["React", "TypeScript", "TailwindCSS"],
      img: "https://via.placeholder.com/150",
      code: "https://via.placeholder.com/150",
      live: "https://via.placeholder.com/150",
      created_at: new Date().toISOString(),
      desc: "This is a sample project description ",
    },
  ];

function App() {
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(false);
  const [tags, setTags] = useState("");
  const [tagsError, setTagsError] = useState(false);
  const [githubRepo, setGithubRepo] = useState("");
  const [githubRepoError, setGithubRepoError] = useState(false);
  const [liveDemo, setLiveDemo] = useState("");
  const [liveDemoError, setLiveDemoError] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState(false);
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<FileInputHandler>(null);
  const [fileTitle, setFileTitle] = useState<string>();

  const [projects, setProjects] = useState<
    Database["public"]["Tables"]["portfolio-projects"]["Row"][]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProjectDataFromSupabase();
      if (data) {
        setProjects(data);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (session.data?.session) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        toast.error("Bitte melden Sie sich an.");
      }
    };

    checkSession();
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleLogin = async () => {
    if (!password) {
      toast.error("Bitte geben Sie ein Passwort ein.");
      return;
    }

    const { data, error } = await signInWithEmail(VITE_ADMIN_EMAIL, password);

    if (error || !data.session) {
      toast.error(
        "Login fehlgeschlagen. Bitte überprüfen Sie Ihr Passwort und versuchen Sie es erneut.",
      );
      setIsLoggedIn(false);
      return;
    }

    setIsLoggedIn(true);
    toast.success("Login erfolgreich!");
  };

  const handleLogout = async () => {
    await signOut();
    setProjects([]);
    setIsLoggedIn(false);
  };

  const handleSave = async () => {
    let imageUrl: string = "";

    if (
      !title.trim() ||
      !description.trim() ||
      !tags.trim() ||
      !githubRepo.trim() ||
      !liveDemo.trim() ||
      !file
    ) {
      if (!title.trim()) setTitleError(true);
      if (!description.trim()) setDescriptionError(true);
      if (!tags.trim()) setTagsError(true);
      if (!githubRepo.trim()) setGithubRepoError(true);
      if (!liveDemo.trim()) setLiveDemoError(true);
      if (!file) setFileError(true);
      toast.error("Bitte füllen Sie die erforderlichen Felder aus.");
      return;
    }

    setIsUploading(true);

    try {
      const fileN = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;

      if (file) {
        const { error: uploadError, imageUrl: uploadedImageUrl } =
          await uploadFile(file, fileN);

        if (uploadError) {
          toast.error("Datei-Upload fehlgeschlagen.");
          return;
        }

        imageUrl = uploadedImageUrl;
      }

      const newProject = {
        title,
        descr: description,
        tags: tags
          .split(/[,\s]+/)
          .map((tag) => tag.trim().replace(/^"|"$/g, ""))
          .filter((tag) => tag.length > 0),
        img: imageUrl || "",
        code: githubRepo,
        live: liveDemo,
        created_at: new Date().toISOString(),
        desc: description,
      };

      const { data: insertedProject, error: projectError } =
        await addProjectToSupabase(newProject);

      if (projectError || !insertedProject) {
        if (fileN) {
          const { error: deleteError } = await deleteFileFromBucket(fileN);
          if (deleteError) {
            console.error(
              "Projekt speichern fehlgeschlagen und Datei konnte nicht gelöscht werden:",
              deleteError,
            );
          }
        }

        toast.error("Projekt speichern fehlgeschlagen.");
        return;
      }

      const projectsWithSignedUrl = insertedProject.map((project) => ({
        ...project,
        img: imageUrl || project.img,
      }));

      setProjects((currentProjects) => [
        ...currentProjects,
        ...projectsWithSignedUrl,
      ]);

      setTitle("");
      setDescription("");
      setTags("");
      setGithubRepo("");
      setLiveDemo("");
      setFile(null);
      setFileTitle("");
      fileInputRef.current?.reset();
      setIsUploading(false);
      toast.success("Projekt erfolgreich gespeichert!");
    } finally {
      setIsUploading(false);
    }
  };
  const handleCancel = () => {
    setTitle("");
    setTitleError(false);
    setDescription("");
    setDescriptionError(false);
    setTags("");
    setTagsError(false);
    setGithubRepo("");
    setGithubRepoError(false);
    setLiveDemo("");
    setLiveDemoError(false);
    setFile(null);
    setFileError(false);
    setFileTitle("");
    fileInputRef.current?.reset();
  };

  const handleChange = (field: string, value: string) => {
    switch (field) {
      case "title":
        setTitle(value);
        if (value.trim()) setTitleError(false);
        break;
      case "description":
        setDescription(value);
        if (value.trim()) setDescriptionError(false);
        break;
      case "tags":
        setTags(value);
        if (value.trim()) setTagsError(false);
        break;
      case "githubRepo":
        setGithubRepo(value);
        if (value.trim()) setGithubRepoError(false);
        break;
      case "liveDemo":
        setLiveDemo(value);
        if (value.trim()) setLiveDemoError(false);
        break;
      default:
        break;
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const handleFileSelect = (selectedFile: File | null) => {
    setFile(selectedFile);
    setFileError(false);
    setFileTitle(selectedFile?.name ?? "");
  };

  const handleRefresh = async () => {
    const data = await fetchProjectDataFromSupabase();
    if (data) {
      setProjects(data);
    }
  };

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
        onChangePassword={handlePasswordChange}
        onLogin={handleLogin}
        onLogout={handleLogout}
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
            titleError={titleError}
            descriptionError={descriptionError}
            tagsError={tagsError}
            githubRepoError={githubRepoError}
            liveDemoError={liveDemoError}
            fileError={fileError}
            position={projects.length + 1 + ""}
            ref={fileInputRef}
            fileName={fileTitle || ""}
            onSave={handleSave}
            onCancel={handleCancel}
            onChange={handleChange}
            onFileChange={handleFileSelect}
            isLoggedIn={isLoggedIn}
            title={title}
            description={description}
            tags={tags}
            githubRepo={githubRepo}
            liveDemo={liveDemo}
          />
          <ProjectsSection
            projects={isLoggedIn ? projects : dummyProjects}
            onRefresh={handleRefresh}
          />
        </div>
      </main>
    </>
  );
}

export default App;
