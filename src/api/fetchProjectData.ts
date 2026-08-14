import supabase from "./supabase";

export async function fetchProjectData() {
  const response = await supabase.from("portfolio-projects").select("*");
  if (response.error) {
    console.error("Error fetching project data:", response.error);
  } else {
    console.log("Project data:", response.data);
  }
  return response.data;
}
