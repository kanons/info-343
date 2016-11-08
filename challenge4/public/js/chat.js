var messagesList = document.getElementById("messages");
var logoutButton = document.getElementById("logout");

// Used in verification check and form submit section
var messageForm = document.getElementById("message-form");
var messageInput = document.getElementById("message-input");
var messageError = document.getElementById("message-error");
var sendButton = document.getElementById("send-message");
var verificationAlert = document.getElementById("verification-alert");

//If logout button is clicked, sign user out
logoutButton.addEventListener("click", function (e) {
    firebase.auth().signOut();
});

firebase.auth().onAuthStateChanged(function(user) {
    // If the user is logged in, user will be an object (truthy). Otherwise, it will be null (falsey).
    if (user) {
        // Connect to firebase
        var database = firebase.database();
        var messages = database.ref('channels/general');

        // Get user id to display controls
        var currentId = user.uid;
        var messageLi;
        var spanDate;
        var messageText;
        var editChild;
        var messageBox;
        var editInput;

        // This event listener will be called for each item that has been added to the list.
        // Use this to generate each chat message, both on initial page load and whenever someone creates a new message.
        messages.limitToLast(100).on('child_added', function(data) {
            var id = data.key;
            var message = data.val(); 

            var text = message.text;
            var timestamp = message.timestamp;
            var date = moment(new Date(timestamp)).format('LLL');
            var name = message.displayName;
            var photo = message.photoURL;
            var messageId = message.userId;

            // Create and Generate list item to display message
            messageLi = document.createElement("li");
            messageLi.className = "list-group-item";
            messageLi.id = id;

            // Create paragraph element for text
            messageText = document.createElement("p");
            messageText.className = "message-text";
            messageText.id = id;
            messageText.textContent = text;

            // Wrap text in div
            var messageTextDiv = document.createElement("div");
            messageTextDiv.className = "message-text-div";
            messageTextDiv.appendChild(messageText);

            // Create div to format text content
            var messageContent = document.createElement("div");
            messageContent.className = "message-content";
            
            // Create div to format image and text
            messageBox = document.createElement("div");
            messageBox.className = "message-box";

            // Create header for display name, date
            // Add display name to header
            var displayH = document.createElement("h2");
            displayH.appendChild(document.createTextNode(name+" "));

            // Create image element for profile picture
            var photoImg = document.createElement("img");
            photoImg.src = photo;

            // Create span element for date to span in header
            spanDate = document.createElement("span");
            spanDate.id = id;
            spanDate.className = "span-date";
            spanDate.appendChild(document.createTextNode("   "+date));

            // Wrap message header elements in span
            var spanHeader = document.createElement("span");
            spanHeader.id = "span-header";

            // Create button to edit message
            var editButton = document.createElement("button");
            editButton.id = "edit-button";
            editButton.type = "button";
            editButton.class = "btn btn-default";
            editButton.innerText = "Edit";

            // Create button to delete message
            var deleteButton = document.createElement("button");
            deleteButton.id = "delete-button";
            deleteButton.type = "button";
            deleteButton.class = "btn btn-default";
            deleteButton.innerText = "Delete";

            spanHeader.appendChild(spanDate);

            // If message belongs to signed in user, add controls
            if(currentId === messageId) {
                spanHeader.appendChild(editButton);
                spanHeader.appendChild(deleteButton);
            }

            // Append date and buttons (if needed) to the message box header
            displayH.appendChild(spanHeader);
            // Append message content to div
            messageContent.appendChild(displayH);
            messageContent.appendChild(messageTextDiv);
            // Append image and message content to message box div
            messageBox.appendChild(photoImg);
            messageBox.appendChild(messageContent);
            // Append message box to list item
            messageLi.appendChild(messageBox);
            //Append message to list
            messagesList.appendChild(messageLi);

            // Event listener called when edit button is clicked
            if(editButton) {
                editButton.addEventListener("click", function (e) {
                    e.preventDefault();

                    // Edit button can only be pressed once when text area is displayed
                    editButton.disabled = true;

                    var editId = id;

                    // If the id of the message matches the one user wants to edit
                    if(id === editId) {
                        // Hide the text content for now
                        messageTextDiv.style.display = "none";

                        // Create the input text area for editing
                        var editInput = document.createElement("textarea");
                        var text = messageText.textContent;
                        editInput.textContent = text;
                        editInput.rows = "2";
                        editInput.cols = "16";
                        editInput.className="form-control";
                        
                        // Create the Edit button
                        var editConfirm = document.createElement("button");
                        editConfirm.id = "edit-confirm";
                        editConfirm.type = "button";
                        editConfirm.className = "btn btn-primary";
                        editConfirm.innerText = "Edit";

                        // Create the Cancel button
                        var editCancel = document.createElement("button");
                        editCancel.id = "edit-cancel";
                        editCancel.type = "button";
                        editCancel.className = "btn btn-default";
                        editCancel.innerText = "Cancel";

                        // Put buttons into span, so they can be side by side
                        var editSpan = document.createElement("span");
                        editSpan.id = "edit-span";
                        
                        // Add edit confirm/cancel buttons to span
                        editSpan.appendChild(editConfirm);
                        editSpan.appendChild(editCancel);
                        
                        // Add input box and buttons to message content
                        messageContent.appendChild(editInput);
                        messageContent.appendChild(editSpan);
                        
                        // If the user clicks edit
                        if(editConfirm) {
                            editConfirm.addEventListener("click", function (e) {
                                // Hide the text input area and buttons
                                editInput.style.display = "none";
                                editSpan.style.display = "none";
                                
                                // Set the new text and edit time value to matching object
                                firebase.database().ref('channels/general' + '/'+ editId).set({
                                    text: editInput.value,
                                    displayName: message.displayName,
                                    photoURL: message.photoURL,
                                    timestamp: message.timestamp,
                                    userId: message.userId,
                                    messageEdit: new Date().getTime()
                                });

                                // Display new text and enable edit button again
                                messageTextDiv.style.display = "block";
                                editButton.disabled = false;
                            });
                        }

                        // If the user clicks cancel, revert back to message
                        if(editCancel) {
                            editCancel.addEventListener("click", function (e) {
                                editInput.style.display = "none";
                                editSpan.style.display = "none";
                                messageTextDiv.style.display = "block";
                                editButton.disabled = false;
                            });
                        }
                    }
                });
            }

            // Event listener called when delete button is clicked
            if(deleteButton) {
                deleteButton.addEventListener("click", function (e) {
                    e.preventDefault();
                    var deleteId = id;

                    //If the message id matches the one user wants to delete, ask for confirmation
                    if(id === deleteId) {    
                        var r = confirm("Are you sure you want to delete your message?");
                        if (r == true) {
                            messages.child(deleteId).remove();
                        } else {}
                    }
                });
            }
        });

        // This event listener will be called whenever an item in the list is edited.
        // Use this to update the HTML of the message that was edited.
        messages.on('child_changed', function(data) {
            var id = data.key;
            var message = data.val();
            var textItems = messagesList.querySelectorAll("p.message-text");
            var dateItems = messagesList.querySelectorAll("span.span-date");
            
            // Update HTML message text
            for (var i = 0; i < textItems.length; i++ ) {
                if(id === textItems[i].id) {
                    textItems[i].textContent = message.text;
                }
            }

            // Update Edited time
            for (var i = 0; i < dateItems.length; i++ ) {
                if(id === dateItems[i].id) {
                    var editTime = message.messageEdit;
                    var editDate = moment(new Date(editTime)).format('LLL');
                    dateItems[i].appendChild(document.createTextNode(" (Edited:"+editDate+")"));
                }
            }
        });

        // This event listener will be called whenever an item in the list is deleted.
        // Use this to remove the HTML of the message that was deleted.
        messages.on('child_removed', function(data) {
            var id = data.key;
            var items = messagesList.getElementsByTagName("li");
            // Find matching message and remove list item
            for (var i = 0; i < items.length; i++ ) {
                if(id === items[i].id) {
                    messageLi.parentNode.removeChild(messageLi);
                }
            }
        });

    } else {
        // If the user is not logged in, redirect to index.html
        window.location.href = "index.html";
    }
});

