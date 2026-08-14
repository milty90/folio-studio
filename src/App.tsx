import { FormSection } from "./ui/layout/FormSection";
import { ProjectsSection } from "./ui/layout/ProjectsSection";
import Header from "./ui/layout/Header";
import { useEffect, useState } from "react";
import { fetchProjectData } from "./api/fetchProjectData";
import type { Database } from "../types/database.types";

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [githubRepo, setGithubRepo] = useState("");
  const [liveDemo, setLiveDemo] = useState("");

  const [array, setArray] = useState<
    Database["public"]["Tables"]["portfolio-projects"]["Row"][] | null
  >(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProjectData();
      if (data) {
        setArray(data);
      }
    };

    fetchData();
  }, []);

  const handleSave = () => {
    const newProject = {
      title,
      description,
      tags: tags.split(",").map((tag) => tag.trim()),
      githubRepo,
      liveDemo,
    };

    localStorage.setItem(
      "projects",
      JSON.stringify([...(array || []), newProject]),
    );

    setTitle("");
    setDescription("");
    setTags("");
    setGithubRepo("");
    setLiveDemo("");
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

  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-start min-h-screen bg-bg/30 text-ink">
        <div className="flex flex-col gap-5 w-full max-w-(--maxw) px-7 pb-10">
          <FormSection
            onSave={handleSave}
            onCancel={handleCancel}
            onChange={handleChange}
            title={title}
            description={description}
            mainImage={null}
            tags={tags}
            githubRepo={githubRepo}
            liveDemo={liveDemo}
          />

          <ProjectsSection projects={array || []} />
        </div>
      </main>
    </>
  );
}

export default App;
