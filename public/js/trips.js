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
const historyElement = document.getElementById("trips");

// Get a reference to the database service
const tripsRef = firebase.database().ref().child('History');
tripsRef.on('child_added', trip => {
  console.log(trip.val());

  // Trip id
  const tripElement = document.createElement('div')
  tripElement.id = trip.key;

  // Trip meta data
  const destination = document.createElement('p');
  destination.innerText = trip.val().destination;

  const price = document.createElement('p');
  price.innerText = trip.val().price;

  const rating = document.createElement('p');
  rating.innerText = trip.val().rating;

  const time = document.createElement('p');
  time.innerText = trip.val().timestamp;

  if (price.innerText != "undefined") {
    tripElement.appendChild(price);
  }

  tripElement.appendChild(destination);
  tripElement.appendChild(time);
  tripElement.appendChild(rating);

  // Customer data
  firebase.database().ref().child(`Users/Customers/${trip.val().customer}`).once('value', customer => {
    // Customer name and phone
    const customerName = document.createElement('p');
    customerName.innerText = customer.val().name;
    const customerPhone = document.createElement('p');
    customerPhone.innerText = customer.val().phone;

    tripElement.appendChild(customerName)
    tripElement.appendChild(customerPhone)

    // Driver data
    firebase.database().ref().child(`Users/Riders/${trip.val().driver}`).once('value', driver => {
      // Driver name and phone
      const driverName = document.createElement('p');
      driverName.innerText = driver.val().name;
      const driverPhone = document.createElement('p');
      driverPhone.innerText = driver.val().phone;
      const driverCar = document.createElement('p');
      driverCar.innerText = driver.val().car;

      tripElement.appendChild(driverName)
      tripElement.appendChild(driverPhone)
      tripElement.appendChild(driverCar)
    });

    // Adding trip data to the history
    historyElement.append(tripElement)

  });

});

/*
function snapshotToArray(snapshot) {
  const arr = [];

  snapshot.forEach(function(childSnapshot) {
      const item = childSnapshot.val();
      item.key = childSnapshot.key;

      arr.push(item);
  });

  return arr;
};
// Sync history changes
tripsRef.once('value', snap => {
  const trips = snapshotToArray(snap);
  trips.forEach(trip => {
    console.log(trip);

    // Trip id
    const tripElement = document.createElement('div')
    tripElement.id = trip.key;

    // Customer data
    firebase.database().ref().child(`Users/Customers/${trip.customer}`).once('value', customer => {
      // Customer name and phone
      const customerName = document.createElement('p');
      customerName.innerText = customer.val().name;
      const customerPhone = document.createElement('p');
      customerPhone.innerText = customer.val().phone;

      tripElement.appendChild(customerName)
      tripElement.appendChild(customerPhone)
    });

    // Driver data
    firebase.database().ref().child(`Users/Riders/${trip.driver}`).once('value', driver => {
      // Driver name and phone
      const driverName = document.createElement('p');
      driverName.innerText = driver.val().name;
      const driverPhone = document.createElement('p');
      driverPhone.innerText = driver.val().phone;
      const driverCar = document.createElement('p');
      driverCar.innerText = driver.val().car;

      tripElement.appendChild(driverName)
      tripElement.appendChild(driverPhone)
      tripElement.appendChild(driverCar)
    });

    // Trip meta data
    const destination = document.createElement('p');
    destination.innerText = trip.destination;

    const price = document.createElement('p');
    price.innerText = trip.price;

    const time = document.createElement('p');
    time.innerText = trip.timestamp;

    tripElement.appendChild(destination);
    tripElement.appendChild(price);
    tripElement.appendChild(time);

    // Adding trip data to the history
    historyElement.append(tripElement)

  });
})
*/
