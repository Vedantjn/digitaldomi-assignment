import { createGlobalStyle } from 'styled-components';

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
    color: white !important; // Changed to white
  }

  .mapboxgl-ctrl-geocoder--suggestion {
    color: black !important; // Changed to black
    background-color: white !important; // Changed to white
  }

  .mapboxgl-ctrl-geocoder--suggestion-title {
    color: black !important; // Ensure title is also black
  }

  .mapboxgl-ctrl-geocoder--suggestion-address {
    color: black !important; // Ensure address is also black
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