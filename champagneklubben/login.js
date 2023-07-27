loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  console.log("Form submitted");
  console.log("Email:", email);
  console.log("Password:", password);

});

// Initialize Firebase with your own config (copy this from your Firebase console)
const firebaseConfig = {
    apiKey: "AIzaSyAr877VPCvgyQ3Jdvlw4pcAR4-auvINSTs",
    authDomain: "champagneklubben-7a08f.firebaseapp.com",
    databaseURL: "https://champagneklubben-7a08f-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "champagneklubben-7a08f",
    storageBucket: "champagneklubben-7a08f.appspot.com",
    messagingSenderId: "6468099736",
    appId: "1:6468099736:web:13077310fed28854bf7aed",
    measurementId: "G-0YHBH7C18G"
};
  firebase.initializeApp(firebaseConfig);
  
  const loginForm = document.getElementById("loginForm");
  
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
  
    // Get user credentials from the form
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    // Authenticate the user using Firebase Email/Password method
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // User successfully logged in
        const user = userCredential.user;
        // You can redirect the user to the champagne-tasting form or another page
        window.location.href = "https://alexpcapp.github.io/champagneklubben/review/index.html";
      })
      .catch((error) => {
        // Handle login errors
        const errorMessage = error.message;
        console.error(errorMessage);
      });
  });
  