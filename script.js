document.addEventListener("DOMContentLoaded", function () {
    const textDisplay = document.getElementById("text-display");
    const userInput = document.getElementById("user-input");
    const timerDisplay = document.getElementById("timer");
    const accuracyDisplay = document.getElementById("accuracy");
    const wpmDisplay = document.getElementById("wpm");
    const restartButton = document.getElementById("restart");

    let timer;
    let timeLeft = 60;
    let isGameActive = false;
    let originalText = "";
    let correctChars = 0;
    let totalTyped = 0;
    let correctWords = 0;
    let startTime = null;

    const sampleTexts = [
        `Nature is beautiful and full of wonders. The sky changes color during sunset. Forests are home to many creatures. Waterfalls create a peaceful sound. Mountains stand tall and strong. Rivers flow endlessly through valleys. The sound of birds chirping is soothing. Flowers bloom in vibrant colors.`,

        `The ocean is vast and mysterious. Waves crash against the shore, creating a rhythmic sound. The deep sea holds creatures yet to be discovered. Coral reefs are home to many marine species. Sunlight reflects beautifully on the water surface. The salty breeze refreshes the soul.`,

        `Seasons bring different shades to nature. Spring is colorful with blossoms. Summer is warm and bright. Autumn leaves fall in shades of red and orange. Winter covers the land in white snow. Each season has its charm and beauty.`
    ];

    function loadText() {
        originalText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)].trim();
        textDisplay.innerText = originalText;
        userInput.value = "";
        userInput.disabled = false;
        timerDisplay.innerText = timeLeft + "s";
        accuracyDisplay.innerText = "100%";
        wpmDisplay.innerText = "0";
        correctChars = 0;
        totalTyped = 0;
        correctWords = 0;
        startTime = null;
    }

    function startGame() {
        if (isGameActive) return;
        isGameActive = true;
        startTime = new Date();
        timer = setInterval(updateTimer, 1000);
    }

    function updateTimer() {
        if (timeLeft > 0) {
            timeLeft--;
            timerDisplay.innerText = timeLeft + "s";
        } else {
            clearInterval(timer);
            isGameActive = false;
            userInput.disabled = true;
        }
    }

    function calculateWPM() {
        let typedWords = userInput.value.trim().split(/\s+/);
    let originalWords = originalText.trim().split(/\s+/);
    correctWords = 0;

    for (let i = 0; i < typedWords.length && i < originalWords.length; i++) {
        if (typedWords[i] === originalWords[i]) {
            correctWords++;
        }
    }

    if (!startTime) return;
    let elapsedTime = (new Date() - startTime) / 60000; // Convert milliseconds to minutes
    let wpm = elapsedTime > 0 ? Math.round((correctWords / elapsedTime)) : 0; // Calculate WPM
    wpmDisplay.innerText = wpm;
    }

    function calculateAccuracy() {
        let typedText = userInput.value;
        let originalSubText = originalText.substring(0, typedText.length);
        correctChars = 0;
        totalTyped = typedText.length;
    
        for (let i = 0; i < totalTyped; i++) {
            if (typedText[i] === originalSubText[i]) {
                correctChars++;
            }
        }
    
        // Calculate accuracy
        let accuracy = totalTyped > 0 ? (correctChars / totalTyped) * 100 : 100; // Avoid division by zero
        accuracyDisplay.innerText = Math.round(accuracy) + "%";
    }

    function restartGame() {
        clearInterval(timer);
        isGameActive = false;
        timeLeft = 60;
        loadText();
    }

    userInput.addEventListener("input", () => {
        if (!isGameActive) startGame();
        calculateAccuracy();
        calculateWPM();
    });

    restartButton.addEventListener("click", restartGame);

    loadText();
});
