let score = localStorage.getItem("score");

let total = localStorage.getItem("total");

document.getElementById("finalScore").innerHTML =
score + " / " + total;

let percent = Math.round((score/total)*100);

if(percent>=90){

document.getElementById("message").innerHTML =
"🌟 Outstanding! You're on track for an excellent SAT score.";

}

else if(percent>=75){

document.getElementById("message").innerHTML =
"👏 Great work! Keep practicing to improve.";

}

else{

document.getElementById("message").innerHTML =
"💪 Keep studying! Every practice session makes you stronger.";

}