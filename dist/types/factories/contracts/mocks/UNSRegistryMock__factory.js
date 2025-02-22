"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UNSRegistryMock__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "previousAdmin",
                type: "address",
            },
            {
                indexed: false,
                internalType: "address",
                name: "newAdmin",
                type: "address",
            },
        ],
        name: "AdminChanged",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "approved",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "Approval",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "operator",
                type: "address",
            },
            {
                indexed: false,
                internalType: "bool",
                name: "approved",
                type: "bool",
            },
        ],
        name: "ApprovalForAll",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint8",
                name: "version",
                type: "uint8",
            },
        ],
        name: "Initialized",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            {
                indexed: true,
                internalType: "string",
                name: "keyIndex",
                type: "string",
            },
            {
                indexed: false,
                internalType: "string",
                name: "key",
                type: "string",
            },
        ],
        name: "NewKey",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "string",
                name: "uri",
                type: "string",
            },
        ],
        name: "NewURI",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "string",
                name: "prefix",
                type: "string",
            },
        ],
        name: "NewURIPrefix",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "addr",
                type: "address",
            },
        ],
        name: "RemoveReverse",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "ResetRecords",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            {
                indexed: true,
                internalType: "string",
                name: "keyIndex",
                type: "string",
            },
            {
                indexed: true,
                internalType: "string",
                name: "valueIndex",
                type: "string",
            },
            {
                indexed: false,
                internalType: "string",
                name: "key",
                type: "string",
            },
            {
                indexed: false,
                internalType: "string",
                name: "value",
                type: "string",
            },
        ],
        name: "Set",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "addr",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "SetReverse",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "Transfer",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "implementation",
                type: "address",
            },
        ],
        name: "Upgraded",
        type: "event",
    },
    {
        inputs: [],
        name: "BATCH_LIMIT",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "NAME",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "VERSION",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "key",
                type: "string",
            },
        ],
        name: "addKey",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "addr",
                type: "address",
            },
        ],
        name: "addProxyReader",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "approve",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
        ],
        name: "balanceOf",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "burn",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "user",
                type: "address",
            },
            {
                internalType: "bytes",
                name: "depositData",
                type: "bytes",
            },
        ],
        name: "deposit",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "depositToPolygon",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "address",
                        name: "from",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "nonce",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "tokenId",
                        type: "uint256",
                    },
                    {
                        internalType: "bytes",
                        name: "data",
                        type: "bytes",
                    },
                ],
                internalType: "struct IForwarder.ForwardRequest",
                name: "req",
                type: "tuple",
            },
            {
                internalType: "bytes",
                name: "signature",
                type: "bytes",
            },
        ],
        name: "execute",
        outputs: [
            {
                internalType: "bytes",
                name: "",
                type: "bytes",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "exists",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "key",
                type: "string",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "get",
        outputs: [
            {
                internalType: "string",
                name: "value",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "getApproved",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "keyHash",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "getByHash",
        outputs: [
            {
                internalType: "string",
                name: "key",
                type: "string",
            },
            {
                internalType: "string",
                name: "value",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "keyHash",
                type: "uint256",
            },
        ],
        name: "getKey",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256[]",
                name: "hashes",
                type: "uint256[]",
            },
        ],
        name: "getKeys",
        outputs: [
            {
                internalType: "string[]",
                name: "values",
                type: "string[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string[]",
                name: "keys",
                type: "string[]",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "getMany",
        outputs: [
            {
                internalType: "string[]",
                name: "values",
                type: "string[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256[]",
                name: "keyHashes",
                type: "uint256[]",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "getManyByHash",
        outputs: [
            {
                internalType: "string[]",
                name: "keys",
                type: "string[]",
            },
            {
                internalType: "string[]",
                name: "values",
                type: "string[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "mintingManager",
                type: "address",
            },
            {
                internalType: "address",
                name: "cnsRegistry",
                type: "address",
            },
            {
                internalType: "address",
                name: "rootChainManager",
                type: "address",
            },
            {
                internalType: "address",
                name: "childChainManager",
                type: "address",
            },
        ],
        name: "initialize",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                internalType: "address",
                name: "operator",
                type: "address",
            },
        ],
        name: "isApprovedForAll",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "spender",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "isApprovedOrOwner",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "forwarder",
                type: "address",
            },
        ],
        name: "isTrustedForwarder",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "user",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "mint",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "user",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "",
                type: "bytes",
            },
        ],
        name: "mint",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            {
                internalType: "string",
                name: "uri",
                type: "string",
            },
        ],
        name: "mintTLD",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "string[]",
                name: "labels",
                type: "string[]",
            },
            {
                internalType: "string[]",
                name: "keys",
                type: "string[]",
            },
            {
                internalType: "string[]",
                name: "values",
                type: "string[]",
            },
        ],
        name: "mintWithRecords",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "string[]",
                name: "labels",
                type: "string[]",
            },
            {
                internalType: "string[]",
                name: "keys",
                type: "string[]",
            },
            {
                internalType: "string[]",
                name: "values",
                type: "string[]",
            },
            {
                internalType: "bool",
                name: "withReverse",
                type: "bool",
            },
        ],
        name: "mintWithRecords",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "name",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string[]",
                name: "labels",
                type: "string[]",
            },
        ],
        name: "namehash",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "nonceOf",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
        ],
        name: "onERC721Received",
        outputs: [
            {
                internalType: "bytes4",
                name: "",
                type: "bytes4",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "ownerOf",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string[]",
                name: "keys",
                type: "string[]",
            },
            {
                internalType: "string[]",
                name: "values",
                type: "string[]",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "reconfigure",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "removeReverse",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "reset",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "resolverOf",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "addr",
                type: "address",
            },
        ],
        name: "reverseOf",
        outputs: [
            {
                internalType: "uint256",
                name: "reverse",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "root",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "key",
                type: "string",
            },
            {
                internalType: "string",
                name: "value",
                type: "string",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "set",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "operator",
                type: "address",
            },
            {
                internalType: "bool",
                name: "approved",
                type: "bool",
            },
        ],
        name: "setApprovalForAll",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "keyHash",
                type: "uint256",
            },
            {
                internalType: "string",
                name: "value",
                type: "string",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "setByHash",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string[]",
                name: "keys",
                type: "string[]",
            },
            {
                internalType: "string[]",
                name: "values",
                type: "string[]",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "setMany",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256[]",
                name: "keyHashes",
                type: "uint256[]",
            },
            {
                internalType: "string[]",
                name: "values",
                type: "string[]",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "setManyByHash",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "setOwner",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "setReverse",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "prefix",
                type: "string",
            },
        ],
        name: "setTokenURIPrefix",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes4",
                name: "interfaceId",
                type: "bytes4",
            },
        ],
        name: "supportsInterface",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "symbol",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "tokenURI",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "transferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            {
                internalType: "string[]",
                name: "keys",
                type: "string[]",
            },
            {
                internalType: "string[]",
                name: "values",
                type: "string[]",
            },
        ],
        name: "unlockWithRecords",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            {
                internalType: "string[]",
                name: "keys",
                type: "string[]",
            },
            {
                internalType: "string[]",
                name: "values",
                type: "string[]",
            },
            {
                internalType: "bool",
                name: "withReverse",
                type: "bool",
            },
        ],
        name: "unlockWithRecords",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256[]",
                name: "tokenIds",
                type: "uint256[]",
            },
        ],
        name: "upgradeAll",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "address",
                        name: "from",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "nonce",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "tokenId",
                        type: "uint256",
                    },
                    {
                        internalType: "bytes",
                        name: "data",
                        type: "bytes",
                    },
                ],
                internalType: "struct IForwarder.ForwardRequest",
                name: "req",
                type: "tuple",
            },
            {
                internalType: "bytes",
                name: "signature",
                type: "bytes",
            },
        ],
        name: "verify",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes",
                name: "inputData",
                type: "bytes",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            {
                internalType: "string[]",
                name: "keys",
                type: "string[]",
            },
            {
                internalType: "string[]",
                name: "values",
                type: "string[]",
            },
        ],
        name: "withdrawFromPolygon",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
