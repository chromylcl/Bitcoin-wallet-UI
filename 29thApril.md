# Today's Task:
🎯 What you need to build

When user clicks Fetch:

Show:
- Tx ID
- Amount
- Maybe status (optional)
🧠 Step 1: Understand API

Use this endpoint:

https://mempool.space/api/address/{address}/txs

👉 This returns:

Array of transactions
🔍 Your task

Add:

console.log(data);

👉 Study structure:

Look for:

txid
vin
vout
🧠 Step 2: Understand transaction (important concept)

Each transaction has:

inputs (vin) → money going out
outputs (vout) → money coming in

👉 For now:
Don’t overcomplicate

🎯 Step 3: Basic implementation goal

For each transaction:

Display:
- txid

👉 Start simple → then improve

🧩 Step 4: DOM work (you figure out)

You already have:

<ul id="txList"></ul>

👉 Your job:

Clear list
Loop through transactions
Create <li>
Append to list

Search:

“JS createElement li”
“appendChild”
⚠️ Step 5: Important logic

Before adding new data:

👉 Clear old list

Otherwise:
❌ Data keeps stacking

🔥 Step 6: Improve (after basic works)

Once txid shows:

👉 Add:

shorten txid (first 10 chars)
amount (advanced)
clickable link
🧠 Think like this
Fetch txs
→ loop array
→ for each tx
→ create UI element
→ attach to DOM


🎯 Your challenge

Implement:

✅ Fetch transactions
✅ Show at least txid list
