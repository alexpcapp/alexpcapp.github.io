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
  
        // Initialize arrays to store data for the chart
        //const categories = [];
        //const ratings = [];
        const countryNames = []; // Only store the country names
        
        // Process the data and add country names to the array
            Object.keys(reviewsData).forEach((reviewKey) => {
                const review = reviewsData[reviewKey];
                const country = review.country || "Unknown Country";
                
            // Add the country name to the array
            countryNames.push(country);
        });

  
        // Process the data and add it to the arrays
        //Object.keys(reviewsData).forEach((reviewKey) => {
        //  const review = reviewsData[reviewKey];
        //  const champagneName = review.champagneName || "Unknown Champagne";
        //  const category = review.category || "Unknown Category";
        //  const country = review.country || "Unknown Country";
        //  const rating = review.rating || "N/A";
  
        //  categories.push(`${champagneName} - Category: ${category} - Country: ${country}`);
        //  ratings.push(rating);
        //});
  
        // Create a bar chart using Chart.js
        const ctx = document.getElementById("champagneChart").getContext("2d");
  
        new Chart(ctx, {
          type: "bar",
          data: {
            labels: countryNames,
            datasets: [{
              label: "Number of bottles",
              //data: ratings,
              data: calculateCountryCounts(reviewsData), // Calculate the count of bottles for each country
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            }],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                //max: 10,
                stepSize: 1, // Ensure y-axis labels are integers
              },
            },
          },
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

// Function to calculate the count of bottles for each country
function calculateCountryCounts(reviewsData) {
    const countryCounts = {};
  
    // Process the data and count bottles for each country
    Object.keys(reviewsData).forEach((reviewKey) => {
      const review = reviewsData[reviewKey];
      const country = review.country || "Unknown Country";
  
      // Increment the count for the corresponding country
      countryCounts[country] = (countryCounts[country] || 0) + 1;
    });
  
    // Convert the counts object to an array
    return Object.values(countryCounts);
  }
  
  // Call the function to fetch and display the data with Chart.js
  displayReviewsWithChart();