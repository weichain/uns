// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/utils/introspection/ERC165Upgradeable.sol';

import './cns/ICryptoRegistry.sol';
import './cns/ICryptoResolver.sol';
import './IDataReader.sol';
import './IRecordReader.sol';
import './IRegistry.sol';
import './IRegistryReader.sol';

contract ProxyReader is ERC165Upgradeable, IRegistryReader, IRecordReader, IDataReader {
    string public constant NAME = 'Unstoppable Proxy Reader';
    string public constant VERSION = '0.2.0';

    IRegistry private immutable _unsRegistry;
    ICryptoRegistry private immutable _cryptoRegistry;

    constructor(IRegistry unsRegistry, ICryptoRegistry cryptoRegistry) {
        _unsRegistry = unsRegistry;
        _cryptoRegistry = cryptoRegistry;
    }

    // Deprecated
    function name() external view override returns (string memory) {
        return _unsRegistry.name();
    }

    // Deprecated
    function symbol() external view override returns (string memory) {
        return _unsRegistry.symbol();
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return interfaceId == type(IRegistryReader).interfaceId
            || interfaceId == type(IRecordReader).interfaceId
            || interfaceId == type(IDataReader).interfaceId
            || super.supportsInterface(interfaceId);
    }

    function tokenURI(uint256 tokenId) external view override returns (string memory) {
        if(_unsRegistry.exists(tokenId)) {
            return _unsRegistry.tokenURI(tokenId);
        } else {
            return _cryptoRegistry.tokenURI(tokenId);
        }
    }

    function isApprovedOrOwner(address spender, uint256 tokenId)
        external
        view
        override
        returns (bool)
    {
        if(_unsRegistry.exists(tokenId)) {
            return _unsRegistry.isApprovedOrOwner(spender, tokenId);
        } else {
            return _cryptoRegistry.isApprovedOrOwner(spender, tokenId);
        }
    }

    function resolverOf(uint256 tokenId) external view override returns (address) {
        if(_unsRegistry.exists(tokenId)) {
            return _unsRegistry.resolverOf(tokenId);
        } else {
            return _cryptoRegistry.resolverOf(tokenId);
        }
    }

    function childIdOf(uint256 tokenId, string calldata label)
        external
        view
        override
        returns (uint256)
    {
        return _unsRegistry.childIdOf(tokenId, label);
    }

    function balanceOf(address owner) external view override returns (uint256) {
        return _unsRegistry.balanceOf(owner);
    }

    function ownerOf(uint256 tokenId) external view override returns (address) {
        if(_unsRegistry.exists(tokenId)) {
            return _unsRegistry.ownerOf(tokenId);
        } else {
            return _cryptoRegistry.ownerOf(tokenId);
        }
    }

    function getApproved(uint256 tokenId) external view override returns (address) {
        if(_unsRegistry.exists(tokenId)) {
            return _unsRegistry.getApproved(tokenId);
        } else {
            return _cryptoRegistry.getApproved(tokenId);
        }
    }

    // Deprecated
    function isApprovedForAll(address owner, address operator)
        external
        view
        override
        returns (bool)
    {
        return _unsRegistry.isApprovedForAll(owner, operator);
    }

    // Deprecated
    function root() external pure override returns (uint256) {
        return 0;
    }

    // Deprecated
    function registry() external view returns (address) {
        return address(_unsRegistry);
    }

    function get(string calldata key, uint256 tokenId)
        external
        view
        override
        returns (string memory)
    {
        if(_unsRegistry.exists(tokenId)) {
            return _unsRegistry.get(key, tokenId);
        } else {
            address resolver = _cryptoResolverOf(tokenId);
            return resolver != address(0x0) ? ICryptoResolver(resolver).get(key, tokenId) : '';
        }
    }

    function getMany(string[] calldata keys, uint256 tokenId)
        external
        view
        override
        returns (string[] memory values)
    {
        values = new string[](keys.length);
        if(_unsRegistry.exists(tokenId)) {
            return _unsRegistry.getMany(keys, tokenId);
        } else {
            address resolver = _cryptoResolverOf(tokenId);
            if(resolver != address(0x0) && keys.length > 0) {
                values = ICryptoResolver(resolver).getMany(keys, tokenId);
            }
        }
    }

    function getByHash(uint256 keyHash, uint256 tokenId)
        external
        view
        override
        returns (string memory key, string memory value)
    {
        if(_unsRegistry.exists(tokenId)) {
            return _unsRegistry.getByHash(keyHash, tokenId);
        } else {
            address resolver = _cryptoResolverOf(tokenId);
            if (resolver != address(0x0)) {
                (key, value) = ICryptoResolver(resolver).getByHash(keyHash, tokenId);
            }
        }
    }

    function getManyByHash(uint256[] calldata keyHashes, uint256 tokenId)
        external
        view
        override
        returns (string[] memory keys, string[] memory values)
    {
        keys = new string[](keyHashes.length);
        values = new string[](keyHashes.length);
        if(_unsRegistry.exists(tokenId)) {
            return _unsRegistry.getManyByHash(keyHashes, tokenId);
        } else {
            address resolver = _cryptoResolverOf(tokenId);
            if(resolver != address(0x0) && keyHashes.length > 0) {
                (keys, values) = ICryptoResolver(resolver).getManyByHash(keyHashes, tokenId);
            }
        }
    }

    function getData(string[] calldata keys, uint256 tokenId)
        external
        view
        override
        returns (
            address resolver,
            address owner,
            string[] memory values
        )
    {
        return _getData(keys, tokenId);
    }

    function getDataForMany(string[] calldata keys, uint256[] calldata tokenIds)
        external
        view
        override
        returns (
            address[] memory resolvers,
            address[] memory owners,
            string[][] memory values
        )
    {
        resolvers = new address[](tokenIds.length);
        owners = new address[](tokenIds.length);
        values = new string[][](tokenIds.length);

        for (uint256 i = 0; i < tokenIds.length; i++) {
            (resolvers[i], owners[i], values[i]) = _getData(keys, tokenIds[i]);
        }
    }

    function getDataByHash(uint256[] calldata keyHashes, uint256 tokenId)
        external
        view
        override
        returns (
            address resolver,
            address owner,
            string[] memory keys,
            string[] memory values
        )
    {
        return _getDataByHash(keyHashes, tokenId);
    }

    function getDataByHashForMany(uint256[] calldata keyHashes, uint256[] calldata tokenIds)
        external
        view
        override
        returns (
            address[] memory resolvers,
            address[] memory owners,
            string[][] memory keys,
            string[][] memory values
        )
    {
        resolvers = new address[](tokenIds.length);
        owners = new address[](tokenIds.length);
        keys = new string[][](tokenIds.length);
        values = new string[][](tokenIds.length);

        for (uint256 i = 0; i < tokenIds.length; i++) {
            (resolvers[i], owners[i], keys[i], values[i]) = _getDataByHash(keyHashes, tokenIds[i]);
        }
    }

    function ownerOfForMany(uint256[] calldata tokenIds)
        external
        view
        override
        returns (address[] memory owners)
    {
        owners = new address[](tokenIds.length);
        for (uint256 i = 0; i < tokenIds.length; i++) {
            owners[i] = _unsRegistry.exists(tokenIds[i]) ?
                _unsRegistry.ownerOf(tokenIds[i]) :
                _cryptoOwnerOf(tokenIds[i]);
        }
    }

    function _getData(string[] calldata keys, uint256 tokenId)
        private view returns (address resolver, address owner, string[] memory values)
    {
        values = new string[](keys.length);
        if(_unsRegistry.exists(tokenId)) {
            resolver = _unsRegistry.resolverOf(tokenId);
            owner = _unsRegistry.ownerOf(tokenId);
            values = _unsRegistry.getMany(keys, tokenId);
        } else {
            resolver = _cryptoResolverOf(tokenId);
            owner = _cryptoOwnerOf(tokenId);
            if(resolver != address(0x0) && keys.length > 0) {
                values = ICryptoResolver(resolver).getMany(keys, tokenId);
            }
        }
    }

    function _getDataByHash(uint256[] calldata keyHashes, uint256 tokenId)
        private view returns (address resolver, address owner, string[] memory keys, string[] memory values)
    {
        keys = new string[](keyHashes.length);
        values = new string[](keyHashes.length);
        if(_unsRegistry.exists(tokenId)) {
            resolver = _unsRegistry.resolverOf(tokenId);
            owner = _unsRegistry.ownerOf(tokenId);
            (keys, values) = _unsRegistry.getManyByHash(keyHashes, tokenId);
        } else {
            resolver = _cryptoResolverOf(tokenId);
            owner = _cryptoOwnerOf(tokenId);
            if(resolver != address(0x0) && keys.length > 0) {
                (keys, values) = ICryptoResolver(resolver).getManyByHash(keyHashes, tokenId);
            }
        }
    }

    function _cryptoOwnerOf(uint256 tokenId) private view returns (address) {
        try _cryptoRegistry.ownerOf(tokenId) returns (address _owner) {
            return _owner;
        } catch {
            return address(0x0);
        }
    }

    function _cryptoResolverOf(uint256 tokenId) private view returns (address) {
        try _cryptoRegistry.resolverOf(tokenId) returns (address _resolver) {
            return _resolver;
        } catch {
            return address(0x0);
        }
    }
}
