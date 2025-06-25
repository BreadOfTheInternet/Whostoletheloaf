const CONTRACT_ADDRESS = "0x62B5433913dC1C2E9C18967b97abd003F40AbF74";
const BOWWW_TOKEN_ADDRESS = "0x284414b6777872E6DD8982394Fed1779dc87a3Cf";
const joinPrice = "3.69";
const rewardAmount = "1361.6";

let provider;
let signer;
let userAddress = "";

const connectWalletBtn = document.getElementById("connectWalletBtn");
const joinBtn = document.getElementById("joinBtn");
const walletStatus = document.getElementById("walletStatus");

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
  if (!signer) return alert("Please connect your wallet first.");

  const region = document.getElementById("regionSelect").value;

  const contract = new ethers.Contract(CONTRACT_ADDRESS, [
    "function join(string memory _region) public payable"
  ], signer);

  try {
    const tx = await contract.join(region, {
      value: ethers.utils.parseEther(joinPrice)
    });
    await tx.wait();
    alert(`Success! You joined ${region} and received ${rewardAmount} $BOWWW.`);
  } catch (err) {
    console.error(err);
    alert("Transaction failed. Check your network and balance.");
  }
});



