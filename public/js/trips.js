const config = {
  apiKey: "AIzaSyDoXWje1rpRwxf5n5AkgM_9E9I8DNagsJY",
  authDomain: "uberapp-b.firebaseapp.com",
  databaseURL: "https://uberapp-b.firebaseio.com",
  projectId: "uberapp-b",
  storageBucket: "uberapp-b.appspot.com",
  messagingSenderId: "989821446056"
};

// Initializing firebase
firebase.initializeApp(config);

// Get elements
const historyElement = document.querySelector('#trips table tbody');

// Get a reference to the database service
const tripsRef = firebase.database().ref().child('History');
tripsRef.on('child_added', trip => {

  // Trip id
  const tripElement = document.createElement('tr')
  tripElement.id = trip.key;

  // Driver data
  firebase.database().ref().child(`Users/Riders/${trip.val().driver}`).once('value', driver => {
    // Driver name and phone
    const driverName = document.createElement('td');
    driverName.innerText = driver.val().name;
    const driverPhone = document.createElement('td');
    driverPhone.innerText = driver.val().phone;
    const driverCar = document.createElement('td');
    driverCar.innerText = driver.val().car;

    tripElement.appendChild(driverName);
    tripElement.appendChild(driverPhone);
    tripElement.appendChild(driverCar);

    // Customer data
    firebase.database().ref().child(`Users/Customers/${trip.val().customer}`).once('value', customer => {
      // Customer name and phone
      const customerName = document.createElement('td');
      customerName.innerText = customer.val().name;
      const customerPhone = document.createElement('td');
      customerPhone.innerText = customer.val().phone;

      tripElement.appendChild(customerName)
      tripElement.appendChild(customerPhone)

      // Trip meta data
      const destination = document.createElement('td');
      destination.innerText = trip.val().destination;

      // const time = document.createElement('td');
      // time.innerText = moment(trip.val().timestamp).format('MMMM Do YYYY')

      const price = document.createElement('td');
      price.innerText = isNaN(trip.val().price) == false ? `${Math.ceil(trip.val().price * 15)} EGP` : '';

      const rating = document.createElement('td');
      rating.innerText = trip.val().rating;

      tripElement.appendChild(destination);
      // tripElement.appendChild(time);
      if (price.innerText != "undefined") {
        tripElement.appendChild(price);
      }
      tripElement.appendChild(rating);

      // Adding trip data to the history
      historyElement.append(tripElement)
    });
  });
});

tripsRef.on('child_changed', trip => {
  // Driver data
  firebase.database().ref().child(`Users/Riders/${trip.val().driver}`).once('value', driver => {
    // Driver name and phone
    const driverName = document.getElementById(trip.key).children[0]
    driverName.innerText = driver.val().name;
    const driverPhone = document.getElementById(trip.key).children[1]
    driverPhone.innerText = driver.val().phone;
    const driverCar = document.getElementById(trip.key).children[2]
    driverCar.innerText = driver.val().car;

    // Customer data
    firebase.database().ref().child(`Users/Customers/${trip.val().customer}`).once('value', customer => {
      // Customer name and phone
      const customerName = document.getElementById(trip.key).children[3]
      customerName.innerText = customer.val().name;
      const customerPhone = document.getElementById(trip.key).children[4]
      customerPhone.innerText = customer.val().phone;

      const price = document.getElementById(trip.key).children[6]
      price.innerText = isNaN(trip.val().price) == false ? `${Math.ceil(trip.val().price * 15)} EGP` : '';

      const rating = document.getElementById(trip.key).children[7]
      rating.innerText = trip.val().rating;
    });
  });
});
