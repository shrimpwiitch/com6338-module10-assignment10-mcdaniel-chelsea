window.addEventListener("DOMContentLoaded", () => {
    const quoteEl = document.getElementById("quote");
    const authorEl = document.getElementById("quote-author");
    const savedQuoteEl = document.getElementById("saved-quote");
    const newQuoteBtn = document.getElementById("new-quote-btn");
    const saveQuoteBtn = document.getElementById("save-quote-btn");

    if (savedQuoteEl) {
        const saved = localStorage.getItem("lastQuote");
        if (saved) savedQuoteEl.textContent = saved;
    }

    if (newQuoteBtn) {
        newQuoteBtn.addEventListener("click", async () => {
            try {
                const res = await fetch("https://api.quotable.io/random");
                const data = await res.json();
                const quoteText = `${data.content}`;
                const quoteAuthor = `${data.author}`;
                if (quoteEl) quoteEl.textContent = quoteText;
                if (authorEl) authorEl.textContent = quoteAuthor
            } catch (err) {
                console.error("Error fetching quote:", err);
            }
        });
    }

    if (saveQuoteBtn) {
        saveQuoteBtn.addEventListener("click", () => {
            if (quoteEl && authorEl) {
                const saved = `${quoteEl.textContent} ${authorEl.textContent}`;
                localStorage.setItem("lastQuote", saved);
             if (savedQuoteEl) savedQuoteEl.textContent = saved;
            }
        });
    }

    const pupImg = document.getElementById("pup-image");
    const newPupBtn = document.getElementById("new-pup-btn");
    const savePupBtn = document.getElementById("save-pup-btn");
    const savedPupText = document.getElementById("saved-pup");
    const savedPupImg = document.getElementById("saved-pup-image");

    if (pupImg) {
        const lastPup = localStorage.getItem("lastPupImage");
        if (lastPup) pupImg.src = lastPup
    }

    if (savedPupText && savedPupImg) {
        const savedText = localStorage.getItem("savedPupText");
        const savedImage = localStorage.getItem("savedPupImage");
        if (savedText) savedPupText.textContent = savedText;
        if (savedImage) savedPupImg.src = savedImage;
    }

    if (newPupBtn) {
        newPupBtn.addEventListener("click", async () => {
            try {
                const res = await fetch("https://dog.ceo/api/breeds/image/random");
                const data = await res.json();
                pupImg.src = data.message;
                localStorage.setItem("lastPupImage", data.message);
            }   catch (err) {
                console.error("Error fetching dog image", err);
            }
        });
    }

    if (savePupBtn) {
        savePupBtn.addEventListener("click", () => {
            if (!pupImg.src) {
                alert("No pup to save!");
                return;
            }
            const savedTime = `saved pup from ${new Date().toLocaleString()}`;
            localStorage.setItem("savedPupText", savedTime);
            localStorage.setItem("savedPupImage", pupImg.src);
            if (savedPupText) savedPupText.textContent = savedTime;
            if (savedPupImg) savedPupImg.src = pupImg.src;
        });
    }

    const moodForm = document.getElementById("mood-form");
    const moodSelect = document.getElementById("mood");
    const moodHistory = document.getElementById("mood-history");

    if (moodForm && moodSelect && moodHistory) {
        const moods = JSON.parse(localStorage.getItem("moodHistory") || "[]");

        moods.forEach(mood => {
            const li = document.createElement("li");
            li.textContent = mood;
            moodHistory.appendChild(li);
        });

        moodForm.addEventListener("submit", e => {
            e.preventDefault();
            const mood = moodSelect.value;
            const timestamp = new Date().toLocaleString();
            const entry = `${timestamp}: feeling ${mood}`;

            moods.push(entry);
            localStorage.setItem("moodHistory", JSON.stringify(moods));
            const li = document.createElement("li");
            li.textContent = entry;
            moodHistory.appendChild(li);
        });
    }
});