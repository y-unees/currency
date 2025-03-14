const apiUrl = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json";
const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const resultDisplay = document.getElementById("result");

async function fetchCurrencies() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const rates = Object.keys(data.eur);
        
        rates.forEach(currency => {
            fromCurrency.innerHTML += `<option value="${currency}">${currency.toUpperCase()}</option>`;
            toCurrency.innerHTML += `<option value="${currency}">${currency.toUpperCase()}</option>`;
        });

        fromCurrency.value = "usd";
        toCurrency.value = "npr";
    } catch (error) {
        console.error("Error fetching currencies:", error);
    }
}

async function convert() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const rates = data.eur;

        let fromRate = rates[fromCurrency.value];
        let toRate = rates[toCurrency.value];

        if (!fromRate || !toRate) {
            resultDisplay.innerText = "Invalid currency selection!";
            return;
        }

        let convertedAmount = (amountInput.value / fromRate) * toRate;
        resultDisplay.innerText = `Converted Amount: ${convertedAmount.toFixed(2)} ${toCurrency.value.toUpperCase()}`;
    } catch (error) {
        console.error("Conversion error:", error);
        resultDisplay.innerText = "Error in conversion!";
    }
}

fetchCurrencies();