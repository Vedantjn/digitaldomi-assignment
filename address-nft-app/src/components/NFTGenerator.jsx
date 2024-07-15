import React, { useState } from 'react';
import { ethers } from 'ethers';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const NFTGeneratorWrapper = styled(motion.div)`
  margin-top: 20px;
  text-align: center;
`;

const GenerateButton = styled(motion.button)`
  background-color: ${props => props.theme.accent};
  color: #000000;
  border: none;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.buttonHover};
    transform: translateY(-2px);
  }

  &:disabled {
    background-color: #555555;
    cursor: not-allowed;
  }
`;

const NFTDisplay = styled(motion.div)`
  margin-top: 20px;
  padding: 24px;
  background-color: ${props => props.theme.card};
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  border: 1px solid ${props => props.theme.cardBorder};
`;

const NFTTitle = styled.h3`
  font-size: 28px;
  margin-bottom: 24px;
  color: ${props => props.theme.accent};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const NFTInfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`;

const NFTInfoItem = styled.div`
  background-color: rgba(255, 255, 255, 0.05);
  padding: 16px;
  border-radius: 8px;
`;

const NFTInfoLabel = styled.p`
  font-size: 14px;
  margin-bottom: 4px;
  color: ${props => props.theme.accent};
  text-transform: uppercase;
`;

const NFTInfoValue = styled.p`
  font-size: 16px;
  margin-bottom: 0;
  color: ${props => props.theme.text};
  word-break: break-all;
`;

const EtherscanLink = styled.a`
  color: ${props => props.theme.accent};
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover {
    color: ${props => props.theme.buttonHover};
    text-decoration: underline;
  }
`;

const contractABI = [
  "function mintNFT(address recipient, string memory addressText, int256 lat, int256 lon) public returns (uint256)",
  "function getAddressData(uint256 tokenId) public view returns (string memory, int256, int256)",
  "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)"
];

const contractAddress = "0x7e9A88b3CD623460BFB0B5a42D872e17FB196D1F";

const NFTGenerator = ({ selected }) => {
  const [nftToken, setNftToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateNFT = async () => {
    if (!selected) {
      alert('Please select an address first');
      return;
    }
  
    setIsLoading(true);
  
    try {
      if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        
        const network = await provider.getNetwork();
        if (network.chainId !== 11155111) {
          alert('Please connect to the Sepolia network in MetaMask');
          setIsLoading(false);
          return;
        }

        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
  
        const latInt = Math.floor(selected.lat * 1e6);
        const lonInt = Math.floor(selected.lng * 1e6);
  
        const transaction = await contract.mintNFT(await signer.getAddress(), selected.address, latInt, lonInt);
        const receipt = await transaction.wait();

        console.log('Transaction receipt:', receipt);
        console.log('Events:', receipt.events);

        const transferEvent = receipt.events.find(event => event.event === 'Transfer');
        if (!transferEvent) {
          throw new Error('Transfer event not found in transaction receipt');
        }
        const tokenId = transferEvent.args.tokenId.toString();

        setNftToken({
          tokenId,
          owner: await signer.getAddress(),
          address: selected.address,
          lat: selected.lat,
          lng: selected.lng,
          transactionHash: receipt.transactionHash
        });
      } else {
        alert('Please install MetaMask to use this feature');
      }
    } catch (error) {
      console.error('Error generating NFT:', error);
      if (error.reason) {
        console.error('Error reason:', error.reason);
      }
      if (error.code) {
        console.error('Error code:', error.code);
      }
      if (error.transaction) {
        console.error('Error transaction:', error.transaction);
      }
      alert('Error generating NFT. Please check the console for more details.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <NFTGeneratorWrapper
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <GenerateButton
        onClick={generateNFT}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={isLoading || !selected}
      >
        {isLoading ? 'Generating...' : 'Generate NFT'}
      </GenerateButton>
      {nftToken && (
        <NFTDisplay
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <NFTTitle>NFT Generated!</NFTTitle>
          <NFTInfoGrid>
            <NFTInfoItem>
              <NFTInfoLabel>Token ID</NFTInfoLabel>
              <NFTInfoValue>{nftToken.tokenId}</NFTInfoValue>
            </NFTInfoItem>
            <NFTInfoItem>
              <NFTInfoLabel>Owner</NFTInfoLabel>
              <NFTInfoValue>{nftToken.owner}</NFTInfoValue>
            </NFTInfoItem>
            <NFTInfoItem>
              <NFTInfoLabel>Address</NFTInfoLabel>
              <NFTInfoValue>{nftToken.address}</NFTInfoValue>
            </NFTInfoItem>
            <NFTInfoItem>
              <NFTInfoLabel>Latitude</NFTInfoLabel>
              <NFTInfoValue>{nftToken.lat}</NFTInfoValue>
            </NFTInfoItem>
            <NFTInfoItem>
              <NFTInfoLabel>Longitude</NFTInfoLabel>
              <NFTInfoValue>{nftToken.lng}</NFTInfoValue>
            </NFTInfoItem>
            <NFTInfoItem>
              <NFTInfoLabel>Transaction</NFTInfoLabel>
              <NFTInfoValue>
                <EtherscanLink 
                  href={`https://sepolia.etherscan.io/tx/${nftToken.transactionHash}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  View on Etherscan
                </EtherscanLink>
              </NFTInfoValue>
            </NFTInfoItem>
          </NFTInfoGrid>
        </NFTDisplay>
      )}
    </NFTGeneratorWrapper>
  );
};

export default NFTGenerator;