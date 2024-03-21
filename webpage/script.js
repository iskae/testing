// Add logic for dynamic images using fetch API and webpage/images directory
// Add logic for login using Firebase Authentication and Firestore

// Define an array of image file names
const images = [
  "cat.jpg",
  "dog.jpg",
  "bird.jpg",
  "fish.jpg",
  "lion.jpg",
  "tiger.jpg",
  "bear.jpg",
  "elephant.jpg",
  "giraffe.jpg",
  "zebra.jpg"
];

// Define a function to get a random image from the array and display it in the container
function showRandomImage() {
  // Get a random index from the array
  const index = Math.floor(Math.random() * images.length);
  // Get the image file name from the array
  const image = images[index];
  // Create an image element
  const img = document.createElement("img");
  // Set the source attribute to the image file path
  img.src = `images/${image}`;
  // Get the image container element
  const container = document.getElementById("image-container");
  // Append the image element to the container
  container.appendChild(img);
}

// Define a function to clear the container and call the previous function three times
function showThreeImages() {
  // Get the image container element
  const container = document.getElementById("image-container");
  // Remove all the child elements from the container
  container.innerHTML = "";
  // Call the showRandomImage function three times
  showRandomImage();
  showRandomImage();
  showRandomImage();
}

// Add an event listener to the button to call the last function
// Get the refresh button element
const button = document.getElementById("refresh-button");
// Add a click event listener to the button
button.addEventListener("click", showThreeImages);

// Initialize Firebase with configuration object and references to auth and db services
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyD-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  authDomain: "testing-webpage.firebaseapp.com",
  projectId: "testing-webpage",
  storageBucket: "testing-webpage.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:xxxxxxxxxxxxxxxxxxxxxx"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Get a reference to the auth service
const auth = firebase.auth();
// Get a reference to the firestore service
const db = firebase.firestore();

// Define a function to create a new user with email and password and store their data and role in db
function signUp(email, password) {
  // Use the auth service to create a new user with email and password
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Get the user object from the credential
      const user = userCredential.user;
      // Get the user id from the user object
      const uid = user.uid;
      // Set the default role for the new user
      const role = "user";
      // Use the db service to set the user data and role in the users collection
      db.collection("users").doc(uid).set({
        email: email,
        role: role
      })
        .then(() => {
          // Log a success message
          console.log("User data and role stored in db");
        })
        .catch((error) => {
          // Log an error message
          console.error("Error storing user data and role in db: ", error);
        });
    })
    .catch((error) => {
      // Log an error message
      console.error("Error creating user: ", error);
    });
}

// Define a function to sign in an existing user with email and password and get their data and role from db
function signIn(email, password) {
  // Use the auth service to sign in an existing user with email and password
  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Get the user object from the credential
      const user = userCredential.user;
      // Get the user id from the user object
      const uid = user.uid;
      // Use the db service to get the user data and role from the users collection
      db.collection("users").doc(uid).get()
        .then((doc) => {
          // Check if the document exists
          if (doc.exists) {
            // Get the user data and role from the document
            const data = doc.data();
            const role = data.role;
            // Log a success message
            console.log("User data and role retrieved from db");
          } else {
            // Log an error message
            console.error("No such document in db");
          }
        })
        .catch((error) => {
          // Log an error message
          console.error("Error getting user data and role from db: ", error);
        });
    })
    .catch((error) => {
      // Log an error message
      console.error("Error signing in user: ", error);
    });
}

// Define a function to sign out the current user and clear their data and role
function signOut() {
  // Use the auth service to sign out the current user
  auth.signOut()
    .then(() => {
      // Log a success message
      console.log("User signed out");
    })
    .catch((error) => {
      // Log an error message
      console.error("Error signing out user: ", error);
    });
}

