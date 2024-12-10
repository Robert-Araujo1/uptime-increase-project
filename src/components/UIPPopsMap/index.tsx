import { useMap, TileLayer } from 'react-leaflet';
import { MapContainer, Marker, Popup } from 'react-leaflet';
import { useEffect, useState } from 'react';
import L from 'leaflet';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import UIPMarker from '../UIPMap/UIPMarker';
import MarkerClusterGroup from 'react-leaflet-cluster';
import isRecentDate from '../../utils/isRecentDate';

export default function () {
  const popsMachines = useSelector((state: any) => state.pops.value);

  return (
    <Paper>
      <Box height={'85dvh'} paddingY={1} paddingX={1}>
        <MapContainer
          style={{ height: '82dvh', width: '100%' }}
          attributionControl
          center={[-7.2408, -39.3126]}
          zoom={5}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          <MarkerClusterGroup showCoverageOnHover={false}>
            {popsMachines.map((pops: any, index: number) => (
              <Marker
                key={index}
                position={[pops.MachineLat, pops.MachineLon]}
                icon={UIPMarker(pops, null)}>
                <Popup maxWidth={200}>
                  <div className='popup-pops'>
                    <div className='popup-pops-header'>Chassi</div>
                    <hr />
                    <span>{pops.MachineVin}</span>
                    <div className='popup-pops-header'>Cliente</div>
                    <hr />
                    <span>{pops.CustomerName}</span>
                    <div className='popup-pops-header'>
                      Localização Atualizada Em
                    </div>
                    <hr />
                    <span>{isRecentDate(pops.MachineLocationTimestamp)}</span>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
          <LocateMyselfMarker />
        </MapContainer>
      </Box>
    </Paper>
  );
}

function LocateMyselfMarker() {
  const [position, setPosition] = useState<L.LatLng | null>(null);

  const map = useMap();
  useEffect(() => {
    map.locate().on('locationfound', function (e: L.LocationEvent) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    });
  }, []);

  return position == null ? null : (
    <Marker
      position={position}
      icon={L.divIcon({
        html: '<div></div>',
        className: 'gps-icon',
        iconSize: [15, 15],
      })}></Marker>
  );
}
