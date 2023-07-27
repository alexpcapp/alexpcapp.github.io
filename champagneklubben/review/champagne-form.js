// champagne_form.js

// Your Firebase configuration (You can re-use the same configuration as in login.js)
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

// Get references to the HTML elements
const champagneForm = document.getElementById("champagneForm");
const successMessage = document.getElementById("successMessage");
const errorMessage = document.getElementById("errorMessage");

// Function to show the success message
function showSuccessMessage(message) {
  successMessage.innerText = message;
  successMessage.style.display = "block";
}

// Function to show the error message
function showErrorMessage(message) {
  errorMessage.innerText = message;
  errorMessage.style.display = "block";
}

// Function to hide the error message
function hideErrorMessage() {
  errorMessage.style.display = "none";
}

// Event listener for the form submission
champagneForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get the current authenticated user
  const user = firebase.auth().currentUser;
  if (!user) {
    // If the user is not authenticated, show an error message
    showErrorMessage("User not authenticated. Please log in.");
    return;
  }

  // Get the user's UID
  const userId = user.uid;

  // Get the form input values
  const champagneName = document.getElementById("champagneName").value;
  const rating = document.getElementById("rating").value;
  const comments = document.getElementById("comments").value;

  // Create a new object to represent the champagne review
  const champagneReview = {
    name: champagneName,
    rating: parseInt(rating),
    comments: comments,
    userId: userId, // Include the user's UID in the review data
  };

  try {
    // Save the review to Firebase Realtime Database
    const database = firebase.database();
    const reviewsRef = database.ref("champagne_reviews");
    await reviewsRef.push(champagneReview);

    // Clear the form fields after successful submission
    champagneForm.reset();
    // Show the success message for a few seconds and then hide it
    showSuccessMessage("Review submitted successfully!");
    setTimeout(() => {
      successMessage.style.display = "none";
    }, 20000); // Hide after 3 seconds (adjust as needed)
  } catch (error) {
    // Show an error message if there's an issue with submitting the review
    showErrorMessage("Error submitting review. Please try again later.");
    console.error("Error saving review:", error);
  }
});

// Hide the error message when the form input fields change
champagneForm.addEventListener("input", hideErrorMessage);

// Add a listener for the Firebase Authentication state change
firebase.auth().onAuthStateChanged((user) => {
    // Check if the user is authenticated and update UI accordingly
    if (user) {
      console.log("User is authenticated:", user.uid);
      // Enable or display any authenticated user-related features here
    } else {
      console.log("User is not authenticated.");
      // Disable or hide any authenticated user-related features here
    }
  });