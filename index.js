import { auth, onAuthStateChanged, signOut } from "./firebase.js";

const welcome = document.getElementById("welcomeMessage");
const logoutBtn = document.getElementById("logoutBtn");
const startPracticeBtn = document.getElementById("startPracticeBtn");

onAuthStateChanged(auth, (user) => {

    if (user) {

        if (welcome) {
            welcome.textContent = `👋 Welcome back, ${user.displayName}!`;
        }

        if (logoutBtn) {
            logoutBtn.style.display = "inline-block";
        }

    } else {

        if (welcome) {
            welcome.textContent = "👋 Welcome to SAT Mastery!";
        }

        if (logoutBtn) {
            logoutBtn.style.display = "none";
        }

    }

    // Smart Start Practicing button
    if (startPracticeBtn) {

        startPracticeBtn.addEventListener("click", (e) => {

            e.preventDefault();

            if (user) {

                window.location.href = "practice.html";

            } else {

                window.location.href = "login.html";

            }

        });

    }

});

if (logoutBtn) {

    logoutBtn.addEventListener("click", async () => {

        await signOut(auth);

        window.location.href = "login.html";

    });

}