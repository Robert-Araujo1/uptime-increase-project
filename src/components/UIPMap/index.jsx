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

export default () => {
  const position = [-9.135222194454002, -39.903822968196536];
  const machines = useSelector((state) => state.machines.value);
  const { id } = useParams();
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
              <MarkerClusterGroup showCoverageOnHover={false}>
                {machines.map((machine, index) => (
                  <MapMarker key={index} machine={machine} index={index} />
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
