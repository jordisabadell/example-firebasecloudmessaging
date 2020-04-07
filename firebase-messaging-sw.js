 importScripts('https://www.gstatic.com/firebasejs/7.12.0/firebase-app.js');
 importScripts('https://www.gstatic.com/firebasejs/7.12.0/firebase-messaging.js');

 var firebaseConfig = {
  apiKey: "<API_KEY>",
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

messaging.setBackgroundMessageHandler(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);

    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
        body: 'Background Message body.',
        icon: '/firebase-logo.png'
    };

    return self.registration.showNotification(notificationTitle,
      notificationOptions);
});