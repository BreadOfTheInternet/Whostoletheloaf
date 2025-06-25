// app.js
async function joinGame() {
  const region = document.getElementById("regionSelect").value;

  if (!window.ethereum) {
    alert("MetaMask is not detected. Please install MetaMask.");
    return;
  }

  try {
    await ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    const tx = await contract.joinGame(region, {
      value: ethers.utils.parseEther("3.69"),
    });

    await tx.wait();
    document.getElementById("confirmation").innerText = `Joined ${region} successfully!`;
  } catch (err) {
    console.error(err);
    alert("Transaction failed. Check console for details.");
  }
}

// Optional: Connect wallet button
async function connectWallet() {
  if (typeof window.ethereum !== "undefined") {
    try {
      await ethereum.request({ method: "eth_requestAccounts" });
      alert("Wallet connected successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to connect wallet.");
    }
  } else {
    alert("MetaMask is not installed. Please install it to continue.");
  }
}
