import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

mapboxgl.accessToken = 'pk.eyJ1IjoidmVkYW50am43IiwiYSI6ImNreTlsaHVkYTA3aTEyeHBkYmo2N2o3NGwifQ.xJyZ3madB0y9BABOSacbxA';

const AddressInputWrapper = styled(motion.div)`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  position: relative;
`;

const AddressInput = ({ setSelected }) => {
  const geocoderContainerRef = useRef(null);

  useEffect(() => {
    if (geocoderContainerRef.current) {
      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        types: 'address',
        placeholder: 'Enter your home address',
      });

      geocoder.addTo(geocoderContainerRef.current);

      geocoder.on('result', (e) => {
        const [lng, lat] = e.result.center;
        setSelected({
          address: e.result.place_name,
          lat,
          lng,
        });
      });

      return () => {
        geocoder.onRemove();
      };
    }
  }, [setSelected]);

  return (
    <AddressInputWrapper
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div ref={geocoderContainerRef} />
    </AddressInputWrapper>
  );
};

export default AddressInput;