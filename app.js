const CONTRACT_ADDRESS = "0x403C73A921FB11375816d4F035FC1711229F2b7F";
const BOWWW_TOKEN_ADDRESS = "0x284414b6777872E6DD8982394Fed1779dc87a3Cf";
const joinPrice = "3.69";
const rewardAmount = "1361.6";

let provider;
let signer;
let userAddress = "";

const connectWalletBtn = document.getElementById("connectWalletBtn");
const joinBtn = document.getElementById("joinBtn");
const walletStatus = document.getElementById("walletStatus");
const regionSelect = document.getElementById("regionSelect"); // ✅ This was missing

connectWalletBtn.addEventListener("click", async () => {
  if (window.ethereum) {
    try {
      provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      signer = provider.getSigner();
      userAddress = await signer.getAddress();
      walletStatus.textContent = userAddress.slice(0, 6) + "..." + userAddress.slice(-4);
      walletStatus.style.color = "green";
      joinBtn.disabled = false;
    } catch (err) {
      console.error(err);
      walletStatus.textContent = "Connection failed";
      walletStatus.style.color = "red";
    }
  } else {
    alert("MetaMask not found. Please install MetaMask.");
  }
});

joinBtn.addEventListener("click", async () => {
  if (!signer) {
    alert("Please connect your wallet first.");
    return;
  }

  const region = regionSelect.value;

  const contractABI = [
    "function joinGame(string memory region) public payable"
  ];

  const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);

  try {
    const tx = await contract.joinGame(region, {
      value: ethers.utils.parseEther(joinPrice)
    });
    await tx.wait();
    alert(`Success! You joined ${region} and received ${rewardAmount} $BOWWW.`);
  } catch (err) {
    console.error(err);
    alert("Transaction failed. Please check your wallet, network, or contract logic.");
  }
});





