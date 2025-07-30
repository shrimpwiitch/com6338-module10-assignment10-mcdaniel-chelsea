window.addEventListener("DOMContentLoaded", () => {
    const savedQuote = localStorage.getItem("lastQuote");
    if (savedQuote) {
        document.getElementById("saved-quote").textContent = savedQuote;
    }
});

async function fetchQuote() {
    try {
        const res = await fetch("https://api.quotable.io/random");
        const data = await res.json();
        const quoteText = `"${data.content}"`;
        const quoteAuthor = `- ${data.author}`;

        document.getElementById("quote").textContent = quoteText;
        document.getElementById("quote-author").textContent = quoteAuthor;

        const combined = `${quoteText} ${quoteAuthor}`;
        localStorage.setItem("lastQuote", combined);
    } catch (err) {
        console.error("failed to fetch quote:", err);
    }
}

document.getElementById("new-quote-btn").addEventListener("click", fetchQuote);
