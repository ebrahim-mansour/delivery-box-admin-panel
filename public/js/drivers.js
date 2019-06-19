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
const driversElement = document.getElementById("drivers");

// Get a reference to the database service
const drivers = firebase.database().ref('Users/Riders');

drivers.on('child_added', driver => {
  let driverElement = document.createElement('div');
  driverElement.id = driver.key;

  // Driver name, phone, and image
  const driverName = document.createElement('p');
  driverName.innerText = `name: ${driver.val().name}`;
  driverName.className = `driverName`;

  const driverPhone = document.createElement('p');
  driverPhone.innerText = `phone: ${driver.val().phone}`;
  driverPhone.className = `driverPhone`;
  
  const driverImage = document.createElement('img');
  driverImage.src = driver.val().profileImageUrl;
  driverImage.className = `driverImage`;
  driverImage.width = 100;
  driverImage.height = 100;

  driverElement.appendChild(driverName);
  driverElement.appendChild(driverPhone);
  driverElement.appendChild(driverImage);

  // Calculating average rate if there is a history
  if (driver.val().rating) {
    let tripsRate = driver.val().rating;
    let tripRateValues = Object.values(tripsRate)
    let averageRate = tripRateValues.reduce((a, b) => a + b, 0) / tripRateValues.length
    
    let averageRateElement = document.createElement('p');
    averageRateElement.innerText = `Average rate: ${averageRate} in ${tripRateValues.length} trips`;
    averageRateElement.className = `averageRate`;

    driverElement.appendChild(averageRateElement);
  } else {
    let averageRateElement = document.createElement('p');
    averageRateElement.innerText = "This driver has not completed any trips";

    driverElement.appendChild(averageRateElement);
  }

  driversElement.appendChild(driverElement);
});

drivers.on('child_changed', driver => {

  const driverName = document.getElementById(driver.key).children[0]
  driverName.innerText = driver.val().name;

  const driverPhone = document.getElementById(driver.key).children[1];
  driverPhone.innerHTML = driver.val().phone;

  const driverImage = document.getElementById(driver.key).children[2];
  driverImage.src = driver.val().profileImageUrl;

  /*
  driver average rate
  const driverRate = document.getElementById(driver.key).children[3];
  */
 
});