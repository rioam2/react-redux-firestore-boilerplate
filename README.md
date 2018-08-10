# react-redux-firestore-boilerplate :fire::rocket:

This is a boilerplate for React.js which uses Google Firebase's Firestore realtime database in conjunction with Redux to provide an asynchronous and persistent datastore for building large-scale web applications with a solid, scalable foundation.

## Introduction

This section gives a brief overview of the philosophy behind this boilerplate.

#### Why Firebase?

As you build larger react web applications, the need for a central, consolidated remote database becomes quite clear. Usually, one would need to learn how to configure a server backend to inter-operate with your front-end applications to make this possible. Google's Firebase/Firestore service alleviates this need by providing scalable databases that are free to provision. These databases are real-time, and can work with React's unidirectional dataflow to enable powerful, reactive applications that update in realtime with your databases.

#### Why Redux?

At first, the combination of redux with firebase's firestore seems quite odd. Firestore allows you to make shallow queries, so why do we need redux? While not explicitly necessary, redux enables you to extend react's powerful stateful model and handle data in a more direct manner. For example, if we were to inject our application's database into the root component of our application, we would then need to pass this data through props to every data-requiring component down the road. This is both unclean, and leads to over-passing extraneous data in many cases. Through react-redux's connect decorator, and mapStateToProps methods, we can inject part or all of our database directly into a component at any level. This higher-order-component structure allows us to be more effective and clean with our data-flow when large databases are being utilized.

#### Why make a boilerplate?

This one should be pretty straight-forward. As developers, we need to work as effectively and efficiently as possible on our projects. While playing around with setting up a backend database can be fun once in a while, doing it multiple times in a repetitive nature can be cumbersome and unnecessary. Sometimes we just need things to work. This boilerplate provides an initial stepping stone for you to base the framework of your web applications so you can spend time doing the more important things.
![Data Flow Model Illustration](https://github.com/zipzapflap/react-redux-firestore-boilerplate/raw/master/wiki/dataflow-model.png)

## Todo

* [x] Finish project's Readme
  * [x] Provide proper usage and installation instructions
  * [x] Document the data-flow model
  * [x] Provide documentation of how users and their data stores are organized.
* [x] Create action methods for adding/modifying database data

## Usage

This boilerplate provides you with all of the tools you need to get started with designing a firestore-powered web application. To begin, however, you will need to do a few things:

#### Clone this Repository:

Using the repository url, clone this project using `git clone [url]` or by downloading a zip archive locally.

#### Create a Firebase Project:

After cloning this repository to your working directory and installing the dependencies with `yarn install` or `npm install`, you will need to connect your application to a new firebase project. To do this, navigate to the firebase console here:
https://console.firebase.google.com/

#### Setup a Firestore with Rules:

In the Firebase console, create a new Firestore database (not realtime database). You can start with either 'Locked Mode' access permission rules or 'test mode'- we will be modifying these momentarily. Once you have setup a firestore, you can navigate to the 'Rules' section of the database and enter in the following permissions to allow rudimentary access for users and their data:

```javascript
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      match /{allChildren=**} {
        allow read: if request.auth.uid == userId;
        allow write: if request.auth.uid == userId;
      }
    }
  }
}
```

Publish these rules to save your changes. Your Firebase Firestore is now ready to use!

#### Link your app with Firebase:

Create a new `.env` file with the example contents of `.env-example`. Fill in the appropriate information, which can be found in your new Firebase project settings and formatted as such (without curly-braces):

```
REACT_APP_FIREBASE_API_KEY={From Firebase Console}
REACT_APP_AUTH_DOMAIN={Firebase Project ID}.firebaseapp.com
REACT_APP_DATABASE_URL=https://{Firebase Project ID}.firebaseio.com
REACT_APP_PROJECTID={Firebase Project ID}
```

Save these changes, and you have successfully linked up your application to use your cloud database.

#### Authenticating Users from your Application:

To allow users to allocate new data on your database with the rules we set above, they will need to authenticate with Firebase. This can be done in many ways (see the Firebase Documentation for more information on this). You can authenticate manually by calling Firebase authentication methods via the instance setup in `.../src/firebase-redux/firebase.js` or use the built-in boilerplate authentication methods found in `.../src/firebase-redux/actions/auth.js`. Right now only Google Authentication is supported. I may or may not add more authentication methods for this boilerplate.

To use the Google Authentication from this boilerplate, you must first enable Google Authentication in the Firebase Console. Once this is done, you can then call the `auth.googleAuth()` method from `.../src/firebase-redux/actions/auth.js` to initiate the Google OAuth Flow Popup. Upon successful login, the user will be authenticated with firebase and a corresponding firstore `/users/{userID}/` document will be created.

Next we will learn how to add substores to these user allocations in firestore.

#### Creating Substores for Persistent Application State:

Your database is pushed to redux (and then React) via 'substores'. These substores can be named anything, and will allow you to keep persistent state across site reloads since they are synchronized with Firebase. They also use firebase's websocket functionality to keep state realtime across devices for a given user. The naming conventions you use for each substore is completely up to you. For example, if you want to save and store a user's settings/preferences state for your web-application, you can create a 'settingsData' store in the `.../src/firebase-redux/stores.js` file as follows:

```javascript
/* Your store listings are defined here */
const stores = ['settingsData'];
export default stores;
```

If you want to organize other data into another substore, you can add a new entry to the stores array as such:

```javascript
const stores = ['settingsData', 'todoData', 'applicationData'];
```

This will create a new redux reducer, and associated firestore fetch actions for the new substore(s) for you. Any state pushed to firestore will now flow down into your redux state automatically as shown in the data-flow model above. Easy!

#### Adding, Removing and Editing Firestore Data:

You are more than welcome to modify and add data from firestore using the methods outlined in the Firebase Firestore documentation. However, I have provided some helpful CRUD (Create Read Update and Delete) methods in this boilerplate for you to use.

To access these database actions, import as follows:

```javascript
// Change path to database to match working directory
import database from './firebase-redux/actions/database';
```

and then you can call one of the following:

```javascript
database.set(fieldString, value);
database.delete(fieldString);
```

where fieldString is a string representation of the key path in Firebase Firestore (eg. 'settingsData.field.subField' where settingsData is a substore and field and subfield are object keys for an object field in the settingsData document). When these methods are used to modify data in the Firestore database, these changes will flow down into the redux state as described above.

#### Connecting Redux State to React Components:

This can be done in any way as described in the Redux Documentation. I find it convenient to use Redux `connect()` to do this, however. To link redux state to your components, use the following structure:

```javascript
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ComponentName = props => {
	ComponentName.propTypes = {};
	// Displays the value of the darkMode setting in Firestore
	return <div>{props.settingsData.darkMode}</div>;
};

// Maps the Redux state to the Component Props
export default connect(state => ({
	settingsData: settingsData
}))(ComponentName);
```

The aspects important to notice are: importing connect from react-redux and then exporting a connected Component. The lambda function passed to the connect method is called 'mapStateToProps' in the redux documentation. It takes a portion of the redux state, and returns an object to map onto the component's props. Using this method, you can access redux state as you would normally do with React Props, only with redux injecting these properties.
