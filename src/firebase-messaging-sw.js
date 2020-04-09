 importScripts('https://www.gstatic.com/firebasejs/7.12.0/firebase-app.js');
 importScripts('https://www.gstatic.com/firebasejs/7.12.0/firebase-messaging.js');

 var firebaseConfig = {
  apiKey: "<%=FCM_WEBAPIKEY%>",
  authDomain: "example-firebasecloudmsg-2020.firebaseapp.com",
  databaseURL: "https://example-firebasecloudmsg-2020.firebaseio.com",
  projectId: "example-firebasecloudmsg-2020",
  storageBucket: "example-firebasecloudmsg-2020.appspot.com",
  messagingSenderId: "545038372345",
  appId: "1:545038372345:web:99a52df52369b9f056c128"
};

// Initialize Firebase.
firebase.initializeApp(firebaseConfig); 

const messaging = firebase.messaging();

// App notification message.
messaging.setBackgroundMessageHandler(function(payload) {
  console.log('Message background received! ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
      body: payload.notification.body
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});