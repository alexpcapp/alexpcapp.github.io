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

  // visualization.js

// Initialize Firebase (make sure to replace "YOUR_FIREBASE_CONFIG" with your actual Firebase configuration)

// Reference to the "reviews" node in the Firebase Realtime Database
const reviewsRef = firebase.database().ref("reviews");

// Function to fetch and display the data
function displayReviews() {
  reviewsRef.once("value")
    .then((snapshot) => {
      // Get the data from the snapshot
      const reviewsData = snapshot.val();

      // Check if there are any reviews in the database
      if (!reviewsData) {
        // If there are no reviews, display a message
        document.getElementById("visualizationContainer").innerHTML = "<p>No reviews available.</p>";
        return;
      }

      // Loop through the reviews and display them on the page
      let reviewsHTML = "<ul>";
      Object.keys(reviewsData).forEach((reviewKey) => {
        const review = reviewsData[reviewKey];
        reviewsHTML += `<li>${review.champagneName} - Category: ${review.category}, Rating: ${review.rating}</li>`;
        // Include other review properties (e.g., country, dateSubmitted) as needed
      });
      reviewsHTML += "</ul>";

      // Display the reviews on the page
      document.getElementById("visualizationContainer").innerHTML = reviewsHTML;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

// Call the function to fetch and display the data
displayReviews();
