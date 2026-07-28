const score = localStorage.getItem("score") || 0;
const total = localStorage.getItem("total") || 0;

if(document.getElementById("estimatedScore")){

let percent = 0;

if(total > 0){
    percent = Math.round((score/total)*100);
}

let satScore = 400 + Math.round(percent * 12);

document.getElementById("estimatedScore").innerHTML = satScore;

}