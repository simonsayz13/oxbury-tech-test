# Oxbury Bank - Farm API

This is an implementation of a RESTful API that provides the following functionalities:

- Makes available the data in [this file](/data.json)
- Ability to add/edit/delete data
- Ability to paginate response (default 30 items per page)
- Ability to query data sets on their field values and linked field values (e.g. `farmer_id` in applications)
- API Authentication using API Key
- Rate Limiting (default 15 requests every 15 minutes)
- SQL injection protection

# Tech Stack

- [TypeScript](https://www.typescriptlang.org/)
- [NodeJS](https://nodejs.org/en)
- [Sqlite3](https://www.npmjs.com/package/sqlite3)

# Usage

Note: This API can be modified to suit any other data sources.

## Preparation

Create a `.env` on the root of the project that contains the following environment variables:

    PORT = <Hosting Port>
    API_KEY = <API Key>

## Installation

    npm install

## Running the API

    npm start

## Running Tests

    npm test

## Example Endpoints

### GET `/application`

- Description: This endpoint retrieves all application records from the database or retrieves a specific application record in the database if an id is provided as request query.
- Parameters: None or the ID of the application, specified as part of the request query with a key of `id`.

### GET `/application/filter`

- Description: This endpoint retrieves all application record that matches the request query items in the database.
- Parameters: filter criteria as request query, specified as part of the request query e.g. `{
	"type": "flexi_credit"
}`.

### GET `/application/farmer`

- Description: This endpoint retrieves a specific application record along with farmer details
- Parameters: The ID of the application, specified as part of the request query with a key of `id`.

### GET `/application/product`

- Description: This endpoint retrieves a specific application record along with product details
- Parameters: The ID of the application, specified as part of the request query with a key of `id`.

### POST `/application`

- Description: This endpoint creates a new application record in the database.
- Parameters: application information as a json object, specified as part of the request body e.g. `{
	"id": 1234567,
	"type": "flexi_credit",
	"amount_requested": 60000.0,
	"status": "declined",
	"product_id": 1435004,
	"farmer_id": 1215200
}`.

### PUT `/application`

- Description: This endpoint modifies a specific application record in the database.
- Parameters: Application ID and field values to be changed as a json object, specified as part of the request body e.g. `{
	"amount_requested": 40000.0,
	"status": "pending",
}`.

### DELETE `/application`

- Description: This endpoint deletes a specific application record along with product details
- Parameters: The ID of the application, specified as part of the request query with a key of `id

# API Security

## API Authentication

To ensures that only authorised users or systems can access and interact with the API. API authentication via API Key has been implemented to help protect sensitive data and prevent unauthorized access or actions.

## Rate Limiting

Adding rate limits to an API is an effective way to prevent overload and abuse by limiting the number of requests that can be made within a specified time period. By doing so, the API can ensure that it remains available and responsive to all users, even during peak usage periods.

In order to achieve this goal, rate limits have been implemented in this API. These limits are designed to prevent any single user or application from consuming an unfair share of the API's resources, and they help ensure that the API remains accessible and responsive to all users. By setting appropriate rate limits, the API can effectively manage traffic and avoid issues such as downtime or reduced performance due to overload or abuse.

## Data Security

To ensure the security of the application and the data it manages, it is crucial to implement measures that prevent SQL injection attacks. SQL injection attacks can compromise the application's security and allow attackers to steal, modify, or delete sensitive data stored in the database.

To prevent SQL injection attacks, this API implements various measures such as data type checking and using parameterised queries. By performing data type checking, the API can ensure that only valid data is being used, and any malicious data that could be used in a SQL injection attack is rejected. Additionally, parameterised queries ensure that SQL commands cannot be modified maliciously by attackers, as the SQL command is predefined and any user input is treated as a parameter rather than part of the SQL command. These measures work together to ensure that the API is secure and protected against SQL injection attacks.

# Testing

[Jest](https://jestjs.io/) and [Supertest](https://www.npmjs.com/package/supertest) frameworks were used for integration test of the services of the API.
