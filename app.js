// ==== UI Elements ====
const joinBtn = document.getElementById("joinBtn");
const regionSelect = document.getElementById("regionSelect");
const statusText = document.getElementById("status");

// ==== Event Listener ====
joinBtn.addEventListener("click", async () => {
  if (!contract || !signer) {
    statusText.textContent = "MetaMask not connected.";
    return;
  }

  const region = regionSelect.value;
  if (!region) {
    statusText.textContent = "Please select a region.";
    return;
  }

  try {
    const tx = await contract.joinGame(region, {
      value: ethers.utils.parseEther("3.69")
    });

    statusText.textContent = "Transaction sent. Waiting for confirmation...";
    await tx.wait();
    statusText.textContent = `Joined successfully in ${region} region! 🎉`;
  } catch (error) {
    console.error(error);
    statusText.textContent = "Transaction failed. Make sure you have enough MATIC.";
  }
});
