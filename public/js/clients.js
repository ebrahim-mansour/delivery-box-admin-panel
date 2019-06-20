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
const clientsElement = document.getElementById("clients");

// Get a reference to the database service
const clients = firebase.database().ref('Users/Customers');

clients.on('child_added', client => {
  let clientElement = document.createElement('div');
  clientElement.id = client.key;

  // client name, phone, and image
  const clientName = document.createElement('p');
  clientName.innerText = `name: ${client.val().name}`;
  clientName.className = `clientName`;

  const clientPhone = document.createElement('p');
  clientPhone.innerText = `phone: ${client.val().phone}`;
  clientPhone.className = `clientPhone`;

  const clientImage = document.createElement('img');
  clientImage.src = client.val().profileImageUrl;
  clientImage.className = `clientImage`;
  clientImage.width = 100;
  clientImage.height = 100;

  clientElement.appendChild(clientName);
  clientElement.appendChild(clientPhone);
  clientElement.appendChild(clientImage);

  // Calculating number of trips done by the client
  if (client.val().history) {
    let tripsObj = client.val().history;
    let tripsArr = Object.values(tripsObj);

    let numberOfTripsElement = document.createElement('p');
    numberOfTripsElement.innerText = `Number of trips completed: ${tripsArr.length}`;
    
    clientElement.appendChild(numberOfTripsElement);
  } else {
    let numberOfTripsElement = document.createElement('p');
    numberOfTripsElement.innerText = `This client has not completed any trips`;
    clientElement.appendChild(numberOfTripsElement);
  }

  /*
  // Calculating average rate if there is a history
  if (client.val().rating) {
    let tripsRate = client.val().rating;
    let tripRateValues = Object.values(tripsRate)
    let averageRate = tripRateValues.reduce((a, b) => a + b, 0) / tripRateValues.length

    let averageRateElement = document.createElement('p');
    averageRateElement.innerText = `Average rate: ${averageRate} in ${tripRateValues.length} trips`;
    averageRateElement.className = `averageRate`;

    clientElement.appendChild(averageRateElement);
  } else {
    let averageRateElement = document.createElement('p');
    averageRateElement.innerText = "This client has not completed any trips";

    clientElement.appendChild(averageRateElement);
  }
  */

  // Delete client button
  let deleteClientButton = document.createElement('button');
  deleteClientButton.className = `${client.key}`;
  deleteClientButton.innerText = `Remove client`;

  clientElement.appendChild(deleteClientButton);

  clientsElement.appendChild(clientElement);

  const deleteClientButtons = document.querySelectorAll('button');
  deleteClientButtons.forEach(deleteButton => {
    deleteButton.addEventListener('click', () => {
      firebase.database().ref(`Users/Customers/${deleteButton.className}`).remove()
    })
  })

});

clients.on('child_changed', client => {
  const clientName = document.getElementById(client.key).children[0]
  clientName.innerText = `name: ${client.val().name}`;

  const clientPhone = document.getElementById(client.key).children[1];
  clientPhone.innerHTML = `phone: ${client.val().phone}`;

  const clientImage = document.getElementById(client.key).children[2];
  clientImage.src = client.val().profileImageUrl;
});

clients.on('child_removed', client => {
  const removedClient = document.getElementById(client.key);
  removedClient.remove();
});