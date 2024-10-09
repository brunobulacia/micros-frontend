import axios from 'axios';

export const fetchRoute = async (apiKey: string, startCoordinates: Array<number>, endCoordinates: Array<number>) => {
  const url = 'https://api.openrouteservice.org/v2/directions/driving-car';

  try {
    const response = await axios.get(url, {
      params: {
        api_key: apiKey,
        start: `${startCoordinates[0]},${startCoordinates[1]}`,  // Convertir las coordenadas a cadena
        end: `${endCoordinates[0]},${endCoordinates[1]}`,        // Convertir las coordenadas a cadena
      },
    });
    
    return response.data;  // El resultado de la API
  } catch (error) {
    console.error("Error al obtener la ruta:", error);
    throw error;
  }
};
