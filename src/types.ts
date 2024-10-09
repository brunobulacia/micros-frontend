

interface Coords {
    lon: number,
    lat: number
}

export interface Stop {
    nombre_parada: string,
    orden_parada: number,
    coordenadas: Coords
  }