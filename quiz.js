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

function loadQuestion(){

    document.getElementById("question").innerHTML =
        questions[currentQuestion].question;

    let answers = "";

    questions[currentQuestion].choices.forEach(function(choice,index){

        answers +=
        `<button class="answerButton"
        onclick="checkAnswer(${index})">
        ${choice}
        </button>`;

    });

    document.getElementById("answers").innerHTML = answers;

    document.getElementById("explanation").style.display = "none";
    document.getElementById("explanation").innerHTML = "";

    document.getElementById("nextButton").style.display = "none";

}

function checkAnswer(selected){

    const buttons =
    document.querySelectorAll(".answerButton");

    const correct =
    questions[currentQuestion].answer;

    buttons.forEach(function(button,index){

        button.disabled = true;

        if(index===correct){

            button.classList.add("correct");

        }

        if(index===selected && selected!==correct){

            button.classList.add("incorrect");

        }

    });

    if(selected===correct){

        score++;

    }

    document.getElementById("explanation").style.display="block";

    document.getElementById("explanation").innerHTML=
        questions[currentQuestion].explanation;

    document.getElementById("nextButton").style.display="block";

}

function nextQuestion(){

    currentQuestion++;

    if(currentQuestion>=questions.length){

        localStorage.setItem("score",score);
        localStorage.setItem("total",questions.length);

        window.location="results.html";

        return;

    }

    loadQuestion();

}