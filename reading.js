const score =
Number(localStorage.getItem("score"));

const total =
Number(localStorage.getItem("total"));

const percent =
Math.round((score/total)*100);

document.getElementById("scoreText").innerHTML =
"You scored " + score + " out of " + total;

document.getElementById("percentText").innerHTML =
"Percentage: " + percent + "%";

localStorage.setItem("latestPercent",percent);