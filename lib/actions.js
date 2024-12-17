"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

function isInvalidText(text) {
  return !text || text.trim() == "";
}

export async function shareMeal(prevState, formData) {
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    image: formData.get("image"),
    instructions: formData.get("instructions"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  console.log(meal);
  // const response = await fetch("http://localhost:3000/api/meals", {
  //   method: "POST",
  // }

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    !meal.image || meal.image.size == 0
  ) {
    return {
      message: "Please provide valid information",
    }
  }

  await saveMeal(meal);
  revalidatePath("/meals");
  redirect('/meals');    
}
