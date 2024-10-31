import axios from "./axios";
import { useAuthStore } from "@/store/auth";
export const setEstado = async ({ estado, id_micro }: { estado: string; id_micro: number }) => {
    const url = `/micros/agregarEstado`;
    return await axios.post(url, { estado, id_micro, token: useAuthStore.getState().token });
}