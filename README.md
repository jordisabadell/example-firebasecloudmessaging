# Firebase Cloud Notification example

## How to configure/install
1. Add Firebase to your JavaScript project and configure Web Credentials with FCM. See "how to do it" at original example, https://firebase.google.com/docs/cloud-messaging/js/client
1. Add your **apiKey** value on **main.js** and **firebase-messaging-sw-js** files.
1. Launch your web using a local server like **Web Server for Chrome** or **Firebase server**.
1. Copy your **Instance ID Token**.
1. Send a push notification using Firebase **Notifications composer** option. See "how to do it" at original example, https://firebase.google.com/docs/cloud-messaging/js/first-message

## Local Server

### Web Server for Chrome
https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb

### Firebase local server
Install Firebase tools. 
```
npm install -g firebase-tools
```
Initialitze a Firebase project.
```
firebase login
firebase init
```
Launch a local server.
```
firebase use --add
firebase serve -p 8081
``` 
Open [http://localhost:8081](http://localhost:8081).

## Cloud server

After install and initialize Firebase project, execute the next command to deploy on Firebase hosting.
```
firebase deploy
```

## Original examples
- Set up a JavaScript Firebase Cloud Messaging client app https://firebase.google.com/docs/cloud-messaging/js/client
- Send a test message to a backgrounded app https://firebase.google.com/docs/cloud-messaging/js/first-message
- Send messages to multiple devices https://firebase.google.com/docs/cloud-messaging/js/send-multiple