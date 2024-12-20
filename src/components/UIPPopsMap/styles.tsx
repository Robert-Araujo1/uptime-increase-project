import { rgbToHex } from '@mui/material';
import { CSSProperties } from 'react';

interface PopsStyleProps {
  mapContainer: CSSProperties;
  popupDate: CSSProperties;
  wazeBtn: CSSProperties;
  formsBtn: CSSProperties;
  googleMapsBtn: CSSProperties;
}

const styles: PopsStyleProps = {
  mapContainer: { height: '82dvh', width: '100%' },
  popupDate: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wazeBtn: {
    marginTop: '10px',
    color: 'black',
    background: '#3cf',
    minWidth: '60px',
    marginRight: '10px',
  },
  formsBtn: {
    marginTop: '10px',
    marginLeft: '10px',
  },
  googleMapsBtn: {
    marginTop: '10px',
    color: '#fff',
    minWidth: '60px',
  },
};

export default styles;
