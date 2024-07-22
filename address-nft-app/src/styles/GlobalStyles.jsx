import { createGlobalStyle } from 'styled-components';

export const darkTheme = {
  background: '#1a1a1a',
  text: '#ffffff',
  title: '#ffffff',
  button: '#4a90e2',
  buttonText: '#ffffff',
  buttonHover: '#357abd',
  card: '#2c2c2c',
  cardBorder: '#444444',
  accent: '#61dafb',
};

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', Arial, sans-serif;
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.text};
  }

  .mapboxgl-ctrl-geocoder {
    width: 100% !important;
    max-width: 400px !important;
    font-size: 15px;
    line-height: 20px;
    border-radius: 4px;
    background-color: ${props => props.theme.card};
    color: ${props => props.theme.text};
  }

  .mapboxgl-ctrl-geocoder--input {
    color: white !important;
  }

  .mapboxgl-ctrl-geocoder--suggestion {
    color: black !important; 
    background-color: white !important; 
  }

  .mapboxgl-ctrl-geocoder--suggestion-title {
    color: black !important;
  }

  .mapboxgl-ctrl-geocoder--suggestion-address {
    color: black !important;
  }

  .mapboxgl-canvas {
    left: 0;
  }

  .mapboxgl-ctrl-logo {
    display: none !important;
  }

  .mapboxgl-ctrl-attrib-inner {
    display: none;
  }
`;

export default GlobalStyles;

