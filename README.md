## Project Overview

- Core Functionality: This is an Events API used to create future events, 
edit existing ones, delete events, and display them either by a specific 
ID or as a full list.

- Purpose: This serves as an API that stores events data. It is beneficial 
for keeping track of various events and making changes to them without 
having to stress about how the events are managed and stored.

- Target Audience: This API is for anyone looking for a tool to track 
various company events, or maybe day-to-day events they are planning.


## Installation Instructions

- Prerequisites: You need to have Node.js installed in your computer.
- Then run npm install in your terminal: This will install all the packages needed for my api to function,
also the node_modules needed for the project to run.

- for the environment variable setup,
 you have to go to your firebase account, create a projects, also create a collection name events,
 get your private key by going to the setting, click on service account and generate key.

 create a .env file in the main folder, and file out the content of the code below the contents in the
 private key you generated.

 example: 
NODE_ENV=development
PORT=3000
FIREBASE_PROJECT_ID=bed-demo-g3a74
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nSOME_KEY\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-k9r4p@cloud-project-b7c31.iam.gserviceaccount.com
SWAGGER_SERVER_URL=http://localhost:3000/api/v1

- run "npm start" in your terminal and your server will open the port.

### API Request Examples

### Get All Items

const requestOptions = {
  method: "GET",
  redirect: "follow"
};

fetch("http://localhost:3000/api/v1/events", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
```
Response (200 OK)
{
  "message": "events retrieved",
  "count": 5
  "data": [...]
}


### Create Events

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "name": "Event 1",
  "capacity": 100,
  "date": "2026-04-25"
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("http://localhost:3000/api/v1/events", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

"Content-Type", "application/json" add this to the header,
"name", "capacity" "date" are required in the body, select raw and JSON.
Added the required body in a json format.

Response (200 OK)
{
    "status": "success",
    "data": {
        "newEvent": {
            "eventId": "evt_000007",
            "id": "evt_000007",
            "name": "Event 1",
            "date": "2026-04-25T00:00:00.000Z",
            "capacity": 100,
            "resgistrationCount": 0,
            "status": "active",
            "category": "general",
            "createdAt": "2026-03-31T22:31:16.658Z",
            "updatedAt": "2026-03-31T22:31:16.658Z"
        }
    },
    "message": "Event created successfully"
}


### Delete Event

const requestOptions = {
  method: "DELETE",
  redirect: "follow"
};

fetch("http://localhost:3000/api/v1/events/evt_000007", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

Response (200 OK)

{
    "status": "success",
    "data": {},
    "message": "Event deleted successfully"
}


## Link to Public Documentation
- https://michaelo233.github.io/BackEnd-Project3/

## Local Documentation access

when your server running
- When running locally, access the API documentation at http://localhost:3000/api-docs
- go to your browser and input the url above 