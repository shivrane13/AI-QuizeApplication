import { api } from "./api";

export async function getQuestions({ prompt, numberOfQuestions }) {
  const data = await api.post("/quize", {
    prompt,
    numberOfQuestions,
  });
  return data.data;
}

export async function saveHistory(formData) {
  try {
    const data = await api.post("/quize/saveHistory", formData);
    return data.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getHistory() {
  try {
    const res = await api.get("/quize/getAllHistory");
    return res.data;
  } catch (error) {
    console.log(error);
  }
}
