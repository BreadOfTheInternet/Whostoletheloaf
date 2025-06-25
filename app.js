// app.js

const CONTRACT_ADDRESS = "0xYourContractAddressHere"; // Replace with your deployed contract address

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

let signer;
let contract;

async function connectWallet() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const userAddress = accounts[0];

      // Update UI
      const connectBtn = document.getElementById("connectButton");
      connectBtn.innerText = "Connected ✅";
      connectBtn.disabled = true;
      document.getElementById("walletAddress").innerText = `Connected: ${shortenAddress(userAddress)}`;

      // Enable Join button
      document.getElementById("joinButton").disabled = false;

      // Set up provider, signer, and contract
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner();
      contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    } catch (error) {
      console.error("Wallet connection error:", error);
    }
  } else {
    alert("MetaMask is not detected. Please install MetaMask.");
  }
}

function shortenAddress(address) {
  return address.slice(0, 6) + "..." + address.slice(-4);
}

async function joinGame() {
  const region = document.getElementById("regionSelect").value;
  const valueInEther = "3.69";

  try {
    const tx = await contract.joinGame(region, {
      value: ethers.utils.parseEther(valueInEther)
    });

    await tx.wait();

    document.getElementById("confirmation").innerText = "Successfully joined! Welcome to the bread war 🍞";
    document.getElementById("confirmation").style.color = "green";
  } catch (err) {
    console.error(err);
    document.getElementById("confirmation").innerText = "Transaction failed. Please try again.";
    document.getElementById("confirmation").style.color = "red";
  }
}

