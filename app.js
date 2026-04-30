const input = document.querySelector("input");
const button = document.querySelector("button");
const balanceText = document.querySelector("p");
const transaction = document.querySelector("#txlist");
button.addEventListener("click", () => {
  const address = input.value;

  if (!address) {
    alert("Enter address please!");
    return;
  }

  balanceText.textContent = "Loading...";
  transaction.innerHTML = " "; // clearing old txs
  fetch(`https://mempool.space/api/address/${address}`)
    .then((res) => res.json())
    .then((data) => {
      const balanceValue =
        data.chain_stats.funded_txo_sum - data.chain_stats.spent_txo_sum;

      const btc = balanceValue / 100000000;

      balanceText.textContent = btc + " BTC";
    });

  fetch(`https://mempool.space/api/address/${address}/txs`)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((tx) => {
        let totalIn = 0;
        let totalOut = 0;
        tx.vout.forEach((out) => {
          if (out.scriptpubkey_address === address) {
            totalIn += out.value;
          }
        });
        tx.vin.forEach((input) => {
          if (input.prevout && input.prevout.scriptpubkey_address === address) {
            totalOut += input.prevout.value;
          }
        });

        const net = totalIn - totalOut;
        const btc = net / 100000000;

        // Create UI
        const li = document.createElement("li");
        const txiid = tx.txid;
        const currTime = Date.now();

        const txTime = new Date(tx.status.block_time * 1000);
        const diff = currTime - txTime.getTime();
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);

        let timeText;

        if (seconds < 60) {
          timeText = `${seconds} sec ago`;
        } else if (minutes < 60) {
          timeText = `${minutes} min ago`;
        } else if (hours < 24) {
          timeText = `${hours} hrs ago`;
        } else {
          const days = Math.floor(hours / 24);
          timeText = `${days} days ago`;
        }

        if (net > 0) {
          li.innerHTML = `<div class="crypto-card">
                            <span class="label">Received</span>
                            <div class="amount">+${btc.toFixed(6)} BTC</div>
                            <div class="txid"><a href="https://mempool.space/tx/${txiid}" target="_blank">${tx.txid.slice(0, 12)}</a></div>
                            <div class="txtime">${timeText}</div>
                            <button class="copy-btn">Copy</button>
                            </div>`;
          li.style.color = "lightgreen";
        } else if (net < 0) {
          li.innerHTML = `<div class="crypto-card">
                            <span class="label">Given</span>
                            <div class="amount">${btc.toFixed(6)} BTC</div>
                            <div class="txid"><a href="https://mempool.space/tx/${txiid}" target="_blank">${tx.txid.slice(0, 12)}</a></div>
                            <div class="txtime">${timeText}</div>
                            <button class="copy-btn">Copy</button>
                            </div>`;
          li.style.color = "red";
        } else {
          li.textContent = "0 BTC";
        }
        const copybtn = li.querySelector(".copy-btn");
        copybtn.addEventListener("click", () => {
          const txtcopy = `+${btc} BTC`;
          navigator.clipboard.writeText(txtcopy).then(() => {
            copybtn.textContent = "Copied!";

            setTimeout(() => {
              copybtn.textContent = "Copy!";
            }, 2000);
          });
        });
        transaction.appendChild(li);
      });
    });
});
