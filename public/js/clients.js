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
const clientsElement = document.querySelector("#clients .container .row");

// Get a reference to the database service
const clients = firebase.database().ref('Users/Customers');

clients.on('child_added', client => {
  let clientElement = document.createElement('div');
  clientElement.id = client.key;
  clientElement.className = "col-lg-4 col-md-4 wow text-center"

  // Client image
  const clientImage = document.createElement('img');
  clientImage.src = client.val().profileImageUrl;
  clientImage.className = `clientImage img-fluid responsive img-circle`;
  clientImage.width = 200;
  clientImage.height = 200;

  // Name, phone, and delete button
  const clientName = document.createElement('p');
  clientName.innerText = `name: ${client.val().name == undefined ? "" : client.val().name}`;
  clientName.className = `clientName`;

  const clientPhone = document.createElement('p');
  clientPhone.innerText = `phone: ${client.val().phone == undefined ? "" : client.val().phone}`;
  clientPhone.className = `clientPhone`;

  clientElement.appendChild(clientImage);
  clientElement.appendChild(clientName);
  clientElement.appendChild(clientPhone);

  // Calculating number of trips done by the client
  if (client.val().history) {
    let tripsObj = client.val().history;
    let tripsArr = Object.values(tripsObj);

    let numberOfTripsElement = document.createElement('p');
    numberOfTripsElement.innerText = `Number of trips completed: ${tripsArr.length}`;    
    if (tripsArr.length > 10) {
      numberOfTripsElement.classList.add('manyTrips');
    }

    clientElement.appendChild(numberOfTripsElement);
  } else {
    let numberOfTripsElement = document.createElement('p');
    numberOfTripsElement.innerText = `This client has not completed any trips`;
    clientElement.appendChild(numberOfTripsElement);
  }

  // Delete client button
  let deleteClientButton = document.createElement('button');
  deleteClientButton.className = `${client.key} btn btn-danger`;
  deleteClientButton.innerText = `Remove client`;

  clientElement.appendChild(deleteClientButton);

  clientsElement.appendChild(clientElement);

  const deleteClientButtons = document.querySelectorAll('button');
  deleteClientButtons.forEach(deleteButton => {
    deleteButton.addEventListener('click', () => {
      firebase.database().ref(`Users/Customers/${deleteButton.classList[0]}`).remove()
    })
  })

});

clients.on('child_changed', client => {
  const clientImage = document.getElementById(client.key).children[0];
  clientImage.src = client.val().profileImageUrl;

  const clientName = document.getElementById(client.key).children[1]
  clientName.innerText = `name: ${client.val().name == undefined ? "" : client.val().name}`;

  const clientPhone = document.getElementById(client.key).children[2];
  clientPhone.innerHTML = `phone: ${client.val().phone == undefined ? "" : client.val().phone}`;
});

clients.on('child_removed', client => {
  const removedClient = document.getElementById(client.key);
  removedClient.remove();
});