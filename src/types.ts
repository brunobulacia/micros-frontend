export type ToastActionElement = React.ReactNode;
export interface ToastProps {
  title: React.ReactNode;
  description: React.ReactNode;
  action?: ToastActionElement;
}

interface Coords {
  lon: number;
  lat: number;
}

export interface Stop {
  id_parada: string | null;
  nombre_parada: string;
  orden_parada: number;
  coordenadas: Coords;
  token: string; //todo Hay que quitar esto cuando arreglemos la webada de las cookies
}

export interface Driver {
  usuario: string;
  licencia_categoria: string;
  nombre: string;
  apellido: string;
  correo: string;
  carnet: string;
  sexo: "M" | "F";
  telefonos: Array<string>;
}

export interface RouteType {
  duracion_estimada: string;
  id_linea: number;
  id_ruta: number;
  longitud_total: string;
  nombre_ruta: string;
}

export interface DecodedToken {
  id: string;
  role: string;
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
  token: string | null;
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
  hora_salida: string;
  hora_llegada?: string; // Es posible que la hora de llegada sea opcional
  fecha: string; // Nueva propiedad
  punto_de_salida: string; // Nueva propiedad
}

export interface TurnoData {
  chofer: string;
  interno: string;
  partida: string;
}

// Interface para el estado de un micro
export interface Estado {
  id_estado: string;
  estado: "DISPONIBLE" | "TRABAJANDO" | "INCIDENTE" | "NO DISPONIBLE";
  fecha: string; // formato "YYYY-MM-DD"
  hora: string; // formato "HH:mm:ss"
  id_micro: string;
}

// Interface para Micro
export interface Micro {
  id_micro: number;
  placa: string;
  interno: string;
  modelo: string;
  año: string;
  seguro: string;
  id_dueño: string;
  id_linea: string;
  estados: Estado[];
}

export interface DecodedToken {
  id: string;
  role: string;
  id_linea: number;
}

export interface Mensaje {
    emisor: string;
    receptor: string;
    rol: string;
    contenido: string;
    id_linea: number;
}