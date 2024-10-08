import axios from "./axios";

export const loginRequest = async (user) => axios.post("/login", user);

export const profileRequest = async () => axios.get("/perfil");

export const signupRequest = async (user) => axios.post("/register", user);
export const verifyTokenRequest = () => axios.get("/verify");
export const updateUserRequest = async (user) =>
  axios.put("/usuarios/update", user);
