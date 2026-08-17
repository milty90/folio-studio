import { supabase } from "./supabase";

export async function fetchProjectDataFromSupabase() {
  const response = await supabase.from("portfolio-projects").select("*");
  if (response.error) {
    console.error("Error fetching project data:", response.error);
  } else {
    console.log("Project data:", response.data);
  }
  return response.data;
}

export async function addProjectToSupabase(projectData: any) {
  const response = await supabase
    .from("portfolio-projects")
    .insert([projectData]);
  if (response.error) {
    console.error("Error adding project data:", response.error);
  } else {
    console.log("Project added:", response.data);
  }
  return response.data;
}

export async function uploadFile(file: File) {
  const { data, error } = await supabase.storage
    .from("images")
    .upload(file.name, file, { upsert: true });
  if (error) {
    console.error("Error uploading file", error);
  } else {
    console.log("File uploaded successfully: ", data);
  }
}
