import {
    auth,
    db,
    doc,
    setDoc,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
    sendPasswordResetEmail,
    updateProfile
} from "./firebase.js";

// --------------------
// ELEMENTS
// --------------------

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const message = document.getElementById("message");

const signupBtn = document.getElementById("signupBtn");
const loginBtn = document.getElementById("loginBtn");
const resendBtn = document.getElementById("resendBtn");
const resetBtn = document.getElementById("resetBtn");
const togglePassword = document.getElementById("togglePassword");

// --------------------
// CREATE ACCOUNT
// --------------------

signupBtn.addEventListener("click", async () => {

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!name || !email || !password) {

        message.style.color = "red";
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

        message.innerHTML =
            "✅ Account created successfully!<br><br>" +
            "A verification email has been sent.<br>" +
            "Please check your Inbox, Spam, Junk, and Promotions folders before logging in.";

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

            message.innerHTML =
                "⚠️ Please verify your email before logging in.<br><br>" +
                "Check your Inbox, Spam, Junk, or Promotions folder.";

            return;

        }

        window.location.href = "index.html";

    }

    catch (error) {

        message.style.color = "red";
        message.textContent = error.message;

    }

});

// --------------------
// SHOW / HIDE PASSWORD
// --------------------

togglePassword.addEventListener("click", () => {

    const icon = togglePassword.querySelector("i");

    if(passwordInput.type==="password"){

        passwordInput.type="text";

        icon.classList.remove("fa-eye");

        icon.classList.add("fa-eye-slash");

    }

    else{

        passwordInput.type="password";

        icon.classList.remove("fa-eye-slash");

        icon.classList.add("fa-eye");

    }

});
// --------------------
// RESEND VERIFICATION EMAIL
// --------------------

resendBtn.addEventListener("click", async () => {

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email || !password) {

        message.style.color = "red";
        message.textContent =
            "Please enter your email and password first.";

        return;

    }

    try {

        const userCredential =
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

        await sendEmailVerification(userCredential.user);

        message.style.color = "green";

        message.innerHTML =
            "✅ Verification email sent!<br><br>" +
            "Please check your Inbox, Spam, Junk, and Promotions folders.";

    }

    catch (error) {

        message.style.color = "red";
        message.textContent = error.message;

    }

});

// --------------------
// FORGOT PASSWORD
// --------------------

resetBtn.addEventListener("click", async () => {

    const email = emailInput.value.trim();

    if (!email) {

        message.style.color = "red";
        message.textContent =
            "Please enter your email address first.";

        return;

    }

    try {

        await sendPasswordResetEmail(auth, email);

        message.style.color = "green";

        message.innerHTML =
            "✅ Password reset email sent!<br><br>" +
            "Please check your Inbox, Spam, Junk, and Promotions folders.";

    }

    catch (error) {

        message.style.color = "red";
        message.textContent = error.message;

    }

});