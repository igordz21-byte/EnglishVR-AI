const aiText = document.getElementById("aiText");
const startButton = document.getElementById("startButton");

const dialogue = [
    "Good afternoon.",
    "Welcome to Heathrow Airport.",
    "May I see your passport, please?"
];

let currentLine = 0;

startButton.addEventListener("click", startConversation);

function startConversation() {

    startButton.disabled = true;
    startButton.textContent = "Conversation in progress...";

    currentLine = 0;

    speakCurrentLine();
}

function speakCurrentLine() {

    if (currentLine >= dialogue.length) {

        aiText.innerHTML =
        "🎤 Your turn.<br><br>Please say:<br><b>Here is my passport.</b>";

        startButton.disabled = false;
        startButton.textContent = "Restart";

        return;
    }

    aiText.innerHTML = dialogue[currentLine];

    speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(dialogue[currentLine]);

    speech.lang = "en-GB";
    speech.rate = 0.92;
    speech.pitch = 1;

    speech.onend = () => {

        currentLine++;

        setTimeout(speakCurrentLine,700);

    };

    speechSynthesis.speak(speech);

}