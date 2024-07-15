// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract AddressNFT is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct AddressData {
        string addressText;
        int256 latitude;
        int256 longitude;
    }

    mapping(uint256 => AddressData) private _addressData;

    constructor() ERC721("AddressNFT", "ANFT") {}

    function mintNFT(address recipient, string memory addressText, int256 lat, int256 lon) public returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _addressData[newItemId] = AddressData(addressText, lat, lon);

        // Emit Transfer event
        // emit Transfer(address(0), recipient, newItemId);

        return newItemId;
    }

    function getAddressData(uint256 tokenId) public view returns (string memory, int256, int256) {
        require(_exists(tokenId), "Token does not exist");
        AddressData memory data = _addressData[tokenId];
        return (data.addressText, data.latitude, data.longitude);
    }
}
