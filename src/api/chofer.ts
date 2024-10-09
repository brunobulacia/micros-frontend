import axios from "./axios";

export const choferRes = async (token: string) => axios.post("/usuarios/choferes", 
    {
        token: token
    }
);


export const crearChofer = async (
    choferData: { usuario: string; licencia: string },
    token: string
  ) => {
    try {
      const response = await axios.post(
        "/usuarios/crearChofer", 
        choferData,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error al crear chofer:", error); 
      throw error; 
    }
  };
