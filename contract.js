// contract.js
const CONTRACT_ADDRESS = "0xYourContractAddressHere"; // <-- Replace with actual address
const CONTRACT_ABI = [
  {
    "inputs": [
      { "internalType": "string", "name": "region", "type": "string" }
    ],
    "name": "joinGame",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }
];
