function checkAnswer(answer){

if(answer==="B"){

alert("✅ Correct! Inference answers must be supported by evidence in the passage.");

}

else{

alert("❌ Not quite. Always choose the answer supported by the passage.");

}

}
function grammarAnswer(answer){

if(answer==="B"){

alert("✅ Correct! 'Students' is plural, so it takes the plural verb 'are'.");

}

else{

alert("❌ Try again! Match the subject with the correct verb.");

}

}
function mathAnswer(answer){

if(answer==="B"){

alert("✅ Correct!\n\n2x + 6 = 18\nSubtract 6 from both sides:\n2x = 12\nDivide by 2:\nx = 6");

}

else{

alert("❌ Try again!\n\nHint: Subtract 6 first, then divide by 2.");

}
}
function mathAnswer(answer){

if(answer==="B"){

alert("✅ Correct!\n\n5² = 25\nMultiply 5 by itself 2 times\n5 x 5 = 25");

}

else{

alert("❌ Try again!\n\nHint: Multiply 5 by itself the number of times as the index.");

}


}
function gradeTest(){

let score = 0;

let q1 = document.querySelector('input[name="q1"]:checked');
let q2 = document.querySelector('input[name="q2"]:checked');
let q3 = document.querySelector('input[name="q3"]:checked');
let q4 = document.querySelector('input[name="q4"]:checked');

if(q1 && q1.value==="B") score++;
if(q2 && q2.value==="B") score++;
if(q3 && q3.value==="B") score++;
if(q4 && q4.value==="B") score++;

let percent = Math.round((score/4)*100);

alert(
"You scored " +
score +
" out of 4!\n\n" +
"Percentage: " +
percent +
"%"
);
}

// Timer
let timeLeft = 300;

function startTimer(){

const timer = document.getElementById("timer");

if(!timer){
    return;
}

const countdown = setInterval(function(){

let minutes = Math.floor(timeLeft/60);
let seconds = timeLeft%60;

if(seconds<10){
seconds="0"+seconds;
}

timer.innerHTML = minutes + ":" + seconds;

timeLeft--;

if(timeLeft<0){

clearInterval(countdown);

alert("Time is up!");

gradeTest();

}

},1000);

}

window.onload = startTimer;

function flipCard(){

const definition = document.getElementById("definition");

if(definition.style.display==="none"){

definition.style.display="block";

}else{

definition.style.display="none";

}

}

function loadQuestion() {

  if (currentQuestion >= questions.length) {

    document.getElementById("question").innerHTML =
    "🎉 Practice Test Complete!";

    document.getElementById("answers").innerHTML =
    "<h2>Your Score: " + score + " / " + questions.length + "</h2>" +
    "<br><br>" +
    '<button onclick="window.location.href=\'index.html\'">🏠 Return to Home</button>';

    // Hide the Next Question button
    document.querySelector(".next-btn").style.display = "none";
  localStorage.setItem("score", score);

    localStorage.setItem("total", questions.length);
    window.location.href = "results.html";
    return;
  

}

    let q = questions[currentQuestion];

    document.getElementById("question").innerHTML = q.question;

    let html = "";

    for(let i=0;i<q.choices.length;i++){

        html += `
        <button onclick="checkQuizAnswer(${i})">
            ${q.choices[i]}
        </button>

        <br><br>
        `;

    }

    document.getElementById("answers").innerHTML = html;

}

function checkQuizAnswer(choice){

    if(choice===questions[currentQuestion].answer){

        score++;

        alert("✅ Correct!");

    }

    else{

        alert("❌ Incorrect!\n\n" + questions[currentQuestion].explanation);

    }

}

function nextQuestion(){

    currentQuestion++;

    loadQuestion();

}

window.onload = function(){

    startTimer();

    if(typeof loadQuestion === "function"){
        loadQuestion();
    }

};