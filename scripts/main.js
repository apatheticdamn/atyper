const textArea = document.querySelector('#text-area');
const btn = document.querySelector('#btn');
const score = document.querySelector('#score');
const showQuote = document.querySelector('#show-quote');

let startTime, endTime, totalTimeTaken;

const fetchQuote = async () => {
    try {
        const response = await fetch('https://api.quotable.io/random');
        const data = await response.json();
        return data.content;
    } catch (error) {
        console.error('Error fetching quote:', error);
    }
};

const calculateTypingSpeed = (timeTaken) => {
    const userTypedWords = textArea.value.trim().split(/\s+/);
    const displayedWords = showQuote.innerText.trim().split(/\s+/);

    let correctWordsCount = 0;

    for (let i = 0; i < userTypedWords.length; i++) {
        if (userTypedWords[i] === displayedWords[i]) {
            correctWordsCount++;
        }
    }

    const typingSpeed = (correctWordsCount / timeTaken) * 60;
    score.innerHTML = `Speed: <span style="color: #bb0a1e;">${Math.round(typingSpeed)}</span> WPM<br>Words: <span style="color: #bb0a1e;">${correctWordsCount}</span> words<br>Time: <span style="color: #bb0a1e;">${Math.round(timeTaken)}</span> seconds`;
};

const endTypingTest = () => {
    btn.innerText = "Start";
    textArea.setAttribute('disabled', 'true');

    const date = new Date();
    endTime = date.getTime();

    totalTimeTaken = (endTime - startTime) / 1000;

    calculateTypingSpeed(totalTimeTaken);

    showQuote.innerHTML = "";
    textArea.value = "";
};

const startTyping = async () => {
    const quote = await fetchQuote();
    showQuote.innerHTML = quote;

    const date = new Date();
    startTime = date.getTime();

    btn.innerText = "Done";
    textArea.removeAttribute('disabled');
    textArea.focus(); 
};

btn.addEventListener('click', () => {
    switch (btn.innerText.toLowerCase()) {
        case "start":
            startTyping();
            break;

        case "done":
            endTypingTest();
            break;
    }
});

textArea.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        btn.click();
    }
});

textArea.setAttribute('disabled', 'true');
