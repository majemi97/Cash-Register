const cashInput = document.getElementById('cash');
const changeDue = document.getElementById('change-due');
const purchaseBtn = document.getElementById('purchase-btn');
const cidDisplay = document.getElementById('cash-in-drawer'); 

let cid = [
  ["PENNY", 0.5],
  ["NICKEL", 0],
  ["DIME", 0],
  ["QUARTER", 0],
  ["ONE", 0],
  ["FIVE", 0],
  ["TEN", 0],
  ["TWENTY", 0],
  ["ONE HUNDRED", 0]
];
let price = 19.5;
let cash;

const currencyValues = {
  "PENNY": 0.01,
  "NICKEL": 0.05,
  "DIME": 0.1,
  "QUARTER": 0.25,
  "ONE": 1,
  "FIVE": 5,
  "TEN": 10,
  "TWENTY": 20,
  "ONE HUNDRED": 100
};

const purchaseCalculation = () => {
  cash = parseFloat(cashInput.value);
  let change = cash - price;

  if (cash < price) {
    alert('Customer does not have enough money to purchase the item');
    return;
  } 
  
  if (cash === price) {
    changeDue.textContent = "No change due - customer paid with exact cash";
    return;
  } 

  let changeArr = [];
  let cidTotal = cid.reduce((total, [unit, amount]) => total + amount, 0);
  cidTotal = Math.round(cidTotal * 100) / 100;

  if (change > cidTotal) {
    changeDue.textContent = "Status: INSUFFICIENT_FUNDS";
    return;
  } else if (change === cidTotal) {
    changeArr.push(["PENNY", 0.5]);
    let changeMessage = "Status: CLOSED ";
    for (let i = 0; i < changeArr.length; i++) {
      changeMessage += `${changeArr[i][0]}: $${changeArr[i][1].toFixed(2)} `;
    }
    changeDue.textContent = changeMessage;
    return;
  }

  for (let i = cid.length - 1; i >= 0; i--) {
    let [unit, amount] = cid[i];
    let unitValue = currencyValues[unit];
    let amountToReturn = 0;

    while (change >= unitValue && amount > 0) {
      change -= unitValue;
      change = Math.round(change * 100) / 100;
      amount -= unitValue;
      amountToReturn += unitValue;
    }

    if (amountToReturn > 0) {
      changeArr.push([unit, amountToReturn]);
    }
  }
  
  if (change === 0) {
    let changeMessage = "Status: OPEN ";
    for (let i = 0; i < changeArr.length; i++) {
      changeMessage += `${changeArr[i][0]}: $${changeArr[i][1].toFixed(2)} `;
    }
    changeDue.textContent = changeMessage;
  } else {
    changeDue.textContent = "Status: INSUFFICIENT_FUNDS";
  }
};

purchaseBtn.addEventListener("click", purchaseCalculation);

cidDisplay.innerHTML = "<p><strong>Cash in Drawer:</strong></p>";
cid.forEach(item => {
  cidDisplay.innerHTML += `<p>${item[0]}: $${item[1].toFixed(2)}</p>`;
});
