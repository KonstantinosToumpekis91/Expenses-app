const $balance = document.querySelector("#balance");
const $money_plus = document.querySelector("#money-plus");
const $money_minus = document.querySelector("#money-minus");
const $list = document.querySelector("#list");
const $form = document.querySelector("#form");
const $text = document.querySelector("#text");
const $amount = document.querySelector("#amount");

const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);

let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

function addTransaction(e) {
  e.preventDefault();
  if ($text.value.trim() === "" || $amount.value.trim() === "") {
    alert("please add a text and amount!");
  } else {
    const transaction = {
      id: generateID(),
      text: $text.value,
      amount: Number($amount.value),
    };
    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();
    updateLocalStorage();
    $text.value = "";
    $amount.value = "";
  }
}

function generateID() {
  return Math.floor(Math.random() * 100000);
}

function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? "-" : "+";
  const item = document.createElement("li");
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  item.innerHTML = `${transaction.text}<span>${sign}${Math.abs(
    transaction.amount
  )}</span>
  <button class = "delete-btn" onclick = "removeTransaction(${
    transaction.id
  })">X</button>`;

  $list.appendChild(item);
}

function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  updateLocalStorage();
  init();
}

function init() {
  $list.innerHTML = "";
  transactions.forEach(addTransactionDOM);
  updateValues();
}

function updateValues() {
  const amounts = transactions.map((transaction) => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  $balance.innerText = `${total} euros`;
  $money_plus.innerText = `${income} euros`;
  $money_minus.innerText = `${expense} euros`;

  console.log(total, income, expense);
}

function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

init();
$form.addEventListener("submit", addTransaction);
