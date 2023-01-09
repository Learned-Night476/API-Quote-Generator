const quoteContainer = document.querySelector("#quote-container");
const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const twitterBtn = document.querySelector("#twitter");
const newQuoteBtn = document.querySelector("#new-quote");
const loader = document.querySelector('.loader');


// Get Quotes from API: Async fetch request. Async can run at anytime independently and won't stop the browser
let apiQuotes = [];

// Loader function
// show loading
function loading() {
    loader.hidden = false; //when the loader is going we'll only see the loader
    quoteContainer.hidden = true;
}

function loadComplete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show New Quote and picks a randome quote from the array
function newQuote() {
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Checks if author field is blank and replaces it with Unknown
    if (!quote.author) {
        authorText.textContent = "Unknown";
    } else {
        authorText.textContent = quote.author;
    }
    if (quote.text.length > 100) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

    quoteText.textContent = quote.text;
    loadComplete();
}

async function getQuotes() {
    loading();
    const apiURL='https://type.fit/api/quotes'; 
    try {
        const response = await fetch(apiURL);
        apiQuotes = await response.json(); // Get the json from the api and turn that response into a json object and pass that into a global variable: apiQuotes
        newQuote();
    } catch (error) {
        alert(error)
        console.log("Houston we have a problem");
        // Catch error here
    }
}

// Twitter function

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`; // back tics because of the ? query parameter. It's a template string which allows a variable to be passed and then converted into a string.
    window.open(twitterUrl, '_blank');
}

// Function is declared before being called

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);


// Responsibility is not inherited, it is a choice that everyone needs to make at some point in their life. 
// - Byron Pulsifer

// If you seek truth you will not seek victory by dishonourable means, and if you find truth you will become invincible.
// - Epictetus

// It's never too late to be what you might have been.
// - George Eliot

// On Load

getQuotes();
loading();