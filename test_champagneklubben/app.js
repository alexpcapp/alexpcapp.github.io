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
  
  // Get references to Firebase Authentication and Database
  const auth = firebase.auth();
  const database = firebase.database();
  
  // Check if the user is logged in
  auth.onAuthStateChanged(user => {
    if (user) {
      // User is logged in, show the review form and reviews
      document.getElementById('review-form').style.display = 'block';
      document.getElementById('reviews').style.display = 'block';
    } else {
      // User is not logged in, show the login/registration forms
      document.getElementById('login-form').style.display = 'block';
      document.getElementById('registration-form').style.display = 'block';
    }
  });
  
  // Handle the review form submission
  document.getElementById('review-form').addEventListener('submit', event => {
    event.preventDefault();
  
    // Get the review data from the form
    const points = document.getElementById('points').value;
    const area = document.getElementById('area').value;
    const type = document.getElementById('type').value;
    // Add more fields as needed
  
    // Get the current date
    const currentDate = new Date().toISOString();
  
    // Get the current user's ID
    const userId = auth.currentUser.uid;
  
    // Save the review to Firebase Realtime Database
    const reviewRef = database.ref('reviews').push();
    reviewRef.set({
      points: points,
      area: area,
      type: type,
      date: currentDate,
      submittedBy: userId
    });
  
    // Clear the form
    document.getElementById('review-form').reset();
  });
  
  // Load and display existing reviews from Firebase Realtime Database
  const reviewsRef = database.ref('reviews');
  reviewsRef.on('value', snapshot => {
    const reviews = snapshot.val();
    // Code to display the reviews on the page
  });
  