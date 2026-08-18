import { FormSection } from "./ui/layout/FormSection";
import ProjectsSection from "./ui/layout/ProjectsSection";
import Header from "./ui/layout/Header";
import { useEffect, useState } from "react";
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
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [githubRepo, setGithubRepo] = useState("");
  const [liveDemo, setLiveDemo] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

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
  

  if (file) {
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;

    const {
      error: uploadError,
    
      imageUrl: uploadedImageUrl,
    } = await uploadFile(file, fileName);

    if (uploadError) {
      console.error("File upload error:", uploadError);
      alert("A fájl feltöltése sikertelen.");
      return;
    }

    imageUrl = uploadedImageUrl;
    
  }


  const newProject = {
    title,
    descr: description,
   
    tags: tags.split(",").map((tag) => tag.trim().replace(/^"|"$/g, "")),
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
};
  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setTags("");
    setGithubRepo("");
    setLiveDemo("");
  };

  const handleChange = (field: string, value: string) => {
    switch (field) {
      case "title":
        setTitle(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "tags":
        setTags(value);
        break;
      case "githubRepo":
        setGithubRepo(value);
        break;
      case "liveDemo":
        setLiveDemo(value);
        break;
      default:
        break;
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
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
            onSave={handleSave}
            onCancel={handleCancel}
            onChange={handleChange}
            onFileChange={setFile}
            isLoggedIn={isLoggedIn}
            title={title}
            description={description}
            tags={tags}
            githubRepo={githubRepo}
            liveDemo={liveDemo}
          />

          <ProjectsSection projects={isLoggedIn ? projects : dummyProjects} />
        </div>
      </main>
    </>
  );
}

export default App;
