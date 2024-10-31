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

export type UserData = {
    usuario: string | null;
    contraseña: string | null;
    confirmar_contraseña: string | null;
    nombre: string | null;
    apellido: string | null;
    correo: string | null;
    sexo: string | null;
    fecha_de_nacimiento: string | null;
    direccion: string | null;
    telefonos: Array<string> | null;
    carnet: string | null;
    token: string | null
  };

  export type updatePasswordData = {
    contraseña: string;
    confirmar_contraseña: string;
    nueva_contraseña: string;
  };

  export interface LoginData {
    usuario: string;
    contraseña: string;
  }

  export interface MicroData {
    placa: string;
    interno: string;
    modelo: string;
    año: number;
    seguro: string;
    linea: number;
    dueño: number;
  }

  export interface Turno {
    id_turno: string;
    chofer: string;
    interno: string;
    placa: string;
    id_horario: string;
    fecha_horario: string;
    hora_salida: string;
    hora_llegada: string;
    punto_salida: string;
  }

  export interface TurnoData {
    chofer: string;
    interno: string;
    partida: string;
  }