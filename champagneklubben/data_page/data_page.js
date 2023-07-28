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

  firebase.initializeApp(firebaseConfig);

// Get a reference to the Firebase Realtime Database
const database = firebase.database();

// Function to display the data on the page
function displayData(data) {
  const dataContainer = document.getElementById("dataContainer");

  // Clear any existing content in the container
  dataContainer.innerHTML = "";

  // Loop through the data and create HTML elements to display it
  data.forEach((item) => {
    const itemElement = document.createElement("div");
    itemElement.innerHTML = `
      <p><strong>Name:</strong> ${item.name}</p>
      <p><strong>Rating:</strong> ${item.rating}</p>
      <p><strong>Comments:</strong> ${item.comments}</p>
      <hr>
    `;

    dataContainer.appendChild(itemElement);
  });
}

// Function to fetch data from the database
function fetchData() {
  const reviewsRef = database.ref("champagne_reviews");

  // Fetch the data from the database
  reviewsRef.once("value")
    .then((snapshot) => {
      // Convert the snapshot to an array of review objects
      const data = [];
      snapshot.forEach((childSnapshot) => {
        const review = childSnapshot.val();
        data.push(review);
      });

      // Display the data on the page
      displayData(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

// Call the fetchData function when the page is loaded
document.addEventListener("DOMContentLoaded", fetchData);