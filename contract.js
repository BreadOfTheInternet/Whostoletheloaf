// ==== Contract Info ====
const CONTRACT_ADDRESS = "0x62b5433913dc1c2e9c18967b97abd003f40abf74"; // WhoStoleTheLoaf contract
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
    "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "name": "regionOf",
    "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
    "stateMutability": "view",
    "type": "function"
  }
];

// ==== Setup Web3 Provider ====
let provider;
let signer;
let contract;

async function initContract() {
  if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  } else {
    alert("MetaMask not detected. Please install MetaMask.");
  }
}

window.onload = initContract;
