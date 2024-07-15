import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoidmVkYW50am43IiwiYSI6ImNreTlsaHVkYTA3aTEyeHBkYmo2N2o3NGwifQ.xJyZ3madB0y9BABOSacbxA';

const MapWrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
`;

const Map = ({ selected }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (mapContainerRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/dark-v10',
        center: [0, 0],
        zoom: 2
      });

      mapRef.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      return () => mapRef.current.remove();
    }
  }, []);

  useEffect(() => {
    if (!mapRef.current || !selected) return;

    mapRef.current.flyTo({
      center: [selected.lng, selected.lat],
      zoom: 14
    });

    if (markerRef.current) {
      markerRef.current.setLngLat([selected.lng, selected.lat]);
    } else {
      markerRef.current = new mapboxgl.Marker()
        .setLngLat([selected.lng, selected.lat])
        .addTo(mapRef.current);
    }
  }, [selected]);

  return (
    <MapWrapper
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
    </MapWrapper>
  );
};

export default Map;