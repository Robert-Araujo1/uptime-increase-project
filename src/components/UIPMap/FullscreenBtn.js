/**
 * (Github Issue #75 leaflet.fullscreen)
 * So far (Feb 17 2024), Fullscreen API is not available with safari on iPhones.
 * Maybe in the future this will be fixed.
 */

import L from 'leaflet';
import { useEffect, useRef, useState } from 'react';
import { useMap } from 'react-leaflet';
import { maximizeIcon, downsizeIcon } from './constants';
import { isMobileSafari } from 'react-device-detect';

import 'leaflet.fullscreen';

export default () => {
  if (isMobileSafari) return; // Hide fullscreen button in Safari

  const [icon, setIcon] = useState(maximizeIcon);
  const map = useMap();
  const btn = useRef(
    L.control.fullscreen({
      position: 'topright',
      forceSeparateButton: true,
      content: icon,
    })
  );

  map.on('enterFullscreen', () => setIcon(downsizeIcon));
  map.on('exitFullscreen', () => setIcon(maximizeIcon));

  useEffect(() => {
    btn.current.addTo(map);
  }, [map]);

  useEffect(() => {
    btn.current.getContainer().querySelector('a').innerHTML = icon;
  }, [icon]);
  return null;
};
