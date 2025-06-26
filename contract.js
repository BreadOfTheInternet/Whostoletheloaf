// contract.js
const CONTRACT_ADDRESS = "0x403C73A921FB11375816d4F035FC1711229F2b7F"; // New live contract
const CONTRACT_ABI = [
  {
    "inputs": [
      { "internalType": "string", "name": "region", "type": "string" }
    ],
    "name": "joinGame",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getRegions",
    "outputs": [{ "internalType": "string[]", "name": "", "type": "string[]" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "string", "name": "region", "type": "string" }],
    "name": "getHolderCount",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "week", "type": "uint256" }],
    "name": "getWeeklyThreshold",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "pure",
    "type": "function"
  }
];


