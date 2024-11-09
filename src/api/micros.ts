import axios from "./axios";

export const getMicros = async (token: string) =>
  axios.post("/micros", { token: token });
