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

// Champagne-category 1
const categorySelect = document.getElementById("category");
const newCategoryInput = document.getElementById("newCategory");

// Event listener for changes in the drop-down menu
categorySelect.addEventListener("change", () => {
  if (categorySelect.value === "other") {
    // If "Add New Category" is selected, show the input field
    newCategoryInput.style.display = "block";
  } else {
    // If another option is selected, hide the input field
    newCategoryInput.style.display = "none";
  }
});

// Champagne-type (color)
const typeSelect = document.getElementById("type");
const newTypeInput = document.getElementById("newtype");


// --- Wine country-dropdown --- //
  // Get references to the drop-down list and custom country input
  const countrySelect = document.getElementById("country");
  const customCountryInput = document.getElementById("newCountry");

// Event listener for changes in the drop-down list
countrySelect.addEventListener("change", () => {
  if (countrySelect.value === "other") {
    // If "addNewCountry" is selected, show the custom country input field
    customCountryInput.style.display = "block";
  } else {
    // If a specific country is selected, hide the custom country input field
    customCountryInput.style.display = "none";
    // Reset the custom country input field value to an empty string
    //customCountryInput.value = "";
  }
});


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


// ----- Form Submission ----- //
// Event listener for the form submission
champagneForm.addEventListener("submit", async (e) => {
  e.preventDefault();

    

    // --- Rating --- //
      // Get the selected rating from the dropdown menu
      //const ratingDropdown = parseInt(document.getElementById("rating").value);

    // --- Wine category --- // 2
      // Get the selected wine-category from the drop-down menu
      //const selectedCategory = categorySelect.value;
      // Get the user's input from the new category input field
      //const newCategory = newCategoryInput.value.trim();

      //let category = "";

        // Handle the category selection
      //if (selectedCategory === "other" && newCategory !== "") {
        // Use the new category if "Add New Category" is selected and the user provided input
      //category = newCategory;
      //} else if (selectedCategory !== "other") {
        // Use the selected category from the drop-down list
      //  category = selectedCategory;
      //}

    // --- Wine country --- // 1

      // Get the selected country from the drop-down list
      //const selectedCountry = countrySelect.value;

      // Get the user's input from the custom country input field
      //const customCountry = customCountryInput.value.trim();

      // Check if the selected country is "addNewCountry"
      //if (selectedCountry === "other" && customCountry !== "") {
        // Use the custom country if "addNewCountry" is selected and the user provided input
        // (you can perform validation if needed)

        // Set the country variable to the custom country input
        //var country = customCountry;
      //} else {
        // Use the selected country from the drop-down list
        //var country = selectedCountry;
      //}

  


  // Get the current authenticated user
  const user = firebase.auth().currentUser;
  if (!user) {
    // If the user is not authenticated, show an error message
    showErrorMessage("User not authenticated. Please log in.");
    return;
  }

  // Get the user's UID
  const userId = user.uid;

  const userName = auth.currentUser.displayName || "Unknown User";

  // Get the form input values
    // --- Date ---//
    // Get the current date and time
  const currentDate = new Date();
  const dateSubmitted = currentDate.toISOString(); // Convert to a string format that Firebase can handle
  const champagneName = document.getElementById("champagneName").value;
  const champagneCategory = document.getElementById("category").value;
  const champagneCountry = document.getElementById("country").value;
  const champagneArea = document.getElementById("area").value;
  const champagneTaste = document.getElementById("taste").value;
  const champagneType = document.getElementById("type").value;
  const rating = document.getElementById("rating").value;
  const comments = document.getElementById("comments").value;

  // Create a new object to represent the champagne review
  const champagneReview = {
    date_review: dateSubmitted,
    name: champagneName,
    category: champagneCategory,
    country: champagneCountry,
    area: champagneArea,
    taste: champagneTaste,
    type: champagneType,
    rating: parseInt(rating),
    comments: comments,
    userName: userName,
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