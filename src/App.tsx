import { FormSection } from "./ui/layout/FormSection";
import ProjectsSection from "./ui/layout/ProjectsSection";
import Header from "./ui/layout/Header";
import { useEffect, useState, useRef } from "react";
import type { FileInputHandler } from "./ui/components/FileInput";

import { getSession, signOut } from "./api/supabaseClient";
import {
  uploadFile,
  addProjectToSupabase,
  fetchProjectDataFromSupabase,
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
        console.log("User is logged in:", session.data.session);
      } else {
        setIsLoggedIn(false);
        console.log("User is not logged in.");
      }
    };

    checkSession();
  }, [isLoggedIn]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleLogin = async () => {
    if (!password) {
      alert("Please enter a password.");
      return;
    }

    const { data, error } = await signInWithEmail(VITE_ADMIN_EMAIL, password);

    if (error || !data.session) {
      alert("Login failed. Please check your password and try again.");
      setIsLoggedIn(false);
      return;
    }

    setIsLoggedIn(true);
    alert("Login successful!");
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
      alert("Please fill in the required fields.");
      return;
    }

    setIsUploading(true);

    if (file) {
      const fileN = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;

      const { error: uploadError, imageUrl: uploadedImageUrl } =
        await uploadFile(file, fileN);

      if (uploadError) {
        console.error("File upload error:", uploadError);
        alert("File upload failed.");
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
      console.error("Project insert error:", projectError);
      alert("The project could not be saved.");
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
