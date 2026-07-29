import {
  auth,
  db,
  doc,
  setDoc,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  updateProfile
} from "./firebase.js";

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const message = document.getElementById("message");

const signupBtn = document.getElementById("signupBtn");
const loginBtn = document.getElementById("loginBtn");

// --------------------
// CREATE ACCOUNT
// --------------------

signupBtn.addEventListener("click", async () => {

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!name || !email || !password) {
        message.textContent = "Please fill in all fields.";
        return;
    }

    try {

        const userCredential =
            await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

        await updateProfile(userCredential.user, {
            displayName: name
        });

        await setDoc(doc(db, "students", userCredential.user.uid), {

    name: name,
    email: email,

    readingScore: 0,
    grammarScore: 0,
    mathScore: 0,

    quizzesCompleted: 0,

    estimatedSAT: 400,

    powerPack: 0,

    streak: 0,

    createdAt: new Date().toISOString()

});

        await sendEmailVerification(userCredential.user);

        message.style.color = "green";
        message.textContent =
            "Account created! Check your email to verify your account.";

    }

    catch (error) {

        message.style.color = "red";
        message.textContent = error.message;

    }

});

// --------------------
// LOGIN
// --------------------

loginBtn.addEventListener("click", async () => {

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    try {

        const userCredential =
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

        if (!userCredential.user.emailVerified) {

            message.style.color = "red";
            message.textContent =
                "Please verify your email before logging in.";

            return;
        }

        window.location.href = "index.html";

    }

    catch (error) {

        message.style.color = "red";
        message.textContent = error.message;

    }

});