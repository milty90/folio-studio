import type { Database } from "../../types/database.types";
import { supabase } from "./supabase";

type ProjectUpdate =
  Database["public"]["Tables"]["portfolio-projects"]["Update"];

export async function fetchProjectDataFromSupabase() {
  const response = await supabase.from("portfolio-projects").select("*");
  if (response.error) {
    console.error("Error fetching project data:", response.error);
  }
  return response.data;
}

export async function addProjectToSupabase(
  projectData: Database["public"]["Tables"]["portfolio-projects"]["Insert"],
) {
  const response = await supabase
    .from("portfolio-projects")
    .insert([projectData])
    .select();

  if (response.error) {
    console.error("Error adding project data:", response.error);
  }
  return response;
}

export async function updateProjectInSupabase(
  id: number,
  project: ProjectUpdate,
) {
  const { data, error } = await supabase
    .from("portfolio-projects")
    .update(project)
    .eq("id", id)
    .select()
    .single();

  return { data, error };
}

export async function updateProjectPositions(
  updates: {
    id: number;
    position: number;
  }[],
) {
  const { data, error } = await supabase
    .from("portfolio-projects")
    .upsert(updates, { onConflict: "id" })
    .select();

  return { data, error };
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

  const { data: signedUrlData, error: signedUrlError } = await supabase.storage
    .from("images")
    .createSignedUrl(uploadData.path, 60 * 60 * 24 * 365);

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

export async function deleteProjectFromSupabase(projectId: number) {
  const { error } = await supabase
    .from("portfolio-projects")
    .delete()
    .eq("id", projectId);
  if (error) {
    console.error("Error deleting project:", error);
  }
  return { error };
}

export const deleteFileFromBucket = async (fileName: string) => {
  const { error } = await supabase.storage.from("images").remove([fileName]);
  if (error) {
    console.error("Error deleting file:", error);
  }
  return { error };
};
