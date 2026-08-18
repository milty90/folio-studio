import type { Database } from "../../types/database.types";
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

export async function addProjectToSupabase(projectData: Database["public"]["Tables"]["portfolio-projects"]["Insert"]) {
  const response = await supabase
    .from("portfolio-projects")
    .insert([projectData])
    .select();

  if (response.error) {
    console.error("Error adding project data:", response.error);
  } else {
    console.log("Project added:", response.data);
  }

  return response;
}

export async function uploadFile(file: File, fileName: string) {
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("images")
    .upload(fileName, file, {
      upsert: false,
    });

  if (uploadError || !uploadData.path) {
    console.error("Error uploading file:", uploadError);

    return {
      imagePath: "",
      imageUrl: "",
      error: uploadError,
    };
  } 

  const { data: signedUrlData, error: signedUrlError } =
    await supabase.storage
      .from("images")
      .createSignedUrl(uploadData.path, 3600);


  if (signedUrlError || !signedUrlData) {
    console.error("Error creating signed URL:", signedUrlError);

    return {
      imagePath: uploadData.path,
      imageUrl: "",
      error: signedUrlError,
    };
  }

  return {
    imagePath: uploadData.path,
    imageUrl: signedUrlData.signedUrl,
    error: null,
  };
}

