const firebase = require('firebase');
const config = require('../firebase.config');

// Initializing firebase
firebase.initializeApp(config);

// Get a reference to the database service
const database = firebase.database();

let riders = database.ref('Users/Riders');
let drivers = [];

riders.on('value', snapshot => {
  drivers.push(snapshot.val());
});

module.exports = drivers;