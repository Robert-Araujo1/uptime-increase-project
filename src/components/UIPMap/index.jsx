import { MapContainer } from 'react-leaflet/MapContainer';
import { TileLayer } from 'react-leaflet/TileLayer';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import 'leaflet/dist/leaflet.css';

export default () => {
  const position = [-9.135222194454002, -39.903822968196536];

  return (
    <Paper>
      <Box height={440} paddingY={1} paddingX={1}>
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
        </MapContainer>
      </Box>
    </Paper>
  );
};