const _bytecode = "0x608060405234801561001057600080fd5b506150c3806100206000396000f3fe608060405234801561001057600080fd5b506004361061038e5760003560e01c80637d67df63116101de578063b88d4fde1161010f578063e985e9c5116100ad578063f5c1f76e1161007c578063f5c1f76e14610842578063f7df5c6014610855578063f8c8765e14610868578063ffa1ad741461087b57600080fd5b8063e985e9c5146107e4578063ebf0c71714610820578063ec129eea14610827578063f25eb5c11461083a57600080fd5b8063c87b56dd116100e9578063c87b56dd14610798578063ce92b33e146107ab578063cf2c52cb146107be578063d106353f146107d157600080fd5b8063b88d4fde1461075f578063ba5d40b714610772578063bb5b27e11461078557600080fd5b8063a22cb4651161017c578063ab3b87fe11610156578063ab3b87fe14610705578063ae31844a14610718578063b3f9e4cb1461072b578063b85afd281461073e57600080fd5b8063a22cb465146106b3578063a3f4df7e146106c6578063a4247400146106f257600080fd5b80639508b1c4116101b85780639508b1c41461067d5780639559c0bd1461069057806395d89b411461069857806399e0dd7c146106a057600080fd5b80637d67df63146106445780637e37479e1461065757806394d008ef1461066a57600080fd5b806340c10f19116102c357806350382c1a11610261578063638e5c7811610230578063638e5c78146105dc578063672b9f81146105ef5780636ccbae5f1461061057806370a082311461063157600080fd5b806350382c1a14610587578063509602391461059a578063572b6c05146105ad5780636352211e146105c957600080fd5b8063430c20811161029d578063430c20811461053b57806347c816991461054e5780634a72584d146105615780634f558e791461057457600080fd5b806340c10f191461050257806342842e0e1461051557806342966c681461052857600080fd5b80631be5e7ed11610330578063276fabb11161030a578063276fabb1146104a857806327f18975146104c9578063310bd74b146104dc578063384e9a55146104ef57600080fd5b80631be5e7ed1461046f5780631bf7e13e1461048257806323b872dd1461049557600080fd5b8063095ea7b31161036c578063095ea7b3146103fb5780630dee3b5c14610410578063150b7a02146104235780631bd8cc1a1461044f57600080fd5b806301ffc9a71461039357806306fdde03146103bb578063081812fc146103d0575b600080fd5b6103a66103a13660046146c3565b61089f565b60405190151581526020015b60405180910390f35b6103c36108b0565b6040516103b29190614bcd565b6103e36103de3660046148d1565b610942565b6040516001600160a01b0390911681526020016103b2565b61040e61040936600461435d565b610969565b005b61040e61041e366004614388565b6109be565b6104366104313660046140a7565b610a11565b6040516001600160e01b031990911681526020016103b2565b61046261045d3660046145b1565b610b67565b6040516103b29190614b68565b6103c361047d36600461480b565b610c87565b6103c3610490366004614872565b610cd2565b61040e6104a3366004614067565b610ddd565b6104bb6104b6366004614502565b610e63565b6040519081526020016103b2565b61040e6104d7366004614541565b610e77565b61040e6104ea3660046148d1565b610ef2565b61040e6104fd3660046148d1565b610f60565b61040e61051036600461435d565b61101f565b61040e610523366004614067565b61106c565b61040e6105363660046148d1565b611087565b6103a661054936600461435d565b6110fe565b61040e61055c3660046147ad565b61110a565b61040e61056f366004614919565b61117c565b6103a66105823660046148d1565b6111ed565b61040e610595366004614840565b61120c565b61040e6105a8366004613f9c565b611242565b6103a66105bb366004613f9c565b6001600160a01b0316301490565b6103e36105d73660046148d1565b6112a2565b61040e6105ea3660046148d1565b611302565b6106026105fd366004614969565b61134d565b6040516103b2929190614be0565b6104bb61061e3660046148d1565b6000908152610100602052604090205490565b6104bb61063f366004613f9c565b611365565b61040e610652366004614180565b6113eb565b6104bb610665366004613f9c565b611437565b61040e6106783660046144a9565b611468565b61040e61068b3660046146fb565b6114b7565b6104bb601481565b6103c361153e565b61040e6106ae36600461477a565b61154d565b61040e6106c13660046142e0565b6115d3565b6103c36040518060400160405280600d81526020016c554e533a20526567697374727960981b81525081565b6103a6610700366004614872565b6115e5565b61040e61071336600461435d565b611630565b61040e610726366004614502565b6116a8565b6103e36107393660046148d1565b611754565b61075161074c3660046145b1565b61177e565b6040516103b2929190614b7b565b61040e61076d366004614117565b6118e6565b61040e610780366004614228565b611960565b6103c36107933660046148d1565b6119b5565b6103c36107a63660046148d1565b611a57565b61040e6107b9366004614541565b611abd565b61040e6107cc36600461430b565b611b2f565b61040e6107df366004614410565b611c0c565b6103a66107f2366004613fd4565b6001600160a01b039182166000908152606a6020908152604080832093909416825291909152205460ff1690565b60006104bb565b61040e610835366004614541565b611c56565b61040e611cc8565b610462610850366004614502565b611d4e565b61040e6108633660046148e9565b611e2b565b61040e61087636600461400c565b611ebc565b6103c36040518060400160405280600581526020016418171b171960d91b81525081565b60006108aa82612092565b92915050565b6060606580546108bf90614fc5565b80601f01602080910402602001604051908101604052809291908181526020018280546108eb90614fc5565b80156109385780601f1061090d57610100808354040283529160200191610938565b820191906000526020600020905b81548152906001019060200180831161091b57829003601f168201915b5050505050905090565b600061094d826120e2565b506000908152606960205260409020546001600160a01b031690565b80303314156109a65761097a612141565b81146109a15760405162461bcd60e51b815260040161099890614ce7565b60405180910390fd5b6109af565b6109af81612156565b6109b98383612184565b505050565b610134546001600160a01b03166109d36122a7565b6001600160a01b0316146109f95760405162461bcd60e51b815260040161099890614ca0565b610a0986868686868660016122b6565b505050505050565b60007f8ffb960699dc2ba88f34d0e41c029c3c36c95149679fe1d0153a9582bec92378546001600160a01b0316610a466122a7565b6001600160a01b03161415610b0857610a5d6122a7565b6001600160a01b03166342966c68856040518263ffffffff1660e01b8152600401610a8a91815260200190565b600060405180830381600087803b158015610aa457600080fd5b505af1158015610ab8573d6000803e3d6000fd5b505050821580159150610ad25750610ad282840184614691565b15610af057610ae130856122ef565b610aeb858561243d565b610afa565b610afa85856122ef565b50630a85bd0160e11b610b5e565b60405162461bcd60e51b815260206004820152602560248201527f52656769737472793a204552433732315f524543454956494e475f50524f4849604482015264109255115160da1b6064820152608401610998565b95945050505050565b6060826001600160401b03811115610b8f57634e487b7160e01b600052604160045260246000fd5b604051908082528060200260200182016040528015610bc257816020015b6060815260200190600190039081610bad5790505b50905060005b83811015610c7f57610c41858583818110610bf357634e487b7160e01b600052603260045260246000fd5b9050602002810190610c059190614dab565b8080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152508792506124de915050565b828281518110610c6157634e487b7160e01b600052603260045260246000fd5b60200260200101819052508080610c7790614ffa565b915050610bc8565b509392505050565b6060610cca84848080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152508692506124de915050565b949350505050565b606060005a9050610ce48585856115e5565b610d405760405162461bcd60e51b815260206004820152602760248201527f554e535265676973747279466f727761726465723a205349474e41545552455f6044820152661253959053125160ca1b6064820152608401610998565b610dd2610d506020870187613f9c565b30604088013584610d6460608b018b614dab565b8080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525050604080516020601f8e018190048102820181019092528c815292508c91508b908190840183828082843760009201919091525061251392505050565b9150505b9392505050565b80610def610de96122a7565b82612602565b610e0b5760405162461bcd60e51b815260040161099890614c05565b8130331415610e3f57610e1c612141565b8114610e3a5760405162461bcd60e51b815260040161099890614ce7565b610e48565b610e4881612156565b610e5183612680565b610e5c8585856126ed565b5050505050565b6000610dd6610e728385614e85565b612894565b80610e83610de96122a7565b610e9f5760405162461bcd60e51b815260040161099890614c05565b8130331415610ed357610eb0612141565b8114610ece5760405162461bcd60e51b815260040161099890614ce7565b610edc565b610edc81612156565b610ee987878787876128f1565b50505050505050565b80610efe610de96122a7565b610f1a5760405162461bcd60e51b815260040161099890614c05565b8130331415610f4e57610f2b612141565b8114610f495760405162461bcd60e51b815260040161099890614ce7565b610f57565b610f5781612156565b6109b983612680565b80610f696122a7565b6001600160a01b0316610f7b826112a2565b6001600160a01b031614610fd15760405162461bcd60e51b815260206004820152601d60248201527f52656769737472793a2053454e4445525f49535f4e4f545f4f574e45520000006044820152606401610998565b813033141561100557610fe2612141565b81146110005760405162461bcd60e51b815260040161099890614ce7565b61100e565b61100e81612156565b6109b96110196122a7565b84612970565b6110276129b8565b6001600160a01b03166110386122a7565b6001600160a01b03161461105e5760405162461bcd60e51b815260040161099890614d69565b61106882826122ef565b5050565b6109b9838383604051806020016040528060008152506118e6565b80611093610de96122a7565b6110af5760405162461bcd60e51b815260040161099890614c05565b81303314156110e3576110c0612141565b81146110de5760405162461bcd60e51b815260040161099890614ce7565b6110ec565b6110ec81612156565b6110f583612680565b6109b983612acb565b6000610dd68383612602565b80611116610de96122a7565b6111325760405162461bcd60e51b815260040161099890614c05565b813033141561116657611143612141565b81146111615760405162461bcd60e51b815260040161099890614ce7565b61116f565b61116f81612156565b610ee98787878787612b72565b80611188610de96122a7565b6111a45760405162461bcd60e51b815260040161099890614c05565b81303314156111d8576111b5612141565b81146111d35760405162461bcd60e51b815260040161099890614ce7565b6111e1565b6111e181612156565b610a0986868686612c51565b6000818152606760205260408120546001600160a01b031615156108aa565b61123f816040516020016112209190614a33565b6040516020818303038152906040528051906020012060001c82612cf1565b50565b610134546001600160a01b03166112576122a7565b6001600160a01b03161461127d5760405162461bcd60e51b815260040161099890614ca0565b6001600160a01b0316600090815261013660205260409020805460ff19166001179055565b6000818152606760205260408120546001600160a01b0316806108aa5760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b6044820152606401610998565b8061130e610de96122a7565b61132a5760405162461bcd60e51b815260040161099890614c05565b61133c6113356122a7565b30846126ed565b6110686113476122a7565b8361243d565b60608061135a8484612d1d565b909590945092505050565b60006001600160a01b0382166113cf5760405162461bcd60e51b815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f7420612076616044820152683634b21037bbb732b960b91b6064820152608401610998565b506001600160a01b031660009081526068602052604090205490565b610134546001600160a01b03166114006122a7565b6001600160a01b0316146114265760405162461bcd60e51b815260040161099890614ca0565b610ee9878787878787876001612d3e565b6001600160a01b0381166000908152610135602052604081205461145a81612d84565b611462578091505b50919050565b6114706129b8565b6001600160a01b03166114816122a7565b6001600160a01b0316146114a75760405162461bcd60e51b815260040161099890614d69565b6114b184846122ef565b50505050565b6114c18787612dce565b6114c96122a7565b6001600160a01b03166114db866112a2565b6001600160a01b0316146115315760405162461bcd60e51b815260206004820152601d60248201527f52656769737472793a2053454e4445525f49535f4e4f545f4f574e45520000006044820152606401610998565b610ee98484848489612e3d565b6060606680546108bf90614fc5565b610134546001600160a01b03166115626122a7565b6001600160a01b0316146115885760405162461bcd60e51b815260040161099890614ca0565b6115956101338383613d93565b507f4b120d6a959a84a520fa48f5f937cca0e79129423487af7901213b5d2e89313b82826040516115c7929190614bb9565b60405180910390a15050565b6110686115de6122a7565b8383612ec7565b6000610cca6115f385614efa565b3085858080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250612f9692505050565b8061163c610de96122a7565b6116585760405162461bcd60e51b815260040161099890614c05565b813033141561168c57611669612141565b81146116875760405162461bcd60e51b815260040161099890614ce7565b611695565b61169581612156565b6114b16116a1846112a2565b85856126ed565b610134546001600160a01b03166116bd6122a7565b6001600160a01b0316146116e35760405162461bcd60e51b815260040161099890614ca0565b60005b818110156109b9576001610137600085858581811061171557634e487b7160e01b600052603260045260246000fd5b90506020020135815260200190815260200160002060006101000a81548160ff021916908315150217905550808061174c90614ffa565b9150506116e6565b6000818152606760205260408120546001600160a01b03166117775760006108aa565b3092915050565b606080836001600160401b038111156117a757634e487b7160e01b600052604160045260246000fd5b6040519080825280602002602001820160405280156117da57816020015b60608152602001906001900390816117c55790505b509150836001600160401b0381111561180357634e487b7160e01b600052604160045260246000fd5b60405190808252806020026020018201604052801561183657816020015b60608152602001906001900390816118215790505b50905060005b848110156118dd5761187486868381811061186757634e487b7160e01b600052603260045260246000fd5b9050602002013585612d1d565b84838151811061189457634e487b7160e01b600052603260045260246000fd5b602002602001018484815181106118bb57634e487b7160e01b600052603260045260246000fd5b60200260200101829052829052505080806118d590614ffa565b91505061183c565b50935093915050565b816118f2610de96122a7565b61190e5760405162461bcd60e51b815260040161099890614c05565b82303314156119425761191f612141565b811461193d5760405162461bcd60e51b815260040161099890614ce7565b61194b565b61194b81612156565b61195484612680565b610a09868686866130ee565b610134546001600160a01b03166119756122a7565b6001600160a01b03161461199b5760405162461bcd60e51b815260040161099890614ca0565b6119ab8888888888888888612d3e565b5050505050505050565b600081815260c9602052604090208054606091906119d290614fc5565b80601f01602080910402602001604051908101604052809291908181526020018280546119fe90614fc5565b8015611a4b5780601f10611a2057610100808354040283529160200191611a4b565b820191906000526020600020905b815481529060010190602001808311611a2e57829003601f168201915b50505050509050919050565b6060611a62826120e2565b6000611a6c613121565b90506000815111611a8c5760405180602001604052806000815250610dd6565b80611a9684613131565b604051602001611aa7929190614ada565b6040516020818303038152906040529392505050565b80611ac9610de96122a7565b611ae55760405162461bcd60e51b815260040161099890614c05565b8130331415611b1957611af6612141565b8114611b145760405162461bcd60e51b815260040161099890614ce7565b611b22565b611b2281612156565b610ee98787878787612e3d565b7f8bea9a6f8afd34f4e29c585f854e0cc5161431bf5fc299d468454d33dce53b87546001600160a01b0316611b626122a7565b6001600160a01b031614611b885760405162461bcd60e51b815260040161099890614d69565b6020811415611bab576000611b9f828401846148d1565b90506114b184826122ef565b6000611bb9828401846145fa565b805190915060005b81811015610a0957611bfa86848381518110611bed57634e487b7160e01b600052603260045260246000fd5b60200260200101516122ef565b80611c0481614ffa565b915050611bc1565b610134546001600160a01b0316611c216122a7565b6001600160a01b031614611c475760405162461bcd60e51b815260040161099890614ca0565b610ee9878787878787876122b6565b80611c62610de96122a7565b611c7e5760405162461bcd60e51b815260040161099890614c05565b8130331415611cb257611c8f612141565b8114611cad5760405162461bcd60e51b815260040161099890614ce7565b611cbb565b611cbb81612156565b610ee9878787878761324a565b6000611cd26122a7565b6001600160a01b03811660009081526101356020526040902054909150611d455760405162461bcd60e51b815260206004820152602160248201527f52656769737472793a20524556455253455f5245434f52445f49535f454d50546044820152605960f81b6064820152608401610998565b61123f81613260565b6060816001600160401b03811115611d7657634e487b7160e01b600052604160045260246000fd5b604051908082528060200260200182016040528015611da957816020015b6060815260200190600190039081611d945790505b50905060005b82811015611e2457611de6848483818110611dda57634e487b7160e01b600052603260045260246000fd5b905060200201356119b5565b828281518110611e0657634e487b7160e01b600052603260045260246000fd5b60200260200101819052508080611e1c90614ffa565b915050611daf565b5092915050565b610134546001600160a01b0316611e406122a7565b6001600160a01b031614611e665760405162461bcd60e51b815260040161099890614ca0565b61013454611e7d906001600160a01b0316846122ef565b827fc5beef08f693b11c316c0c8394a377a0033c9cf701b8cd8afd79cecef60c39528383604051611eaf929190614bb9565b60405180910390a2505050565b600054610100900460ff1615808015611edc5750600054600160ff909116105b80611ef65750303b158015611ef6575060005460ff166001145b611f595760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608401610998565b6000805460ff191660011790558015611f7c576000805461ff0019166101001790555b61013480546001600160a01b0319166001600160a01b038716179055837f8ffb960699dc2ba88f34d0e41c029c3c36c95149679fe1d0153a9582bec9237880546001600160a01b0319166001600160a01b03929092169190911790556040805180820182526013815272556e73746f707061626c6520446f6d61696e7360681b60208083019190915282518084019093526002835261155160f21b90830152612024916132a5565b61202c6132f3565b6120346132f3565b61203d8361331c565b6120468261334c565b8015610e5c576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15050505050565b60006001600160e01b031982166380ac58cd60e01b14806120c357506001600160e01b03198216635b5e139f60e01b145b806108aa57506301ffc9a760e01b6001600160e01b03198316146108aa565b6000818152606760205260409020546001600160a01b031661123f5760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b6044820152606401610998565b6000303314156121535750601f193601355b90565b60008181526101006020526040902054612171906001614e42565b6000918252610100602052604090912055565b600061218f826112a2565b9050806001600160a01b0316836001600160a01b031614156121fd5760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b6064820152608401610998565b806001600160a01b031661220f6122a7565b6001600160a01b0316148061222b575061222b816107f26122a7565b61229d5760405162461bcd60e51b815260206004820152603e60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206e6f7220617070726f76656420666f7220616c6c00006064820152608401610998565b6109b9838361337c565b60006122b16133ea565b905090565b6122bf86612680565b6122d26122cb876112a2565b88886126ed565b6122df858585858a612e3d565b8015610ee957610ee98787613406565b6001600160a01b0382166123455760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f20616464726573736044820152606401610998565b6000818152606760205260409020546001600160a01b0316156123aa5760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e746564000000006044820152606401610998565b6123b660008383613447565b6001600160a01b03821660009081526068602052604081208054600192906123df908490614e42565b909155505060008181526067602052604080822080546001600160a01b0319166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b60006124476129b8565b9050612453818361337c565b60008051602061509783398151915254604080516020808201869052825180830390910181528183019283905263e3dec8fb60e01b9092526001600160a01b0390921691829163e3dec8fb916124b0918891309190604401614b09565b600060405180830381600087803b1580156124ca57600080fd5b505af11580156119ab573d6000803e3d6000fd5b6060610dd6836040516020016124f49190614a33565b6040516020818303038152906040528051906020012060001c836134e4565b606061251e85612156565b600080876001600160a01b0316866125388b8a89896135c6565b6040516125459190614a33565b60006040518083038160008787f1925050503d8060008114612583576040519150601f19603f3d011682016040523d82523d6000602084013e612588565b606091505b509092509050612599603f87614e5a565b5a116125b557634e487b7160e01b600052600160045260246000fd5b6125f582826040518060400160405280601a81526020017f42617365466f727761726465723a2043414c4c5f4641494c45440000000000008152506135f6565b9998505050505050505050565b60008061260e836112a2565b9050806001600160a01b0316846001600160a01b0316148061265557506001600160a01b038082166000908152606a602090815260408083209388168352929052205460ff165b80610cca5750836001600160a01b031661266e84610942565b6001600160a01b031614949350505050565b6126898161362f565b60405160200161269b91815260200190565b60408051601f198184030181528282528051602091820120600085815260cb9092529181209190915582917f185c30856dadb58bf097c1f665a52ada7029752dbcad008ea3fefc73bee8c9fe9190a250565b826001600160a01b0316612700826112a2565b6001600160a01b0316146127645760405162461bcd60e51b815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201526437bbb732b960d91b6064820152608401610998565b6001600160a01b0382166127c65760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b6064820152608401610998565b6127d1838383613447565b6127dc60008261337c565b6001600160a01b0383166000908152606860205260408120805460019290612805908490614e6e565b90915550506001600160a01b0382166000908152606860205260408120805460019290612833908490614e42565b909155505060008181526067602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b805160009081905b8015611e24576128dd82856128b2600185614e6e565b815181106128d057634e487b7160e01b600052603260045260246000fd5b602002602001015161365b565b9150806128e981614fae565b91505061289c565b60005b84811015610a095761295e86868381811061291f57634e487b7160e01b600052603260045260246000fd5b9050602002013585858481811061294657634e487b7160e01b600052603260045260246000fd5b90506020028101906129589190614dab565b85612c51565b8061296881614ffa565b9150506128f4565b6001600160a01b03821660008181526101356020526040808220849055518392917feb76a21470988c474a21f690cc28fee1ed511bd812dc3c21fd0f49c5e5d4708a91a35050565b6000806000805160206150978339815191525460405163721804d360e11b81523060048201526001600160a01b039091169150600090829063e43009a69060240160206040518083038186803b158015612a1157600080fd5b505afa158015612a25573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612a4991906146ab565b60405163e66f960360e01b8152600481018290529091506001600160a01b0383169063e66f96039060240160206040518083038186803b158015612a8c57600080fd5b505afa158015612aa0573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612ac49190613fb8565b9250505090565b6000612ad6826112a2565b9050612ae481600084613447565b612aef60008361337c565b6001600160a01b0381166000908152606860205260408120805460019290612b18908490614e6e565b909155505060008281526067602052604080822080546001600160a01b0319169055518391906001600160a01b038416907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908390a45050565b60008585604051602001612b87929190614aca565b60408051601f198184030181528282528051602091820120601f8901829004820284018201909252878352909250612bdb9183918990899081908401838280828437600092019190915250612cf192505050565b610a098187878080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525050604080516020601f8b018190048102820181019092528981529250899150889081908401838280828437600092019190915250889250613708915050565b612c5a84613843565b612ca65760405162461bcd60e51b815260206004820152601c60248201527f5265636f726453746f726167653a204b45595f4e4f545f464f554e44000000006044820152606401610998565b6114b184612cb3866119b5565b85858080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250879250613708915050565b612cfa82613843565b61106857600082815260c96020908152604090912082516109b992840190613e13565b606080612d29846119b5565b9150612d3584846134e4565b90509250929050565b6000612d4d610e72888a614e85565b9050612d6c8982612d66612d618b8d614e85565b613869565b85613906565b612d798686868685612e3d565b505050505050505050565b6000818152610137602052604081205460ff1680156108aa57506101366000612dab6122a7565b6001600160a01b0316815260208101919091526040016000205460ff1692915050565b60008051602061509783398151915254604051633805550f60e01b81526001600160a01b03909116908190633805550f90612e0f9086908690600401614bb9565b600060405180830381600087803b158015612e2957600080fd5b505af1158015610ee9573d6000803e3d6000fd5b60005b84811015610a0957612eb5868683818110612e6b57634e487b7160e01b600052603260045260246000fd5b9050602002810190612e7d9190614dab565b868685818110612e9d57634e487b7160e01b600052603260045260246000fd5b9050602002810190612eaf9190614dab565b86612b72565b80612ebf81614ffa565b915050612e40565b816001600160a01b0316836001600160a01b03161415612f295760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c6572000000000000006044820152606401610998565b6001600160a01b038381166000818152606a6020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b6040838101519051636ccbae5f60e01b8152600481019190915260009081903090636ccbae5f9060240160206040518083038186803b158015612fd857600080fd5b505afa158015612fec573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061301091906146ab565b905060006130be86606001518051906020012086886020015160405160200161305e9392919092835260609190911b6bffffffffffffffffffffffff19166020830152603482015260540190565b60408051601f1981840301815282825280516020918201207f19457468657265756d205369676e6564204d6573736167653a0a33320000000084830152603c8085019190915282518085039091018152605c909301909152815191012090565b90508186602001511480156130e4575085516130e4906001600160a01b03168286613958565b9695505050505050565b6130f98484846126ed565b61310584848484613aa8565b6114b15760405162461bcd60e51b815260040161099890614c4e565b606061013380546108bf90614fc5565b6060816131555750506040805180820190915260018152600360fc1b602082015290565b8160005b811561317f578061316981614ffa565b91506131789050600a83614e5a565b9150613159565b6000816001600160401b038111156131a757634e487b7160e01b600052604160045260246000fd5b6040519080825280601f01601f1916602001820160405280156131d1576020820181803683370190505b5090505b8415610cca576131e6600183614e6e565b91506131f3600a86615015565b6131fe906030614e42565b60f81b81838151811061322157634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a905350613243600a86614e5a565b94506131d5565b61325381612680565b610e5c8585858585612e3d565b6001600160a01b03811660008181526101356020526040808220829055517ffcf5eec0cfa3e6332f5f0e63ec242d71f866a61d121d6cdf5c2eb3b668a26c4f9190a250565b600054610100900460ff166132cc5760405162461bcd60e51b815260040161099890614d1e565b81516132df906065906020850190613e13565b5080516109b9906066906020840190613e13565b600054610100900460ff1661331a5760405162461bcd60e51b815260040161099890614d1e565b565b600054610100900460ff166133435760405162461bcd60e51b815260040161099890614d1e565b61123f81613bb9565b600054610100900460ff166133735760405162461bcd60e51b815260040161099890614d1e565b61123f81613c12565b600081815260696020526040902080546001600160a01b0319166001600160a01b03841690811790915581906133b1826112a2565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b600030331415613401575060331936013560601c90565b503390565b61dead6001600160a01b0383161480159061343857506001600160a01b03821660009081526101356020526040902054155b15611068576110688282612970565b6000818152610137602052604090205460ff16158061346e57506001600160a01b03821615155b6134ba5760405162461bcd60e51b815260206004820152601860248201527f52656769737472793a20544f4b454e5f555047524144454400000000000000006044820152606401610998565b6001600160a01b038316600090815261013560205260409020548114156109b9576109b983613260565b60606134ef82612d84565b1561350957506040805160208101909152600081526108aa565b60ca60006135168461362f565b81526020019081526020016000206000848152602001908152602001600020805461354090614fc5565b80601f016020809104026020016040519081016040528092919081815260200182805461356c90614fc5565b80156135b95780601f1061358e576101008083540402835291602001916135b9565b820191906000526020600020905b81548152906001019060200180831161359c57829003601f168201915b5050505050905092915050565b60608285856040516020016135dd93929190614a4f565b6040516020818303038152906040529050949350505050565b60608315613605575081610dd6565b8251156136155782518084602001fd5b8160405162461bcd60e51b81526004016109989190614bcd565b600081815260cb60205260408120541561365757600082815260cb60205260409020546108aa565b5090565b60008151600014156136a75760405162461bcd60e51b815260206004820152601560248201527452656769737472793a204c4142454c5f454d50545960581b6044820152606401610998565b82826040516020016136b99190614a33565b604051602081830303815290604052805190602001206040516020016136e9929190918252602082015260400190565b60408051601f1981840301815291905280516020909101209392505050565b60ca60006137158361362f565b81526020019081526020016000206000858152602001908152602001600020805461373f90614fc5565b1515905061379657826040516137559190614a33565b6040518091039020817f7ae4f661958fbecc2f77be6b0eb280d2a6f604b29e1e7221c82b9da0c4af7f868560405161378d9190614bcd565b60405180910390a35b8160ca60006137a48461362f565b8152602001908152602001600020600086815260200190815260200160002090805190602001906137d6929190613e13565b50816040516137e59190614a33565b6040518091039020836040516137fb9190614a33565b6040518091039020827f851ffe8e74d5015261dba0a1f9e1b0e5d42c5af5d2ad1908fee897c7d80a0d928686604051613835929190614be0565b60405180910390a450505050565b600081815260c960205260408120805482919061385f90614fc5565b9050119050919050565b606060008260008151811061388e57634e487b7160e01b600052603260045260246000fd5b602002602001015190506000600190505b8351811015611e2457818482815181106138c957634e487b7160e01b600052603260045260246000fd5b60200260200101516040516020016138e2929190614a8e565b604051602081830303815290604052915080806138fe90614ffa565b91505061389f565b61391084846122ef565b827fc5beef08f693b11c316c0c8394a377a0033c9cf701b8cd8afd79cecef60c3952836040516139409190614bcd565b60405180910390a280156114b1576114b18484613406565b60008060006139678585613c60565b9092509050600081600481111561398e57634e487b7160e01b600052602160045260246000fd5b1480156139ac5750856001600160a01b0316826001600160a01b0316145b156139bc57600192505050610dd6565b600080876001600160a01b0316631626ba7e60e01b88886040516024016139e4929190614ba0565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b0319909416939093179092529051613a229190614a33565b600060405180830381855afa9150503d8060008114613a5d576040519150601f19603f3d011682016040523d82523d6000602084013e613a62565b606091505b5091509150818015613a75575080516020145b8015613a9c57508051630b135d3f60e11b90613a9a90830160209081019084016146ab565b145b98975050505050505050565b60006001600160a01b0384163b15613bb157836001600160a01b031663150b7a02613ad16122a7565b8786866040518563ffffffff1660e01b8152600401613af39493929190614b35565b602060405180830381600087803b158015613b0d57600080fd5b505af1925050508015613b3d575060408051601f3d908101601f19168201909252613b3a918101906146df565b60015b613b97573d808015613b6b576040519150601f19603f3d011682016040523d82523d6000602084013e613b70565b606091505b508051613b8f5760405162461bcd60e51b815260040161099890614c4e565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050610cca565b506001610cca565b600054610100900460ff16613be05760405162461bcd60e51b815260040161099890614d1e565b806000805160206150978339815191525b80546001600160a01b0319166001600160a01b039290921691909117905550565b600054610100900460ff16613c395760405162461bcd60e51b815260040161099890614d1e565b807f8bea9a6f8afd34f4e29c585f854e0cc5161431bf5fc299d468454d33dce53b87613bf1565b600080825160411415613c975760208301516040840151606085015160001a613c8b87828585613ca6565b94509450505050613c9f565b506000905060025b9250929050565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0831115613cdd5750600090506003613d8a565b8460ff16601b14158015613cf557508460ff16601c14155b15613d065750600090506004613d8a565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015613d5a573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116613d8357600060019250925050613d8a565b9150600090505b94509492505050565b828054613d9f90614fc5565b90600052602060002090601f016020900481019282613dc15760008555613e07565b82601f10613dda5782800160ff19823516178555613e07565b82800160010185558215613e07579182015b82811115613e07578235825591602001919060010190613dec565b50613657929150613e87565b828054613e1f90614fc5565b90600052602060002090601f016020900481019282613e415760008555613e07565b82601f10613e5a57805160ff1916838001178555613e07565b82800160010185558215613e07579182015b82811115613e07578251825591602001919060010190613e6c565b5b808211156136575760008155600101613e88565b60008083601f840112613ead578182fd5b5081356001600160401b03811115613ec3578182fd5b6020830191508360208260051b8501011115613c9f57600080fd5b80358015158114613eee57600080fd5b919050565b60008083601f840112613f04578182fd5b5081356001600160401b03811115613f1a578182fd5b602083019150836020828501011115613c9f57600080fd5b600082601f830112613f42578081fd5b81356001600160401b03811115613f5b57613f5b615055565b613f6e601f8201601f1916602001614def565b818152846020838601011115613f82578283fd5b816020850160208301379081016020019190915292915050565b600060208284031215613fad578081fd5b8135610dd68161506b565b600060208284031215613fc9578081fd5b8151610dd68161506b565b60008060408385031215613fe6578081fd5b8235613ff18161506b565b915060208301356140018161506b565b809150509250929050565b60008060008060808587031215614021578182fd5b843561402c8161506b565b9350602085013561403c8161506b565b9250604085013561404c8161506b565b9150606085013561405c8161506b565b939692955090935050565b60008060006060848603121561407b578081fd5b83356140868161506b565b925060208401356140968161506b565b929592945050506040919091013590565b6000806000806000608086880312156140be578283fd5b85356140c98161506b565b945060208601356140d98161506b565b93506040860135925060608601356001600160401b038111156140fa578182fd5b61410688828901613ef3565b969995985093965092949392505050565b6000806000806080858703121561412c578182fd5b84356141378161506b565b935060208501356141478161506b565b92506040850135915060608501356001600160401b03811115614168578182fd5b61417487828801613f32565b91505092959194509250565b60008060008060008060006080888a03121561419a578485fd5b87356141a58161506b565b965060208801356001600160401b03808211156141c0578687fd5b6141cc8b838c01613e9c565b909850965060408a01359150808211156141e4578384fd5b6141f08b838c01613e9c565b909650945060608a0135915080821115614208578384fd5b506142158a828b01613e9c565b989b979a50959850939692959293505050565b60008060008060008060008060a0898b031215614243578182fd5b883561424e8161506b565b975060208901356001600160401b0380821115614269578384fd5b6142758c838d01613e9c565b909950975060408b013591508082111561428d578384fd5b6142998c838d01613e9c565b909750955060608b01359150808211156142b1578384fd5b506142be8b828c01613e9c565b90945092506142d1905060808a01613ede565b90509295985092959890939650565b600080604083850312156142f2578182fd5b82356142fd8161506b565b9150612d3560208401613ede565b60008060006040848603121561431f578081fd5b833561432a8161506b565b925060208401356001600160401b03811115614344578182fd5b61435086828701613ef3565b9497909650939450505050565b6000806040838503121561436f578182fd5b823561437a8161506b565b946020939093013593505050565b600080600080600080608087890312156143a0578384fd5b86356143ab8161506b565b95506020870135945060408701356001600160401b03808211156143cd578586fd5b6143d98a838b01613e9c565b909650945060608901359150808211156143f1578384fd5b506143fe89828a01613e9c565b979a9699509497509295939492505050565b600080600080600080600060a0888a03121561442a578081fd5b87356144358161506b565b96506020880135955060408801356001600160401b0380821115614457578283fd5b6144638b838c01613e9c565b909750955060608a013591508082111561447b578283fd5b506144888a828b01613e9c565b909450925061449b905060808901613ede565b905092959891949750929550565b600080600080606085870312156144be578182fd5b84356144c98161506b565b93506020850135925060408501356001600160401b038111156144ea578283fd5b6144f687828801613ef3565b95989497509550505050565b60008060208385031215614514578182fd5b82356001600160401b03811115614529578283fd5b61453585828601613e9c565b90969095509350505050565b600080600080600060608688031215614558578283fd5b85356001600160401b038082111561456e578485fd5b61457a89838a01613e9c565b90975095506020880135915080821115614592578485fd5b5061459f88828901613e9c565b96999598509660400135949350505050565b6000806000604084860312156145c5578081fd5b83356001600160401b038111156145da578182fd5b6145e686828701613e9c565b909790965060209590950135949350505050565b6000602080838503121561460c578182fd5b82356001600160401b03811115614621578283fd5b8301601f81018513614631578283fd5b803561464461463f82614e1f565b614def565b80828252848201915084840188868560051b8701011115614663578687fd5b8694505b83851015614685578035835260019490940193918501918501614667565b50979650505050505050565b6000602082840312156146a2578081fd5b610dd682613ede565b6000602082840312156146bc578081fd5b5051919050565b6000602082840312156146d4578081fd5b8135610dd681615080565b6000602082840312156146f0578081fd5b8151610dd681615080565b60008060008060008060006080888a031215614715578081fd5b87356001600160401b038082111561472b578283fd5b6147378b838c01613ef3565b909950975060208a0135965060408a0135915080821115614756578283fd5b6147628b838c01613e9c565b909650945060608a0135915080821115614208578283fd5b6000806020838503121561478c578182fd5b82356001600160401b038111156147a1578283fd5b61453585828601613ef3565b6000806000806000606086880312156147c4578283fd5b85356001600160401b03808211156147da578485fd5b6147e689838a01613ef3565b909750955060208801359150808211156147fe578485fd5b5061459f88828901613ef3565b60008060006040848603121561481f578081fd5b83356001600160401b03811115614834578182fd5b6145e686828701613ef3565b600060208284031215614851578081fd5b81356001600160401b03811115614866578182fd5b610cca84828501613f32565b600080600060408486031215614886578081fd5b83356001600160401b038082111561489c578283fd5b90850190608082880312156148af578283fd5b909350602085013590808211156148c4578283fd5b5061435086828701613ef3565b6000602082840312156148e2578081fd5b5035919050565b6000806000604084860312156148fd578081fd5b8335925060208401356001600160401b03811115614344578182fd5b6000806000806060858703121561492e578182fd5b8435935060208501356001600160401b0381111561494a578283fd5b61495687828801613ef3565b9598909750949560400135949350505050565b6000806040838503121561497b578182fd5b50508035926020909101359150565b600081518084526020808501808196508360051b81019150828601855b858110156149d15782840389526149bf848351614a07565b988501989350908401906001016149a7565b5091979650505050505050565b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b60008151808452614a1f816020860160208601614f82565b601f01601f19169290920160200192915050565b60008251614a45818460208701614f82565b9190910192915050565b60008451614a61818460208901614f82565b60609490941b6bffffffffffffffffffffffff191691909301908152601481019190915260340192915050565b60008351614aa0818460208801614f82565b601760f91b9083019081528351614abe816001840160208801614f82565b01600101949350505050565b8183823760009101908152919050565b60008351614aec818460208801614f82565b835190830190614b00818360208801614f82565b01949350505050565b6001600160a01b03848116825283166020820152606060408201819052600090610b5e90830184614a07565b6001600160a01b03858116825284166020820152604081018390526080606082018190526000906130e490830184614a07565b602081526000610dd6602083018461498a565b604081526000614b8e604083018561498a565b8281036020840152610dd2818561498a565b828152604060208201526000610cca6040830184614a07565b602081526000610cca6020830184866149de565b602081526000610dd66020830184614a07565b604081526000614bf36040830185614a07565b8281036020840152610dd28185614a07565b60208082526029908201527f52656769737472793a2053454e4445525f49535f4e4f545f415050524f5645446040820152682fa7a92fa7aba722a960b91b606082015260800190565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b60208082526027908201527f52656769737472793a2053454e4445525f49535f4e4f545f4d494e54494e475f60408201526626a0a720a3a2a960c91b606082015260800190565b60208082526017908201527f52656769737472793a20544f4b454e5f494e56414c4944000000000000000000604082015260600190565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b60208082526022908201527f52656769737472793a20494e53554646494349454e545f5045524d495353494f6040820152614e5360f01b606082015260800190565b6000808335601e19843603018112614dc1578283fd5b8301803591506001600160401b03821115614dda578283fd5b602001915036819003821315613c9f57600080fd5b604051601f8201601f191681016001600160401b0381118282101715614e1757614e17615055565b604052919050565b60006001600160401b03821115614e3857614e38615055565b5060051b60200190565b60008219821115614e5557614e55615029565b500190565b600082614e6957614e6961503f565b500490565b600082821015614e8057614e80615029565b500390565b6000614e9361463f84614e1f565b808482526020808301925084368760051b87011115614eb0578485fd5b845b87811015614eee5781356001600160401b03811115614ecf578687fd5b614edb36828a01613f32565b8652509382019390820190600101614eb2565b50919695505050505050565b600060808236031215614f0b578081fd5b604051608081016001600160401b038282108183111715614f2e57614f2e615055565b8160405284359150614f3f8261506b565b81835260208501356020840152604085013560408401526060850135915080821115614f69578384fd5b50614f7636828601613f32565b60608301525092915050565b60005b83811015614f9d578181015183820152602001614f85565b838111156114b15750506000910152565b600081614fbd57614fbd615029565b506000190190565b600181811c90821680614fd957607f821691505b6020821081141561146257634e487b7160e01b600052602260045260246000fd5b600060001982141561500e5761500e615029565b5060010190565b6000826150245761502461503f565b500690565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052601260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b038116811461123f57600080fd5b6001600160e01b03198116811461123f57600080fdfebe2bb46ac0377341a1ec5c3116d70fd5029d704bd46292e58f6265dd177ebafea164736f6c6343000804000a";
const isSuperArgs = (xs) => xs.length > 1;
class UNSRegistryMock__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
    }
    deploy(overrides) {
        return super.deploy(overrides || {});
    }
    getDeployTransaction(overrides) {
        return super.getDeployTransaction(overrides || {});
    }
    attach(address) {
        return super.attach(address);
    }
    connect(signer) {
        return super.connect(signer);
    }
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.UNSRegistryMock__factory = UNSRegistryMock__factory;
UNSRegistryMock__factory.bytecode = _bytecode;
UNSRegistryMock__factory.abi = _abi;
