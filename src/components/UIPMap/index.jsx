import { MapContainer } from 'react-leaflet/MapContainer';
import { TileLayer } from 'react-leaflet/TileLayer';
import { Marker, Popup } from 'react-leaflet';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import UIPMarker from './UIPMarker';
import 'leaflet/dist/leaflet.css';
import FullScreenBtn from './FullscreenBtn';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { useEffect, useState } from 'react';
import { getVehicles } from '../../services/uipApi';
import L from 'leaflet';
import vehicleIcon from '../../assets/images/vehicles/pickup.svg';

export default () => {
  const [vehicles, setVehicles] = useState([]);
  const position = [-9.135222194454002, -39.903822968196536];
  const machines = useSelector((state) => state.machines.value);
  const { id } = useParams();

  useEffect(() => {
    async function fetchVehicles() {
      try {
        const vehList = await getVehicles();
        setVehicles(vehList.body);
      } catch (err) {
        console.error('Fetch vehicles data error.');
      }
    }
    fetchVehicles();

    const socket = new WebSocket(
      'wss://5pov3e0i06.execute-api.sa-east-1.amazonaws.com/dev/'
    );
    socket.onmessage = async (event) => {
      await fetchVehicles();
    };
  }, []);

  return (
    machines !== undefined && (
      <Paper>
        <Box height={690} paddingY={1} paddingX={1}>
          <MapContainer
            style={{
              height: '100%',
              width: '100%',
            }}
            center={position}
            attributionControl={true}
            zoom={5}
            minZoom={3}
            scrollWheelZoom={true}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            {id ? (
              <Machine id={id} machines={machines} />
            ) : (
              <MarkerClusterGroup
                showCoverageOnHover={false}
                iconCreateFunction={(cluster) =>
                  createClusterCustomIcon(cluster, 'machines')
                }>
                {machines.map((machine, index) => (
                  <MapMarker key={index} machine={machine} index={index} />
                ))}
              </MarkerClusterGroup>
            )}
            {vehicles.length > 0 && (
              <MarkerClusterGroup
                showCoverageOnHover={false}
                iconCreateFunction={(cluster) =>
                  createClusterCustomIcon(cluster, 'vehicles')
                }>
                {vehicles.map((vehicle, index) => (
                  <Marker
                    key={index}
                    icon={L.icon({
                      iconUrl: vehicleIcon,
                      iconSize: [32, 32],
                      shadowSize: [24, 24],
                      iconAnchor: [20, 31],
                      popupAnchor: [-3, -76],
                    })}
                    position={[vehicle.LastLatitude, vehicle.LastLongitude]}>
                    <Popup>
                      <strong>Placa</strong> {vehicle?.Plate} <br />{' '}
                      <strong>Última atualização:</strong>{' '}
                      {vehicle?.LastLocationTime}
                      <br />
                      <strong>Velocidade registrada:</strong>{' '}
                      {vehicle?.LastSpeed} km/h
                    </Popup>
                  </Marker>
                ))}
              </MarkerClusterGroup>
            )}
            <FullScreenBtn />
          </MapContainer>
        </Box>
      </Paper>
    )
  );
};

const Machine = ({ id, machines }) => {
  for (let index = 0; index < machines.length; index++) {
    const machine = machines[index];
    if (machine?.machinePin == id) {
      return <MapMarker machine={machine} index={index} />;
    }
  }
};

const MapMarker = ({ machine, index }) =>
  typeof machine.location?.lat == 'number' && (
    <Marker
      icon={UIPMarker(machine)}
      key={index}
      position={[machine.location?.lat, machine.location?.lon]}>
      <Popup>
        <strong>Cliente: {machine?.customer}</strong> <br />{' '}
        <strong>Chassi:</strong> {machine?.machinePin}
      </Popup>
    </Marker>
  );

const createClusterCustomIcon = function (cluster, type) {
  const count = cluster.getChildCount();
  let colorClass = '';
  switch (type) {
    case 'vehicles':
      colorClass = 'vehicle-cluster-background';
      break;
    case 'machines':
      colorClass = 'machine-cluster-background';
      break;

    default:
      break;
  }
  return L.divIcon({
    html: `<div><span>${count}</span></div>`,
    className: `leaflet-marker-icon marker-cluster ${colorClass} leaflet-zoom-animated leaflet-interactive`,
    iconSize: L.point(40, 40, true),
  });
};