// Define a function to update the UI based on the user's auth state and role
function updateUI(user) {
  // Get the navigation bar links elements
  const homeLink = document.getElementById("home-link");
  const aboutLink = document.getElementById("about-link");
  const contactLink = document.getElementById("contact-link");
  const signUpLink = document.getElementById("signup-link");
  const signInLink = document.getElementById("signin-link");
  const signOutLink = document.getElementById("signout-link");
  // Check if the user is signed in
  if (user) {
    // Get the user id from the user object
    const uid = user.uid;
    // Use the db service to get the user role from the users collection
    db.collection("users").doc(uid).get()
      .then((doc) => {
        // Check if the document exists
        if (doc.exists) {
          // Get the user role from the document
          const role = doc.data().role;
          // Log a success message
          console.log("User role retrieved from db");
          // Check the user role
          if (role === "admin") {
            // Show the home, about, contact, and sign out links
            homeLink.style.display = "inline";
            aboutLink.style.display = "inline";
            contactLink.style.display = "inline";
            signOutLink.style.display = "inline";
            // Hide the sign up and sign in links
            signUpLink.style.display = "none";
            signInLink.style.display = "none";
            // Show all the images in the container
            images.forEach((image) => {
              // Create an image element
              const img = document.createElement("img");
              // Set the source attribute to the image file path
              img.src = `images/${image}`;
              // Get the image container element
              const container = document.getElementById("image-container");
              // Append the image element to the container
              container.appendChild(img);
            });
          } else if (role === "user") {
            // Show the home, about, contact, and sign out links
            homeLink.style.display = "inline";
            aboutLink.style.display = "inline";
            contactLink.style.display = "inline";
            signOutLink.style.display = "inline";
            // Hide the sign up and sign in links
            signUpLink.style.display = "none";
            signInLink.style.display = "none";
            // Show only the images that start with "cat" in the container
            images.forEach((image) => {
              // Check if the image file name starts with "cat"
              if (image.startsWith("cat")) {
                // Create an image element
                const img = document.createElement("img");
                // Set the source attribute to the image file path
                img.src = `images/${image}`;
                // Get the image container element
                const container = document.getElementById("image-container");
                // Append the image element to the container
                container.appendChild(img);
              }
            });
          } else {
            // Show an error message
            alert("Invalid user role");
          }
        } else {
          // Log an error message
          console.error("No such document in db");
        }
      })
      .catch((error) => {
        // Log an error message
        console.error("Error getting user role from db: ", error);
      });
  } else {
    // Show the home, about, contact, sign up, and sign in links
    homeLink.style.display = "inline";
    aboutLink.style.display = "inline";
    contactLink.style.display = "inline";
    signUpLink.style.display = "inline";
    signInLink.style.display = "inline";
    // Hide the sign out link
    signOutLink.style.display = "none";
    // Show no images in the container
    // Get the image container element
    const container = document.getElementById("image-container");
    // Remove all the child elements from the container
    container.innerHTML = "";
  }
}

// Add event listeners to the navigation bar links to call the previous functions
// Get the navigation bar links elements
const homeLink = document.getElementById("home-link");
const aboutLink = document.getElementById("about-link");
const contactLink = document.getElementById("contact-link");
const signUpLink = document.getElementById("signup-link");
const signInLink = document.getElementById("signin-link");
const signOutLink = document.getElementById("signout-link");
// Add a click event listener to the home link
homeLink.addEventListener("click", (event) => {
  // Prevent the default behavior of the link
  event.preventDefault();
  // Show a message
  alert("Home page");
});
// Add a click event listener to the about link
aboutLink.addEventListener("click", (event) => {
  // Prevent the default behavior of the link
  event.preventDefault();
  // Show a message
  alert("About page");
});
// Add a click event listener to the contact link
contactLink.addEventListener("click", (event) => {
  // Prevent the default behavior of the link
  event.preventDefault();
  // Show a message
  alert("Contact page");
});
// Add a click event listener to the sign up link
signUpLink.addEventListener("click", (event) => {
  // Prevent the default behavior of the link
  event.preventDefault();
  // Prompt the user to enter an email and a password
  const email = prompt("Enter your email");
  const password = prompt("Enter your password");
  // Check if the email and password are valid
  if (email && password) {
    // Call the signUp function with the email and password
    signUp(email, password);
  } else {
    // Show an error message
    alert("Invalid email or password");
  }
});
// Add a click event listener to the sign in link
signInLink.addEventListener("click", (event) => {
  // Prevent the default behavior of the link
  event.preventDefault();
  // Prompt the user to enter an email and a password
  const email = prompt("Enter your email");
  const password = prompt("Enter your password");
  // Check if the email and password are valid
  if (email && password) {
    // Call the signIn function with the email and password
    signIn(email, password);
  } else {
    // Show an error message
    alert("Invalid email or password");
  }
});
// Add a click event listener to the sign out link
signOutLink.addEventListener("click", (event) => {
  // Prevent the default behavior of the link
  event.preventDefault();
  // Call the signOut function
  signOut();
});

// Call the updateUI function on page load
// Add an auth state change listener to the auth service
auth.onAuthStateChanged((user) => {
  // Call the updateUI function with the user object
  updateUI(user);
});
