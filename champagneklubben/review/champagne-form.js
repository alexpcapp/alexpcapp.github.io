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

// Function to check if the user is authenticated
function checkAuthState() {
  firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      // User is not authenticated, redirect to the login page
      window.location.href = "login.html";
    }
  });
}

// Call checkAuthState() when the page loads
checkAuthState();