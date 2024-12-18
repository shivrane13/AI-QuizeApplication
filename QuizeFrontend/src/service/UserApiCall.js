import { api } from "./api";

export async function getLogedInUserData() {
  try {
    const res = await api.get("/user/getLogedInUser");
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function createUser(data) {
  try {
    console.log(data);
    const res = await api.post("/user/createUser", data);
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function loginUser(data) {
  try {
    const res = await api.post("/user/loginuser", data);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}

export async function getLogedInUser() {
  try {
    const res = await api.get("/user/getLogedInUser");
    return res.data;
  } catch (error) {
    console.log(error);
  }
}
