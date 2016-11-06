/*
 * This file should contain code for the following tasks:
 * 1. Create a new account.
 * 2. Sign in an existing account.
 * 3. Redirect a user to chat.html once they are logged in/signed up.
 */

//Store login DOM elements
var loginForm = document.getElementById("login-form");
var loginEmail = document.getElementById("login-email");
var loginPassword = document.getElementById("login-password");
var loginButton = document.getElementById("login-button");
var loginError = document.getElementById("login-error");

// When the user logs in, send the email and password to firebase.
loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    loginError.classList.remove('active');

    var email = loginEmail.value;
    var password = loginPassword.value;

    // If the login was successful, the .then callback will be called.
    // Otherwise, the .catch callback will be called,
    // with an error object containing the error message.
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function() {
      console.log("Logged in successfully!");
    })
    .catch(function(error) {
      console.log(error.message);
      loginError.textContent = error.message;
      loginError.classList.add('active');
    });
});

//Store signup DOM elements
var signupForm = document.getElementById("signup-form");
var signupName = document.getElementById("signup-name");
var signupEmail = document.getElementById("signup-email");
var signupPassword = document.getElementById("signup-password");
var signupPasswordConfirm = document.getElementById("signup-password-confirm");
var signupError = document.getElementById("signup-error");



// When user signs up, create new user 
signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    signupError.classList.remove('active');

    var displayName = signupName.value;
    var email = signupEmail.value;
    var password = signupPassword.value;
    var passwordConfirm = signupPasswordConfirm.value;
    var photoURL = "https://www.gravatar.com/avatar/" + md5(email);

     console.log(displayName);
    console.log(email);
    console.log(password);
    console.log(passwordConfirm);

    // If the password does not match, show error,
    // otherwise create user, send verification, update name and photo, go to chat.html
    if (password !== passwordConfirm) {
        signupError.textContent = 'Passwords do not match.';
        signupError.classList.add('active');
    } else {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function (user) {

            console.log(user);

            // Send verification email
            var user = firebase.auth().currentUser;

            console.log("In then");

            user.sendEmailVerification().then(function() {
                // Email sent.
                console.log("Email sent");
            }, function(error) {
                // An error happened.
            });
            
            // Update their display name and profile picture
            //var user = firebase.auth().currentUser;

            user.updateProfile({
                displayName: displayName,
                photoURL: photoURL
            }).then(function() {
                // Update successful.
                console.log("update successful");
            }, function(error) {
                // An error happened.
            });

            // Redirect to chat page (dont do this until the other two actions have completed succesfully)
            window.location.href = "chat.html";
        })
        .catch(function (error) {
            signupError.textContent = error.message;
            signupError.classList.add('active');
        });
    }
});

// This callback is called whenever the user's logged in state changes,
// e.g. when the page first loads, when a user logs in, when a user logs out.
firebase.auth().onAuthStateChanged(function(user) {
  // If the user parameter is truthy,
  // the user is logged in.
  if (user) {
      console.log("signed in");

      window.location.href = "chat.html";
  } else {
    // Otherwise, they have not signed in.
    console.log("signed out");
  }
});
