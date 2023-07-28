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

// Reference to the "reviews" node in the Firebase Realtime Database
const reviewsRef = firebase.database().ref("champagne_reviews");

Object.keys(reviewsData).forEach((reviewKey) => {
    const review = reviewsData[reviewKey];
    const champagneName = review.champagneName || "Unknown Champagne";
    const category = review.category || "Unknown Category";
    const rating = review.rating || "N/A";
  
    // Process the data and create the chart as needed...
  });

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


// Function to fetch and display the data using Chart.js
function displayReviewsWithChart() {
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
  
        // Calculate the percentage of bottles from each country
        const countryCounts = {};
        Object.keys(reviewsData).forEach((reviewKey) => {
          const review = reviewsData[reviewKey];
          const country = review.country;
          if (country) {
            countryCounts[country] = (countryCounts[country] || 0) + 1;
          }
        });
  
        const totalReviews = Object.values(countryCounts).reduce((acc, count) => acc + count, 0);
        const countryPercentages = {};
        Object.keys(countryCounts).forEach((country) => {
          countryPercentages[country] = (countryCounts[country] / totalReviews) * 100;
        });
  
        // Create a bar chart using Chart.js
        const ctx = document.getElementById("champagneChart").getContext("2d");
  
        new Chart(ctx, {
          type: "bar",
          data: {
            labels: Object.keys(countryPercentages),
            datasets: [{
              label: "Percentage of Bottles",
              data: Object.values(countryPercentages),
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            }],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                max: 100, // Set the maximum value of the y-axis to 100 (percentage)
                callback: (value) => `${value}%`, // Add percentage symbol to y-axis labels
              },
            },
          },
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
  
  // Call the function to fetch and display the data with Chart.js
  displayReviewsWithChart();
