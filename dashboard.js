import {
    auth,
    db,
    doc,
    getDoc,
    onAuthStateChanged
} from "./firebase.js";

onAuthStateChanged(auth, async (user) => {

    if (!user) {

        window.location.href = "login.html";
        return;

    }

    document.getElementById("welcomeName").textContent =
        `Welcome back, ${user.displayName}!`;

    const ref = doc(db, "students", user.uid);

    const snap = await getDoc(ref);

    if (!snap.exists()) return;

    const data = snap.data();

    document.getElementById("estimatedScore").textContent =
        data.estimatedSAT;

    document.getElementById("powerPack").textContent =
        data.powerPack + "%";

    document.getElementById("streak").textContent =
        data.streak + " Days";

    document.getElementById("questionsCompleted").textContent =
        data.quizzesCompleted;

    document.getElementById("readingProgress").value =
        data.readingScore;

    document.getElementById("grammarProgress").value =
        data.grammarScore;

    document.getElementById("mathProgress").value =
        data.mathScore;

});