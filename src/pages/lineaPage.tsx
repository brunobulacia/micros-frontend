'use client'

import { useState, useEffect } from 'react'
import { Search, CircleUserRound, Route } from 'lucide-react'
import { useLocation } from 'react-router-dom';

interface Driver {
  usuario_chofer: string
  licencia_categoria: string
}

interface Route {
  duracion_estimada: string
  id_linea: number
  id_ruta: number
  longitud_total: string
}

const DriverCard = ({ driver }: { driver: Driver }) => {
  const statusColor = {
    'Disponible': 'bg-green-500',
    'Trabajando': 'bg-yellow-500',
    'No Disponible': 'bg-red-500'
  }

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
  )
}

const RouteCard = ({ route }: { route: Route }) => {
  return (
    <div className="border rounded-lg p-4 mb-4">
      <div className="flex items-center">
      <Route  className="w-20 h-20 mr-10" />
        <h3 className="font-bold text-5xl">{route.id_ruta}</h3>
      </div>
    </div>
  )
}

export default function LineaPage() {
  const [drivers, setDrivers] = useState<Driver[]>([])
  const [routes, setRoutes] = useState<Route[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const location = useLocation();

  const { state } = location
  const id_linea = state.id_linea
  console.log(id_linea)
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener el token del localStorage
        const token = JSON.parse(localStorage.getItem('auth')).state.token
        console.log(token)
        if (!token) {
          console.error('No se encontró el token de autenticación')
          return
        }

        // Configurar los headers para incluir el token
        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }

        // Configurar el body para incluir el token
        const body = JSON.stringify({ "token": token, "id_linea": id_linea })

        // Realizar las peticiones a la API incluyendo los headers y el body
        const driversResponse = await fetch('https://proyecto-micros.onrender.com/usuarios/choferes', { 
          method: 'POST',
          headers,
          body
        })
        
        const routesResponse = await fetch('https://proyecto-micros.onrender.com/rutas', { 
          method: 'POST',
          headers,
          body
        })
        
        if (!driversResponse.ok || !routesResponse.ok) {
          throw new Error('Error al obtener los datos de la API')
        }

        const driversData = await driversResponse.json()
        const routesData = await routesResponse.json()
        console.log(driversData.choferes)
        console.log(routesData)

        setDrivers(driversData.choferes)
        setRoutes(routesData)
      } catch (error) {
        console.error('Error al cargar los datos:', error)
        // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje al usuario
      }
    }

    fetchData()
  }, [id_linea])

  const filteredDrivers = drivers.filter(driver => 
    driver.usuario_chofer.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-8xl font-bold mb-8 text-center">{state.nombre_linea}</h1>
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
          {filteredDrivers.map(driver => (
            <DriverCard key={driver.usuario_chofer} driver={driver} />
          ))}
        </div>
        <div className="w-full md:w-1/3 pl-0 md:pl-4">
          <h2 className="text-2xl font-bold mb-4">RUTAS</h2>
          {routes.map(route => (
            <RouteCard key={route.id_ruta} route={route} />
          ))}
        </div>
      </div>
    </div>
  )
}