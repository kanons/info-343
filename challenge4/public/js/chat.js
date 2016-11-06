var messagesList = document.getElementById("messages");
var logoutButton = document.getElementById("logout");

logoutButton.addEventListener("click", function (e) {
    firebase.auth().signOut();
});

firebase.auth().onAuthStateChanged(function(user) {
    // If the user is logged in, user will be an object (truthy).
    // Otherwise, it will be null (falsey).
    if (user) {
        // Connect to firebase
        var database = firebase.database();
        var messages = database.ref('channels/general');

        // Get user display name to display
        var user = firebase.auth().currentUser;
        var name = user.displayName;

        // This event listener will be called for each item that has been added to the list.
        // Use this to generate each chat message, both on initial page load and whenever someone creates a new message.
        messages.on('child_added', function(data) {
            var id = data.key;
            var message = data.val();

            var text = message.text;
            var timestamp = message.timestamp;
            var date = moment(new Date(timestamp)).format('LLL');

            // Create and Generate list item to display message
            var messageLi = document.createElement("li");
            messageLi.className = "list-group-item";
            messageLi.id = id;

            // Create paragraph element for text
            var messageText = document.createElement("p");
            messageText.innerText = text;

            // Create div to format text content
            var messageContent = document.createElement("div");
            messageContent.className = "message-content";
            
            // Create div to format image and text
            var messageBox = document.createElement("div");
            messageBox.className = "message-box";

            //Create header for display name, date
            //Add display name to header
            var displayH = document.createElement("h2");
            displayH.appendChild(document.createTextNode(name+" "));

            // Display profile picture
            var photoImg = document.createElement("img");
            //photoImg.src = "https://www.gravatar.com/avatar/" + md5(user.email);
            photoImg.src = user.photoURL;

            // Create span element for date to span in header
            var spanDate = document.createElement("span");
            spanDate.textContent = " "+date;
            displayH.appendChild(spanDate);

            // Create button to edit message
            // var editButton = document.createElement("button");
            // editButton.id = "edit-button";
            // editButton.type = "button";
            // editButton.class = "btn btn-link";
            // editButton.innerText = "Edit";

            // // Create button to delete message
            // var deleteButton = document.createElement("button");
            // deleteButton.id = "delete-button";
            // deleteButton.type = "button";
            // deleteButton.class = "btn btn-link";
            // deleteButton.innerText = "Delete";

            //Append message content to div
            messageContent.appendChild(displayH);
            messageContent.appendChild(messageText);
            // Append image and message content to message box div
            messageBox.appendChild(photoImg);
            messageBox.appendChild(messageContent);
            // Append message box to list item
            messageLi.appendChild(messageBox);
            //Append message to list
            messagesList.appendChild(messageLi);
            
            
        });

        // This event listener will be called whenever an item in the list is edited.
        // Use this to update the HTML of the message that was edited.
        messages.on('child_changed', function(data) {
            var id = data.key;
            var message = data.val();
        });

        // This event listener will be called whenever an item in the list is deleted.
        // Use this to remove the HTML of the message that was deleted.
        messages.on('child_removed', function(data) {
            var id = data.key;
            var message = document.getElementById(id);
            messagesList.parentNode.removeChild(message);
        });

    } else {
        // If the user is not logged in, redirect to index.html
        window.location.href = "index.html";
    }
});

var messageForm = document.getElementById("message-form");
var messageInput = document.getElementById("message-input");
var messageError = document.getElementById("message-error");
var messageContent = document.getElementById("message-content");

// When the user submits the form to send a message,
// add the message to the list of messages.
messageForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Connect to the firebase data
    var database = firebase.database();

    // Get the ref for your messages list
    var messages = database.ref('channels/general');

    // Get the message the user entered
    var message = messageInput.value;

 
    //var name = user.displayName;

    // Create a new message and add it to the list.
    messages.push({
        username: name,
        text: message,
        timestamp: new Date().getTime() // unix timestamp in milliseconds
    })
    .then(function () {
        // message created succesfully
        
    })
    .catch(function(error) {
        messageError.textContent = error.message;
    });

    // Once message is sent, clear and focus cursor on text area
    messageInput.value = " ";
    messageInput.focus(); 
});

// var setMessage = function(data) {
//     var val = data.val();
//     this.displayMessage(data.key, val.name, val.text, val.photoUrl, val.imageUrl);
//   }.bind(this);
//   this.messagesRef.limitToLast(100).on('child_added', setMessage);
//   this.messagesRef.limitToLast(100).on('child_changed', setMessage);
// };
