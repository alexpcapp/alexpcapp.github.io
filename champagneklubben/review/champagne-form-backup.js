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

const champagneForm = document.getElementById("champagneForm");
const champagneList = document.getElementById("champagneList");

// Add event listener for form submission
champagneForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const champagneName = document.getElementById("champagneName").value;
  const rating = document.getElementById("rating").value;
  const comments = document.getElementById("comments").value;

  // Create a new object to represent the champagne review
  const champagneReview = {
    name: champagneName,
    rating: parseInt(rating),
    comments: comments,
  };

  // Save the review to Firebase Realtime Database
  const database = firebase.database();
  const reviewsRef = database.ref("champagne_reviews");
  reviewsRef.push(champagneReview);

  // Clear the form fields after submission
  champagneForm.reset();
});

// Retrieve and display existing champagne reviews
function displayChampagneReviews() {
  const database = firebase.database();
  const reviewsRef = database.ref("champagne_reviews");

  reviewsRef.on("value", (snapshot) => {
    champagneList.innerHTML = ""; // Clear previous list

    snapshot.forEach((childSnapshot) => {
      const review = childSnapshot.val();
      const listItem = document.createElement("div");
      listItem.innerHTML = `<strong>${review.name}</strong> - Rating: ${review.rating}/10<br>${review.comments}<hr>`;
      champagneList.appendChild(listItem);
    });
  });
}

// Call the function to display existing reviews
displayChampagneReviews();