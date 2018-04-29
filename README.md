# react-redux-firestore-boilerplate :fire::rocket:

This is a boilerplate for React.js which uses Google Firebase's Firestore realtime database in conjunction with Redux to provide an asynchronous and persistent datastore for building large-scale web applications with a solid, scalable foundation.

## Introduction

This section gives a brief overview of the philosophy behind this boilerplate.

#### Why Firebase?

As you build larger react web applications, the need for a central, consolodated remote database becomes quite clear. Usually, one would need to learn how to configure a server backend to inter-operate with your front-end applications to make this possible. Google's Firebase/Firestore service aleviates this need by providing scalable databases that are free to provision. These databases are real-time, and can work with React's unidirectional dataflow to enable powerful, reactive applications that update in realtime with your databases.

#### Why Redux?

At first, the combination of redux with firebase's firestore seems quite odd. Firestore allows you to make shallow queries, so why do we need redux? While not explicitly necessary, redux enables you to extend react's powerful stateful model and handle data in a more direct manner. For example, if we were to inject our applications database into the root component of our application, we would then need to pass this data through props to every data-requiring component down the road. This is both unclean, and leads to over-passing extraneous data in many cases. Through react-redux's connect decorator, and mapStateToProps methods, we can inject part or all of our database directly into a component at any level. This higher-order-component structure allows us to be more effective and clean with our data-flow when large databases are being utilized.

#### Why make a boilerplate?

This one should be pretty straight-forward. As developers, we need to work effectively and efficiently as possible on our projects. While playing around with setting up a backend database can be fun once in a while, doing it multiple times in a repetative nature can be cumbersome and unnecessary. Sometimes we just need things to work. This boilerplate provides an initial stepping stone for you to base the framework of your web applications so you can spend time doing the more important things.
![Data Flow Model Illustration](https://github.com/zipzapflap/react-redux-firestore-boilerplate/raw/master/wiki/dataflow-model.png)

## Todo

* [ ] Finish project's Readme
  * [ ] Provide proper usage and installation instructions
  * [x] Document the data-flow model
  * [ ] Provide documentation of how users and their data stores are organized.
* [x] Create action methods for adding/modifying database data

## Usage

This boilerplate provides you with all of the tools you need to get started with designing a firestore-powered web application. To begin, however, you will need to do a few things:

#### Create a Firebase Project:

After cloning this repository to your working directory and installing the dependencies with `yarn install` or `npm install`, you will need to connect your application to a new firebase project. To do this, navigate to the firebase console here:
https://console.firebase.google.com/
