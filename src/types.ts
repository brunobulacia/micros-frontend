interface Coords {
    lon: number,
    lat: number
}

export interface Stop {
    id_parada: string | null;
    nombre_parada: string,
    orden_parada: number,
    coordenadas: Coords,
    token: string, //todo Hay que quitar esto cuando arreglemos la webada de las cookies
}

export interface Driver {
    usuario: string;
    licencia_categoria: string;
    nombre: string;
    apellido: string;
    correo: string;
    carnet: string;
    sexo: "M" | "F";
    telefonos: Array<string>
}

export interface RouteType {
    duracion_estimada: string;
    id_linea: number;
    id_ruta: number;
    longitud_total: string;
}

export interface DecodedToken {
    id: string
    role: string
}

export interface Line {
    id_linea: number;
    nombre_linea: string;
    id_sindicato: number;
  }

export type FormData = {
    usuario: string;
    contraseña: string;
    confirmar_contraseña: string;
    nombre: string;
    apellido: string;
    correo: string;
    sexo: string;
    fecha_de_nacimiento: string;
    direccion: string;
    telefonos: Array<string>;
    carnet: string;
  };