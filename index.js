import { auth, onAuthStateChanged, signOut } from "./firebase.js";

const welcome = document.getElementById("welcomeMessage");
const logoutBtn = document.getElementById("logoutBtn");

onAuthStateChanged(auth, (user) => {

    if (user) {

        welcome.textContent = `👋 Welcome back, ${user.displayName}!`;

        logoutBtn.style.display = "inline-block";

    } else {

        welcome.textContent = "👋 Welcome to SAT Mastery!";

        logoutBtn.style.display = "none";

    }

});

logoutBtn.addEventListener("click", async () => {

    await signOut(auth);

    window.location.href = "login.html";

});