var firebaseConfig = {
    apiKey: '<%=FCM_WEBAPIKEY%>',
    authDomain: "example-firebasecloudmsg-2020.firebaseapp.com",
    databaseURL: "https://example-firebasecloudmsg-2020.firebaseio.com",
    projectId: "example-firebasecloudmsg-2020",
    storageBucket: "example-firebasecloudmsg-2020.appspot.com",
    messagingSenderId: "545038372345",
    appId: "1:545038372345:web:99a52df52369b9f056c128"
};

// Initialize Firebase.
firebase.initializeApp(firebaseConfig); 

// Retrieve Firebase Messaging object.
const messaging = firebase.messaging();

// Callback fired if Instance ID token is updated.
messaging.onTokenRefresh(() => {
    messaging.getToken().then((refreshedToken) => {
        console.log('Token refreshed.');
        
        // Indicate that the new Instance ID token has not yet been sent to the app server.
        setTokenSentToServer(false);

        // Send Instance ID token to app server.
        sendTokenToServer(refreshedToken);

        // Display new Instance ID token and clear UI of all previous messages.
        resetUI();

    }).catch((err) => {
        showMessage('#token', 'Unable to retrieve refreshed token ', err);
    });
});

// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker
//   `messaging.setBackgroundMessageHandler` handler.
messaging.onMessage((payload) => {
    console.log('Message foreground received! ', payload);

    // Update the UI to include the received message.
    appendMessage(payload);
});

/**
 * Reset User Interface (UI).
 */
function resetUI() {
    clearMessages();
    showMessage('#token', 'loading...');
    showMessage('#subscription', "No subscribed.");
    
    // Get Instance ID token. Initially this makes a network call, once retrieved
    // subsequent calls to getToken will return from cache.
    messaging.getToken().then((currentToken) => {
        if (currentToken) {
            console.log('Exists current token.');
            
            sendTokenToServer(currentToken);
            showPushEnabled(currentToken);
        } else {
            console.log('No Instance ID token available. Request permission to generate one.');

            //Show permission request and sentToServer=0
            showPushPermissionRequired();
            setTokenSentToServer(false);
        }
    }).catch((err) => {
        showMessage('#token', 'Error retrieving Instance ID token. ', err);
        setTokenSentToServer(false);
    });
}

/**
 * Send the Instance ID token your application server, so that it can:
 * - send messages back to this app
 * - subscribe/unsubscribe the token from topics
 * @param {string} currentToken 
 */
function sendTokenToServer(currentToken) {
    
    if (!isTokenSentToServer()) {
        console.log('Sending token to server...');
        setTokenSentToServer(true); // sentToServer=1
    } else {
        console.log('Token already sent to server so won\'t send it again unless it changes.');
    }
}

/**
 * 
 */
function requestPermission() {
    console.log('Requesting permission...');

    Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
            console.log('Notification permission granted.');
            
            // In many cases once an app has been granted notification permission,
            // it should update its UI reflecting this.
            resetUI();

        } else {
            console.log('Unable to get permission to notify.');
        }
    });
}

/**
 * Delete Instance ID token.
 */
function deleteToken() {
    messaging.getToken().then((currentToken) => {
        messaging.deleteToken(currentToken).then(() => {
            console.log('Token deleted.');
            setTokenSentToServer(false);
            
            // Once token is deleted update UI.
            resetUI();

        }).catch((err) => {
            console.log('Unable to delete token. ', err);
        });
    }).catch((err) => {
        showMessage('#token', 'Error retrieving Instance ID token. ', err);
    });
}

/**
 * Save flag to local storage .
 */
function isTokenSentToServer() {
    return window.localStorage.getItem('sentToServer') === '1';
}

/**
 * Set flag to local storage.
 * @param {boolean} sent 
 */
function setTokenSentToServer(sent) {
    window.localStorage.setItem('sentToServer', sent ? '1' : '0');
}

/**
 * Subscribe to topic
 * @param {string} topicName
 */
function subscribeToTopic(topicName) {
    var token = document.querySelector('#token');

    $.ajax("https://iid.googleapis.com/iid/v1/"+token.textContent+"/rel/topics/"+topicName, {
        type: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "key=<%=FCM_SERVERKEY%>"
        }
    }).done(function (data) {
        showMessage('#subscription', 'Subscription to topic \''+ topicName + '\' done!');

    }).fail(function (xhr, status, error) {
        showMessage('#subscription', 'Subscription to topic \''+ topicName + '\' error... ', error);
    });
}

/**
 * Show message in console and UI.
 * @param {string} element
 * @param {string} value 
 * @param {*} err
 */
function showMessage(element, value, err) {

    if(element!=undefined) {
        var s = value;
        if(err!=undefined) {
            s += ' Error: ' + err;
        }
        console.log(s);

        const tokenElement = document.querySelector(element);
        tokenElement.textContent = s;
    }
    else {
        console.log("¿¿element??");
    }
}

/**
 * Show token.
 * @param {*} currentToken 
 */
function showPushEnabled(currentToken) {
    showDiv('token_div');
    hideDiv('permission_div');
    showMessage('#token', currentToken);
}

/**
 * Show permission required.
 */
function showPushPermissionRequired() {
    hideDiv('token_div');
    showDiv('permission_div');
}

/**
 * Add a message to the messages element. * 
 * @param {*} payload 
 */
function appendMessage(payload) {

    const messagesElement = document.querySelector('#messages');
    const dataHeaderELement = document.createElement('h5');
    const dataElement = document.createElement('pre');
    dataElement.style = 'overflow-x:hidden;';
    dataHeaderELement.textContent = 'Received message:';
    dataElement.textContent = JSON.stringify(payload, null, 2);
    messagesElement.appendChild(dataHeaderELement);
    messagesElement.appendChild(dataElement);
}

/**
 * Clear the messages element of all children.
 */
function clearMessages() {
    const messagesElement = document.querySelector('#messages');
    if(messagesElement!=null) {
        while (messagesElement.hasChildNodes()) {
            messagesElement.removeChild(messagesElement.lastChild);
        }
    }
}

/**
 * Show div. 
 * @param {string} divId 
  */
function showDiv(divId) {
    const div = document.querySelector('#' + divId);
    div.style = 'display: visible';
}

/**
 * Hide div.
 * @param {string} divId 
  */
function hideDiv(divId) {
    const div = document.querySelector('#' + divId);
    div.style = 'display: none';
}

function copyToken() {
    var token = document.querySelector('#token');
    
    //Create a temporal non visible textarea to copy token.
    const textArea = document.createElement('textarea');
    textArea.textContent = token.textContent;
    textArea.style = "position: absolute;left: -100%;";
    document.body.append(textArea);
    textArea.select();
    textArea.setSelectionRange(0, 99999)
    document.execCommand("copy");
}

// Reset UI on page load.
resetUI();