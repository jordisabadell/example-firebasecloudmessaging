 importScripts('https://www.gstatic.com/firebasejs/7.12.0/firebase-app.js');
 importScripts('https://www.gstatic.com/firebasejs/7.12.0/firebase-messaging.js');

 var firebaseConfig = {
  apiKey: "<API_KEY>",
  authDomain: "example-push-notification-2020.firebaseapp.com",
  databaseURL: "https://example-push-notification-2020.firebaseio.com",
  projectId: "example-push-notification-2020",
  storageBucket: "example-push-notification-2020.appspot.com",
  messagingSenderId: "601909066884",
  appId: "1:601909066884:web:881ea7b3d83a2e625b96d1"
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