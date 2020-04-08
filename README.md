# Firebase Cloud Notification example

## Project configuration
- Rename *.env_EMPTY* file to *.env*
- Set FCM web API key value. You'll get on Firebase > Project settings > General > Web API Key.

## Project start
Install dependencies:
```
npm install
```
Launch server:
```
gulp
```
---

## Send a test message using FCM
You will need:
- **Instance ID Token**: Token generated on your website through the *messaging.getToken()* function.

Steps:
1. Go to Firebase > Select project > Cloud Messaging > Send your first message.
1. Write "Notification" text filed.
1. Click on "Send test message".
1. Add a FCM registration token [your Instance ID Token].
1. Click on "Test".


## Send a test message using Postman

### 1. Get Access token
#### 1.1. Generate Private key
- Go to Firebase > Project settings > Service accounts > Generate new private key
- Rename file to "*private_key.json*" and move to *c:/tmp*

#### 1.2. Generate Access token (using Java)
Maven configuration:
```
<dependency>
  <groupId>com.google.api-client</groupId>
  <artifactId>google-api-client</artifactId>
  <version>1.25.0</version>
</dependency>
```
Java main class:
```
public static void main(String[] args) throws IOException {
  FileInputStream privateKeyFile = new FileInputStream("c:/tmp/private_key.json");

  //OAuth 2.0 Scopes for Google APIs --> https://developers.google.com/identity/protocols/oauth2/scopes#fcmv1
  String[] scopes = new String[] { 
    "https://www.googleapis.com/auth/cloud-platform"
  };

  GoogleCredential googleCredential = GoogleCredential
    .fromStream(privateKeyFile)
    .createScoped(Arrays.asList(scopes));

  googleCredential.refreshToken();

  String accessToken = googleCredential.getAccessToken();

  System.out.println(accessToken);
}
```
You'll get something like *ya29.c.Ko8Bx******FyD4OM*

### 2. HTTP POST request
You'll need:
- **Project ID**: Get you *+Project Id** going to Firebase > Project settings > General > Project ID.
- **Access token**: See previous step. 
- **Instance ID Token**: Token generated on your website through the *messaging.getToken()* function.

URL call:
```
POST https://fcm.googleapis.com/v1/projects/[Your Project ID]/messages:send HTTP/1.1
```

Headers:
```
Content-Type: application/json
Authorization: Bearer [your Access token]
```

Body (*raw* type):
```
{
  "message": {
    "token" : [your Instance ID Token],
    "notification": {
      "title": "Test message",
      "body": "This is a test message from FCM."
    }    
  }
}
```

## Subscribe user to a topic using Postman
You'll need:
- **Instance ID Token**: Token generated on your website through the *messaging.getToken()* function.
- **Topic name**: whatever you want.
- **Server key**: Firebase > Project settings > Cloud Messaging > Server key

URL call:
```
POST https://iid.googleapis.com/iid/v1/{your Instance ID token}/rel/topics/{Topic name} HTTP/1.1
```

Headers:
```
Content-Type: application/json
Authorization: key={your Server key}
```
## Send test messages to topic using Postman
Like example 'Send a test message using Postman'. You only have to replace 'token' by 'topic' on *Body* message :
```
{
  "message": {
    "topic" : [your Topic name],
    "notification": {
      "title": "Test topic",
      "body": "This is a test topic from FCM."
    }
  }
}
```
#### Bibliography:
- https://stackoverflow.com/questions/38661839/using-postman-to-access-firebase-rest-api/56308328#56308328
- https://stackoverflow.com/questions/47325150/where-to-get-scopes-dependencies-for-java-for-new-firebase-cloud-message-api

---

## Alternatives local servers

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

## Google hosting server
After install and initialize Firebase project, execute the next command to deploy on Firebase hosting.
```
firebase deploy
```

---

## Original examples
- Set up a JavaScript Firebase Cloud Messaging client app https://firebase.google.com/docs/cloud-messaging/js/client
- Send a test message to a backgrounded app https://firebase.google.com/docs/cloud-messaging/js/first-message
- Send messages to multiple devices https://firebase.google.com/docs/cloud-messaging/js/send-multiple