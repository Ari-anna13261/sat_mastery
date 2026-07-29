// =========================
// SAT Mastery Global Script
// =========================

// ---------- Timer ----------

let timeLeft = 300;

function startTimer() {

    const timer = document.getElementById("timer");

    if (!timer) return;

    const countdown = setInterval(() => {

        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        timer.textContent = minutes + ":" + seconds;

        timeLeft--;

        if (timeLeft < 0) {

            clearInterval(countdown);

            alert("⏰ Time is up!");

            if (typeof nextQuestion === "function") {
                nextQuestion();
            }

        }

    }, 1000);

}

// ---------- Vocabulary Card ----------

function flipCard() {

    const definition = document.getElementById("definition");

    if (!definition) return;

    if (definition.style.display === "none") {

        definition.style.display = "block";

    } else {

        definition.style.display = "none";

    }

}

// ---------- Start Timer ----------

window.onload = function () {

    startTimer();

};