firebase.auth().onAuthStateChanged(function(user) { 
    // If user is not verified, show alert and disable send button
    if (!user.emailVerified) {
        sendButton.disabled = true;
        verificationAlert.textContent = "Please verify your email to send messages. Refresh the page after verifying.";
        verificationAlert.classList.add('active');
    } else {
       sendButton.disabled = false;
       verificationAlert.classList.remove('active');
    }
    // When the user submits the form to send a message,
    // add the message to the list of messages.
    messageForm.addEventListener("submit", function (e) {
        e.preventDefault();
        messageError.classList.remove('active');

        // If the user is signed in, get their display name and photo to store with message
        var user = firebase.auth().currentUser;
        if (user) {
            var name = user.displayName;
            var photo = user.photoURL;
            var userId = user.uid;
        } else {
            // No user is signed in.
        }

        // Connect to the firebase data
        var database = firebase.database();

        // Get the ref for your messages list
        var messages = database.ref('channels/general');

        // Get the message the user entered
        var message = messageInput.value;

        // Create a new message and add it to the list.
        messages.push({
            userId: userId,
            displayName: name,
            photoURL: photo,
            text: message,
            timestamp: new Date().getTime()
        })
        .then(function () {
            // Once message is created, clear and focus cursor on text area
            messageInput.value = " ";
            messageInput.focus();
        })
        .catch(function(error) {
            // If there is error in message submit, show it to user
            messageError.textContent = error.message;
            messageError.classList.add('active');
        }); 
    });
});
