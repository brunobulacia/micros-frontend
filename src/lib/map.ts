import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import Feature from 'ol/Feature';
import LineString from 'ol/geom/LineString';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Stroke, Style } from 'ol/style';
import { paradas } from '@/api/rutas';
import { fetchRoute } from '@/api/map/map';

let map: Map; // Variable para almacenar el mapa

export function initMap(startCoordinates: Array<number>) {
  const transformedCoordinates = [startCoordinates[1], startCoordinates[0]];

  map = new Map({
    target: 'map',
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
    ],
    view: new View({
      center: fromLonLat(transformedCoordinates),
      zoom: 14,
    }),
  });
}

async function getRoute(startCoordinates: Array<number>, endCoordinates: Array<number>) {
  const apiKey = '5b3ce3597851110001cf6248739632f9dbe044708be3cbb8201210df';
  try {
    const data = await fetchRoute(apiKey, startCoordinates, endCoordinates);
    const routeCoordinates = data.features[0].geometry.coordinates;
    const convertedCoordinates = routeCoordinates.map((coord: Array<number>) => fromLonLat(coord));
    const routeLine = new LineString(convertedCoordinates);

    const routeFeature = new Feature({
      geometry: routeLine,
    });

    const routeLayer = new VectorLayer({
      source: new VectorSource({
        features: [routeFeature],
      }),
      style: new Style({
        stroke: new Stroke({
          color: '#FF0000', 
          width: 4,
        }),
      }),
    });
    map.addLayer(routeLayer);
  } catch (error) {
    console.error('Error al obtener la ruta:', error);
  }
}

export async function dibujarParadas(ruta: number) {
  const resParadas = await paradas(ruta);
  const dataParadas = resParadas.data;
  for (let i = 0; i < dataParadas.length - 1; i++) {
    const paradaActual = dataParadas[i];
    const paradaSiguiente = dataParadas[i + 1];

    const coordenadaActual = [paradaActual.coordenadas.lon, paradaActual.coordenadas.lat];
    const coordenadaSiguiente = [paradaSiguiente.coordenadas.lon, paradaSiguiente.coordenadas.lat];
    console.log(coordenadaActual)
    console.log(coordenadaSiguiente)
    getRoute(coordenadaActual, coordenadaSiguiente);
  }
}
