/* "use client";
import { useState, useEffect } from "react";
import { Search, CircleUserRound, Route } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/auth";
import { choferRes } from "@/api/chofer";
import { rutas } from "@/api/rutas";

interface Driver {
  usuario_chofer: string;
  licencia_categoria: string;
}

interface Route {
  duracion_estimada: string;
  id_linea: number;
  id_ruta: number;
  longitud_total: string;
}

const DriverCard = ({ driver }: { driver: Driver }) => {
  const statusColor = {
    Disponible: "bg-green-500",
    Trabajando: "bg-yellow-500",
    "No Disponible": "bg-red-500",
  };

  return (
    <div className="border rounded-lg p-4 mb-4 flex items-center">
      <CircleUserRound className="w-16 h-16 mr-4" />
      <div>
        <h3 className="font-bold">{driver.usuario_chofer}</h3>
        <p>Licencia: {driver.licencia_categoria}</p>
      </div>
      <div className={`ml-auto w-3 h-3 rounded-full`}></div>
      <span className="ml-2">TRABAJANDO</span>
    </div>
  );
};

const RouteCard = ({ route }: { route: Route }) => {
  return (
    <div className="border rounded-lg p-4 mb-4">
      <div className="flex items-center">
        <Route className="w-20 h-20 mr-10" />
        <h3 className="font-bold text-5xl">{route.id_ruta}</h3>
      </div>
    </div>
  );
};

function LineaPage() {
  const { token } = useAuthStore();
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const { state } = location;
  const id_linea = state.id_linea;
  console.log(id_linea);
  useEffect(() => {
    async function fetchLines() {
      const resChoferes = await choferRes();
      const resRutas = await rutas(id);
    }

    fetchLines();
  }, []);
  return <div>Hola</div>;
}

export default LineaPage;
 */
"use client";
import { useState, useEffect } from "react";
import { Search, CircleUserRound, Route } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/auth";
import { choferRes } from "@/api/chofer";
import { rutas } from "@/api/rutas";

interface Driver {
  usuario: string;
  licencia_categoria: string;
  nombre: string;
  apellido: string;
  correo: string;
  carnet: string;
  sexo: "M" | "F";
  telefonos: Array<string>
}

interface Route {
  duracion_estimada: string;
  id_linea: number;
  id_ruta: number;
  longitud_total: string;
}

const DriverCard = ({ driver }: { driver: Driver }) => {
  return (
    <div className="border rounded-lg p-4 mb-4 flex items-center w-full bg-white">
      <CircleUserRound className="w-16 h-16 mr-4" />
      <div>
        <h3 className="font-bold">{driver.usuario}</h3>
        <p><b>Nombre: </b>{driver.nombre} {driver.apellido}</p>
        <p><b>CI:</b> {driver.carnet}</p>
        <p><b>Licencia:</b> {driver.licencia_categoria}</p>
        <p><b>Sexo:</b> {driver.sexo}</p>
        <p><b>Correo:</b> {driver.correo}</p>
        

      </div>
      <span className="ml-auto">🟡 TRABAJANDO</span>
    </div>
  );
};

const RouteCard = ({ route }: { route: Route }) => {
  return (
    <button className="border rounded-lg p-4 mb-4 flex items-center w-full bg-white hover:bg-zinc-200 m-4">
      <div className="flex items-center">
        <Route className="w-20 h-20 mr-10" />
        <h3 className="font-bold text-5xl">{route.id_ruta}</h3>
      </div>
    </button>
  );
};

export default function LineaPage() {
  const { token } = useAuthStore();
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const { state } = location;
  const id_linea = state.id_linea;

  useEffect(() => {
    async function fetchData() {
      try {
        // Llamadas a la API
        console.log(token)
        console.log(id_linea)
        const resChoferes = await choferRes(token);
        const resRutas = await rutas(id_linea);
        // Actualizar estado con los datos obtenidos
        setDrivers(resChoferes.data.listaDeChoferes);
        
        setRoutes(resRutas.data);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    }

    fetchData();
  }, [id_linea, token]);

  const filteredDrivers = drivers.filter((driver) =>
    driver.usuario.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">
        {state.nombre_linea}
      </h1>
      <div className="mb-8 relative">
        <input
          type="text"
          placeholder="Buscar..."
          className="w-full p-2 pl-10 border rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-3 top-2.5 text-gray-400" />
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-2/3 pr-0 md:pr-4 mb-8 md:mb-0">
          <h2 className="text-2xl font-bold mb-4">CHOFERES</h2>
          {filteredDrivers.map((driver) => (
            <DriverCard key={driver.usuario} driver={driver} />
          ))}
        </div>
        <div className="w-full md:w-1/3 pl-0 md:pl-4">
          <h2 className="text-2xl font-bold mb-4">RUTAS</h2>
          {routes.map((route) => (
              <RouteCard key={route.id_ruta} route={route} />
          ))}
        </div>
      </div>
    </div>
  );
}
