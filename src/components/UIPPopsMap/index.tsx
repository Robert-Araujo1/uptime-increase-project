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
import Button from '@mui/material/Button';
import CellTowerIcon from '@mui/icons-material/CellTower';
import WarningIcon from '@mui/icons-material/Warning';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useWebSocket from 'react-use-websocket';
import { WSSERVER } from '../../services/constants';
import { getVehicles } from '../../services/uipApi';
import { createClusterCustomIcon } from '../UIPMap';
import dayjs from 'dayjs';
import PopsForms from '../UIPPopsTable/PopsForms';
import styles from './styles';
import FeedIcon from '@mui/icons-material/Feed';
import { isMobile } from 'react-device-detect';

export default function () {
  const popsMachines = useSelector((state: any): object[] => state.pops.value);
  const [userPosition, setUserPosition] = useState<L.LatLng | null>(null);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [openPopsForm, setOpenPopsForm] = useState(false);
  const [machineDetails, setMachineDetails] = useState(undefined);
  const { lastMessage } = useWebSocket(WSSERVER);

  async function fetchVehicles() {
    try {
      const vehList = await getVehicles();
      setVehicles(vehList.body);
    } catch (err) {
      console.error('Fetch vehicles data error.');
    }
  }

  useEffect(() => {
    fetchVehicles();
  }, []);

  useEffect(() => {
    if (lastMessage !== null) {
      if (lastMessage.data == 'vehicles.table.updated!') {
        fetchVehicles();
      }
    }
  }, [lastMessage]);

  return (
    <Paper>
      <Box height={'85dvh'} paddingY={1} paddingX={1}>
        <MapContainer
          style={styles.mapContainer}
          attributionControl
          center={[-7.2408, -39.3126]}
          zoom={5}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          {vehicles.length > 0 && (
            <MarkerClusterGroup
              showCoverageOnHover={false}
              iconCreateFunction={(cluster: any) =>
                createClusterCustomIcon(cluster, 'vehicles')
              }>
              {vehicles.map((vehicle, index) => {
                let lastLocationTime = vehicle?.LastLocationTime;
                lastLocationTime = dayjs(lastLocationTime);
                if (lastLocationTime.isToday()) {
                  lastLocationTime =
                    'Hoje, às ' + lastLocationTime.format('HH:mm');
                } else {
                  lastLocationTime =
                    lastLocationTime.format('DD/MM/YYYY HH:mm');
                }
                return (
                  <Marker
                    key={index}
                    icon={L.icon({
                      iconUrl:
                        require('../../assets/images/vehicles/pickup.svg')
                          .default,
                      iconSize: [32, 32],
                      shadowSize: [24, 24],
                      iconAnchor: [19, 25],
                      popupAnchor: [-3, -76],
                    })}
                    position={[vehicle.LastLatitude, vehicle.LastLongitude]}>
                    <Popup>
                      <strong>Placa:</strong> {vehicle?.Plate} <br />{' '}
                      <strong>Condutor:</strong>{' '}
                      {vehicle?.Driver?.Name || 'Sem nome'} <br />{' '}
                      <strong>Função:</strong> {vehicle?.Driver?.Role || 'NA'}{' '}
                      <br /> <strong>Última atualização:</strong>{' '}
                      {lastLocationTime} <br />
                      <strong>Velocidade registrada:</strong>{' '}
                      {vehicle?.LastSpeed} km/h
                    </Popup>
                  </Marker>
                );
              })}
            </MarkerClusterGroup>
          )}
          <MarkerClusterGroup showCoverageOnHover={false}>
            {popsMachines.length > 0 &&
              popsMachines.map((pops: any, index: number) => {
                const date = isRecentDate(pops.MachineLocationTimestamp);
                return (
                  <Marker
                    key={index}
                    position={[pops.MachineLat, pops.MachineLon]}
                    icon={UIPMarker(pops, '')}>
                    <Popup minWidth={200} maxWidth={220}>
                      <div className='popup-pops'>
                        <div className='popup-pops-header'>Cliente</div>
                        <span>{pops.CustomerName}</span>
                        <div className='popup-pops-header'>Chassi</div>
                        <span>{pops.MachineVin}</span>

                        <div className='popup-pops-header'>Horímetro</div>
                        <span>{pops.MachineEngineHours}</span>
                        <div className='popup-pops-header'>
                          Data de atualização
                        </div>
                        <div style={styles.popupDate}>
                          {date[1] == 'today' ? (
                            <CellTowerIcon color='success' />
                          ) : date[1] == 'yesterday' ? (
                            <CellTowerIcon
                              color='inherit'
                              sx={{ color: '#EDAC23' }}
                            />
                          ) : (
                            <WarningIcon color='warning' />
                          )}

                          <span>{date[0]}</span>
                        </div>
                        <Button
                          style={styles.wazeBtn}
                          onClick={() => {
                            if (userPosition == null) {
                              navigator.permissions
                                .query({ name: 'geolocation' })
                                .then((result) => {
                                  if (result.state == 'denied') {
                                    alert(
                                      'Você precisa permitir o acesso a sua localização!'
                                    );
                                    return;
                                  } else if (result.state == 'prompt') {
                                    return;
                                  }
                                });
                            } else {
                              if (isMobile) {
                                window.open(
                                  `waze://?ll=${pops.MachineLat}%2C${pops.MachineLon}&navigate=yes`
                                );
                              } else {
                                window.open(
                                  `https://www.waze.com/ul?ll=${pops.MachineLat}%2C${pops.MachineLon}&navigate=yes&zoom=17`,
                                  '_blank'
                                );
                              }
                            }
                          }}
                          color='inherit'
                          variant='contained'>
                          Waze
                        </Button>
                        <Button
                          style={{
                            marginTop: '10px',
                            minWidth: '60px',
                          }}
                          onClick={() => {
                            if (userPosition == null) {
                              navigator.permissions
                                .query({ name: 'geolocation' })
                                .then((result) => {
                                  if (result.state == 'denied') {
                                    alert(
                                      'Você precisa permitir o acesso a sua localização!'
                                    );
                                    return;
                                  } else if (result.state == 'prompt') {
                                    return;
                                  }
                                });
                            } else {
                              window.open(
                                `https://www.google.com/maps/dir/${userPosition.lat},${userPosition.lng}/${pops.MachineLat},${pops.MachineLon}`,
                                '_blank'
                              );
                            }
                          }}
                          color='inherit'
                          variant='contained'>
                          Maps
                        </Button>
                        <Button
                          sx={{ background: '#EDAC23' }}
                          color='inherit'
                          variant='contained'
                          onClick={() => {
                            setMachineDetails(pops);
                            setOpenPopsForm(true);
                          }}
                          style={styles.formsBtn}>
                          <FeedIcon />
                        </Button>
                      </div>
                    </Popup>
                  </Marker>
                );
              })}
          </MarkerClusterGroup>
          <LocateMyselfMarker setUserPosition={setUserPosition} />
        </MapContainer>
      </Box>
      {/* <MachineNotCommunicatingWarning
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        pops={popsMachineSelected}
        userPosition={userPosition}
      /> */}
      <PopsForms
        open={openPopsForm}
        handleClose={() => setOpenPopsForm(false)}
        machineDetails={machineDetails}
      />
    </Paper>
  );
}

