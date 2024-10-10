import { isAxiosError } from "axios";

export function handleAxiosError(error: unknown) {
    if(isAxiosError(error) && error.response) 
        alert(error.response.data.message)
      else 
        console.error("Error desconocido: ", error);
}