const display = document.getElementById("display");
let history = JSON.parse(localStorage.getItem("history")) || [];

function appendToInput(value) {
    display.value += value;
}

function clearInput() {
    display.value = "";
}

function calculate() {
    try {
        const result = eval(display.value);
        addToHistory(display.value + " = " + result);
        display.value = result;
    } catch {
        display.value = "Kļūda";
    }
}

function addToHistory(calculation) {
    history.push(calculation);
    updateHistory();
}

function updateHistory() {
    localStorage.setItem("history", JSON.stringify(history));
    const historyList = document.getElementById("historyList");
    historyList.innerHTML = "";
    history.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `${item} <button onclick="removeFromHistory(${index})">Dzēst</button>`;
        historyList.appendChild(li);
    });
}

function removeFromHistory(index) {
    history.splice(index, 1);
    updateHistory();
}

function clearHistory() {
    history = [];
    updateHistory();
}

window.onload = updateHistory;