function MachineNotCommunicatingWarning({
  openDialog,
  setOpenDialog,
  pops,
  userPosition,
}: any) {
  return (
    <CustomDialog
      openDialog={openDialog}
      setOpenDialog={setOpenDialog}
      title={'Aviso Importante!'}
      successBtnText={'Estou ciente'}
      onSuccessBtnClick={() => {
        window.open(
          `https://www.google.com/maps/dir/${userPosition.lat},${userPosition.lng}/${pops.MachineLat},${pops.MachineLon}`,
          '_blank'
        );
        setOpenDialog(false);
      }}
      cancelBtnText={'Cancelar'}
      text={
        'A máquina não comunica há um tempo. A localização pode estar desatualizada. Deseja traçar a rota mesmo assim?'
      }
    />
  );
}

function CustomDialog({
  openDialog,
  setOpenDialog,
  title,
  successBtnText,
  onSuccessBtnClick,
  cancelBtnText,
  text,
}: any) {
  return (
    <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color='success' onClick={onSuccessBtnClick}>
          {successBtnText}
        </Button>
        <Button color='error' onClick={() => setOpenDialog(false)}>
          {cancelBtnText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function LocateMyselfMarker({ setUserPosition }: any) {
  const [position, setPosition] = useState<L.LatLng | null>(null);

  const map = useMap();

  useEffect(() => {
    map.locate().on('locationfound', function (e: L.LocationEvent) {
      setPosition(e.latlng);
      setUserPosition(e.latlng);
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
