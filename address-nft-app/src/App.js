import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { motion } from 'framer-motion';
import AddressInput from './components/AddressInput';
import Map from './components/Map';
import NFTGenerator from './components/NFTGenerator';
import GlobalStyles from './styles/GlobalStyles';
import { darkTheme } from './styles/Theme';

const AppWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
  min-height: 100vh;
`;

const Title = styled(motion.h1)`
  text-align: center;
  color: ${props => props.theme.title};
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputWrapper = styled.div`
  min-height: 100px;
  position: relative;
`;

const MapWrapper = styled.div`
  height: 400px;
  width: 100%;
`;

const App = () => {
  const [selected, setSelected] = useState(null);

  return (
    <ThemeProvider theme={darkTheme}>
      <AppWrapper>
        <GlobalStyles />
        <Title
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Address NFT Generator
        </Title>
        <ContentWrapper>
          <InputWrapper>
            <AddressInput setSelected={setSelected} />
          </InputWrapper>
          <MapWrapper>
            <Map selected={selected} />
          </MapWrapper>
          <NFTGenerator selected={selected} />
        </ContentWrapper>
      </AppWrapper>
    </ThemeProvider>
  );
};

export default App;