import axios from "./axios";

export const loginRequest = async (user) => axios.post("/login", user);

export const profileRequest = async () => axios.get("/perfil");

export const signupRequest = async (user) => axios.post("/register", user);

export const verifyTokenRequest = () => axios.get("/verify");

export const updateUserRequest = async (user) =>
  axios.put("/usuarios/update", user);

export const bitacoraRequest = async (token: string) =>
  axios.post("/usuarios/bitacora", {
    token,
  });

export const updatePassword = async (
  pass: string,
  newPass: string,
  token: string
) => {
  const res = await axios.put("/usuarios/actualizarPass", {
    contraseña_actual: pass,
    contraseña_nueva: newPass,
    token,
  });

  return res;
};
