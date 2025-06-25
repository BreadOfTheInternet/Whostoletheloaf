// app.js
let signer;
let userAddress = "";

// DOM Elements
const connectButton = document.getElementById("connectButton");
const joinButton = document.getElementById("joinButton");
const regionSelect = document.getElementById("regionSelect");
const walletStatus = document.getElementById("walletStatus");
const walletAddressDisplay = document.getElementById("walletAddress");

// Helper to shorten address
function shortenAddress(address) {
  return address.slice(0, 6) + "..." + address.slice(-4);
}

// Connect wallet
async function connectWallet() {
  if (!window.ethereum) {
    alert("Please install MetaMask.");
    return;
  }

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    userAddress = await signer.getAddress();

    walletStatus.textContent = "Connected:";
    walletAddressDisplay.textContent = shortenAddress(userAddress);
    walletAddressDisplay.style.color = "green";

    connectButton.textContent = "Wallet Connected ✅";
    connectButton.disabled = true;
    joinButton.disabled = false;
  } catch (err) {
    console.error(err);
  }
}

// Join game
async function joinGame() {
  if (!signer) {
    alert("Please connect your wallet first.");
    return;
  }

  const region = regionSelect.value;

  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

  try {
    const tx = await contract.joinGame(region, {
      value: ethers.utils.parseEther("3.69")
    });

    await tx.wait();
    alert("Successfully joined " + region + "! 🎉");
  } catch (err) {
    console.error("Join failed:", err);
    alert("Transaction failed.");
  }
}

// Disable join on load
window.onload = () => {
  joinButton.disabled = true;
};


