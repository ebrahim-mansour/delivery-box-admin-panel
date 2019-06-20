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
const driversElement = document.querySelector("#drivers .container .row");

// Get a reference to the database service
const drivers = firebase.database().ref('Users/Riders');

drivers.on('child_added', driver => {
  let driverElement = document.createElement('div');
  driverElement.id = driver.key;
  driverElement.className = "col-lg-4 col-md-4 wow text-center"

  // Driver image
  const driverImage = document.createElement('img');
  driverImage.src = driver.val().profileImageUrl;
  driverImage.className = `driverImage img-fluid responsive img-circle`;
  driverImage.width = 200;
  driverImage.height = 200;

  // Name, phone, average rate, and delete button
  const driverName = document.createElement('p');
  driverName.innerText = `name: ${driver.val().name}`;
  driverName.className = `driverName`;

  const driverPhone = document.createElement('p');
  driverPhone.innerText = `phone: ${driver.val().phone}`;
  driverPhone.className = `driverPhone`;

  driverElement.appendChild(driverImage);
  driverElement.appendChild(driverName);
  driverElement.appendChild(driverPhone);

  // Calculating average rate if there is a history
  if (driver.val().rating) {
    let tripsRate = driver.val().rating;
    let tripRateValues = Object.values(tripsRate)
    let averageRate = tripRateValues.reduce((a, b) => a + b, 0) / tripRateValues.length

    let averageRateElement = document.createElement('p');
    averageRateElement.innerText = `Average rate: ${averageRate} in ${tripRateValues.length} trips`;
    averageRateElement.className = `averageRate`;
    if (averageRate < 3) {
      averageRateElement.classList.add('lowRate');
    }

    driverElement.appendChild(averageRateElement);
  } else {
    let averageRateElement = document.createElement('p');
    averageRateElement.innerText = "This driver has not completed any trips";

    driverElement.appendChild(averageRateElement);
  }

  // Delete driver button
  let deleteDriverButton = document.createElement('button');
  deleteDriverButton.className = `${driver.key} btn btn-danger`;
  deleteDriverButton.innerText = `Remove Driver`;

  driverElement.appendChild(deleteDriverButton);

  driversElement.appendChild(driverElement);

  const deleteDriverButtons = document.querySelectorAll('button');
  deleteDriverButtons.forEach(deleteButton => {
    deleteButton.addEventListener('click', () => {
      firebase.database().ref(`Users/Riders/${deleteButton.className}`).remove()
    })
  })

});

drivers.on('child_changed', driver => {
  const driverImage = document.getElementById(driver.key).children[0];
  driverImage.src = driver.val().profileImageUrl;

  const driverName = document.getElementById(driver.key).children[1];
  driverName.innerText = `name: ${driver.val().name}`;

  const driverPhone = document.getElementById(driver.key).children[2];
  driverPhone.innerHTML = `phone: ${driver.val().phone}`;
});

drivers.on('child_removed', driver => {
  const removedDriver = document.getElementById(driver.key);
  removedDriver.remove();
});