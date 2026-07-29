import {
    auth,
    db,
    doc,
    getDoc,
    updateDoc,
    increment
} from "./firebase.js";

const questions = [
    {
        question: "Solve for x: 2x + 8 = 20",
        choices: ["4", "6", "8", "10"],
        answer: 1,
        explanation: "Subtract 8 from both sides to get 2x = 12. Divide by 2, so x = 6."
    },
    {
        question: "Which sentence is grammatically correct?",
        choices: [
            "The team are winning.",
            "The team is winning.",
            "The team be winning.",
            "The team were wins."
        ],
        answer: 1,
        explanation: "'Team' is treated as a singular noun, so it takes 'is'."
    },
    {
        question: "Inference questions require you to...",
        choices: [
            "Guess",
            "Use evidence from the passage",
            "Choose the longest answer",
            "Ignore the passage"
        ],
        answer: 1,
        explanation: "Inference questions must be answered using evidence from the passage."
    }
];

let currentQuestion = 0;
let score = 0;

loadQuestion();

function loadQuestion() {

    document.getElementById("question").textContent =
        questions[currentQuestion].question;

    let answersHTML = "";

    questions[currentQuestion].choices.forEach((choice, index) => {

        answersHTML += `
            <button class="answerButton" onclick="checkAnswer(${index})">
                ${choice}
            </button>
        `;

    });

    document.getElementById("answers").innerHTML = answersHTML;

    document.getElementById("explanation").style.display = "none";
    document.getElementById("explanation").textContent = "";

    document.getElementById("nextButton").style.display = "none";
}

window.checkAnswer = function(selected) {

    const buttons = document.querySelectorAll(".answerButton");
    const correct = questions[currentQuestion].answer;

    buttons.forEach((button, index) => {

        button.disabled = true;

        if (index === correct) {
            button.classList.add("correct");
        }

        if (index === selected && selected !== correct) {
            button.classList.add("incorrect");
        }

    });

    if (selected === correct) {
        score++;
    }

    document.getElementById("explanation").style.display = "block";
    document.getElementById("explanation").textContent =
        questions[currentQuestion].explanation;

    document.getElementById("nextButton").style.display = "inline-block";
};

async function saveProgress() {

    const user = auth.currentUser;

    if (!user) return;

    const percent = Math.round((score / questions.length) * 100);

    const estimatedSAT = 400 + Math.round(percent * 12);

    const studentRef = doc(db, "students", user.uid);

    const studentSnap = await getDoc(studentRef);

    if (!studentSnap.exists()) return;

    const data = studentSnap.data();

    await updateDoc(studentRef, {

        readingScore: Math.max(data.readingScore || 0, percent),

        estimatedSAT: Math.max(data.estimatedSAT || 400, estimatedSAT),

        quizzesCompleted: increment(1),

        powerPack: increment(5)

    });

}

window.nextQuestion = async function() {

    currentQuestion++;

    if (currentQuestion >= questions.length) {

        await saveProgress();

        localStorage.setItem("score", score);
        localStorage.setItem("total", questions.length);

        window.location.href = "results.html";

        return;
    }

    loadQuestion();

};