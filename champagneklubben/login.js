// login.js


// Your Firebase configuration
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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Add event listener for form submission
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Use Firebase Authentication to sign in with email and password
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Redirect to the champagne-tasting form page on successful login
      window.location.href = "https://alexpcapp.github.io/champagneklubben/review/champagne-form.html";
    })
    .catch((error) => {
      // Handle login errors and show error message
      setErrorText("Invalid login credentials. Please try again.");
      console.error("Login error:", error.message);
    });
});
