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
import { Search, CircleUserRound, Route, UserPlus, Trash2 } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth";
import { choferRes, crearChofer, eliminarChofer } from "@/api/chofer";
import { rutas } from "@/api/rutas";
import { jwtDecode } from "jwt-decode"
import { Driver, RouteType } from "@/types";


const DriverCard = ({ driver }: { driver: Driver }) => {
  const {token} = useAuthStore()
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
      <button className="flex h-10 w-10 rounded-md ml-auto bg-white items-center justify-items-center hover:bg-red-500" onClick={ () => { DeleteDriver(driver, token) }}> 
            <Trash2 className="h-10 w-10 rounded-md text-2xl bg-white hover:bg-red-500 hover:text-white"/>
        </button>
    </div>
  );
};

const DeleteDriver = async (driver: Driver, token: string) => {
  const usuario_chofer = driver.usuario
  try {
      if(usuario_chofer){
          await eliminarChofer(usuario_chofer, token)
          alert("Chofer eliminado con exito")
          window.location.reload()
      } else {
          console.error("No se pudo obtener el usuario del chofer")
      }
  } catch (error) {
      console.error(error)
  }

}

const RouteCard = ({ route }: { route: RouteType }) => {
  const navigate = useNavigate()
  console.log(route.id_ruta)
  return (
    <button
      className="border rounded-lg p-4 mb-4 flex items-center w-full bg-white hover:bg-zinc-200 m-4"
      onClick={ () => navigate('/dashboard/ruta', { state: {id_ruta: route.id_ruta }}) }>
      <div className="flex items-center">
        <Route className="w-20 h-20 mr-10" />
        <h3 className="font-bold text-5xl">{route.id_ruta}</h3>
      </div>
    </button>
  );
};

export default function LineaPage() {
  const { token } = useAuthStore();
  const decoded = jwtDecode(token);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [routes, setRoutes] = useState<RouteType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newDriver, setNewDriver] = useState({
    usuario: "",
    licencia_categoria: "",
  });
  const location = useLocation();
  const { state } = location;
  const id_linea = state.id_linea;

  useEffect(() => {
    async function fetchData() {
      try {
        // Llamadas a la API
        console.log(token)
        console.log(id_linea)
        if( decoded.role === "Operador"){
          const resChoferes = await choferRes(token);
          setDrivers(resChoferes.data.listaDeChoferes);
        }
        const resRutas = await rutas(id_linea);
        // Actualizar estado con los datos obtenidos
        
        
        setRoutes(resRutas.data);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    }

    fetchData();
  }, [id_linea, token]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDriver({
      ...newDriver,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateDriver = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await crearChofer(
        {
          usuario: newDriver.usuario,
          licencia: newDriver.licencia_categoria,
        },
        token // Asegúrate de tener el token disponible aquí
      );
      alert("Chofer creado con éxito!");
      window.location.reload()
    } catch (error) {
      console.error("Error al crear el chofer:", error);
      alert("Hubo un error al crear el chofer.");
    }
  };

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
      { decoded.role == "Operador" ? (<div className="flex flex-col md:flex-col md:w-[66%]">
            <h2 className="text-2xl font-bold mb-4">CHOFERES</h2>
            <div className="w-full md:w-full pr-0 md:pr-4 mb-8 md:mb-0 max-h-[calc(75vh-8rem)] overflow-auto">        
              {filteredDrivers.map((driver) => (
                <DriverCard key={driver.usuario} driver={driver} />
              ))}
            </div>
          </div>) : null }
        <div className="w-full md:w-1/3 pl-0 md:pl-4">
        { decoded.role == "Operador" ? ( <> <h2 className="text-2xl font-bold mb-4">Agregar Chofer</h2>
          <form onSubmit={handleCreateDriver} className="flex space-x-4 items-center">
            <div className="flex-grow">
              <input
                type="text"
                name="usuario"
                placeholder="Usuario"
                value={newDriver.usuario}
                onChange={handleInputChange}
                className="mb-4 p-2 border rounded-lg w-full"
                required
              />
              <input
                type="text"
                name="licencia_categoria"
                placeholder="Licencia"
                value={newDriver.licencia_categoria}
                onChange={handleInputChange}
                className="p-2 border rounded-lg w-full"
                required
              />
            </div>
              <button
              type="submit"
              className="bg-black text-white p-4 rounded-lg hover:bg-gray-600 flex items-center justify-center w-24 h-24"
            >
              <UserPlus className="w-16 h-16" />
            </button>
          </form> </>) : null }

        <h2 className="text-2xl font-bold mb-4 mt-8">RUTAS</h2>
        <div className="flex flex-col md:flex-col md:w-full">
          {routes.map((route) => (
              <RouteCard key={route.id_ruta} route={route} />
          ))}
        </div>
          
        </div>
      </div>
    </div>
  ); 
}
