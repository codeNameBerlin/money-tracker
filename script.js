const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const popup = document.getElementById('popup');

// const dummyTransactions = [
//     {id: 1, text: 'Flower', amount: -50},
//     {id: 2, text: 'Salary', amount: 6000},
//     {id: 3, text: 'Vacation', amount: -2000},
//     {id: 4, text: 'Rent', amount: 2300}
// ];

const localStorageTransactions = JSON.parse(
    localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? 
localStorageTransactions : [];

// Add transaction
const addTransaction = (e) => {
    e.preventDefault();

        const deal = {
            id: getRandomId(),
            text: text.value,
            amount: +amount.value
        };
        
        transactions.push(deal);

        addTransactionToDOM(deal);

        updateValues();

        updateLocalStorage();

        text.value = '';
        amount.value = '';
}

// Get random id
const getRandomId = () => {
    return Math.floor(Math.random() * 100000000);
}

// Add transaction to DOM list
const addTransactionToDOM = (deal) => {
    // Get sign
    const sign = deal.amount < 0 ? '-' : '+';

    const item = document.createElement('li');

    // Get sign based on amount
    item.classList.add(deal.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `
    ${deal.text} <span>${sign}${Math.abs(deal.amount)}</span>
    <button class='delete-btn' onclick='deleteDeal(${deal.id})'>x</button>
    `;

    list.appendChild(item);
}

const updateValues = () => {
    const amounts = transactions.map(transaction => transaction.amount);

    const yourBalance = amounts
    .reduce((acc, val )=> (acc += val), 0).toFixed(2);
    
    const income = amounts.filter(val => val > 0)
    .reduce((acc, val) => (acc += val), 0)
    .toFixed(2);

    const expense = (amounts.filter(val => val < 0)
    .reduce((acc, val) => (acc += val), 0 ) * -1)
    .toFixed(2);

    balance.innerText = `$${yourBalance}`;
    moneyPlus.innerText = `$${income}`;
    moneyMinus.innerText = `$${expense}`;
}

// Delete deals by id
const deleteDeal = (id) => {
    transactions = transactions.filter(transaction => transaction.id 
    !== id);

    updateLocalStorage();

    init();
}

const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Initialize app
const init = () => {
    // Clear out list item
    list.innerHTML = '';

    // for each item add transaction to DOM
    transactions.forEach(addTransactionToDOM);

    // Update balance, income and expense
    updateValues();
}



// add event listener
form.addEventListener('submit', addTransaction);
init();