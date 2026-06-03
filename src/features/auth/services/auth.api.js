import axios from "axios";

const api = axios.create({
  baseURL: "https://mockmatebackend.onrender.com",
  // baseURL: "http://localhost:3000",
  withCredentials: true,
});

const registerUser = async ({ username, email, password }) => {
  try {
    const response = await api.post("/api/auth/register", {
      username,
      email,
      password,
    });

    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const loginUser = async ({ email, password }) => {
  try {
    const response = await api.post("/api/auth/login", { email, password });

    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const logoutUser = async () => {
  try {
    const respone = await api.get("/api/auth/logout");

    return respone.data;
  } catch (err) {
    console.log(err);
  }
};

const getMe = async () => {
  try {
    const respone = await api.get("/api/auth/getme");
    return respone.data;
  } catch (err) {
    console.log(err);
    console.log(err.response?.data?.message);
  }
};

export { registerUser, loginUser, logoutUser, getMe };
