# Backend MemeOS (MongoDB & TypeScript)

## 📋 Table of Contents

- [Project Description](#project-description)
- [Frontend Repository](#frontend-repository)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Team Members](#team-members)

## 📖 Project Description

**Backend MemeOS** is a backend API developed using **Node.js**, **Express**, **TypeScript**, and **MongoDB**. It serves as the backend service for the MemeOS application, allowing users to manage meme data with full CRUD functionality. The database is hosted on **MongoDB Atlas**, and the API is deployed on **Render**.

## Frontend Repository

The frontend repository for this project can be found at **[Frontend Repository](https://github.com/DarthVada36/memeos.git)**.

## 💻 Technologies Used

- **Node.js**: JavaScript runtime for building server-side applications.
- **Express.js**: Web framework for building APIs.
- **Express-validator**: Validation middleware for handling request data
- **TypeScript**: Superset of JavaScript for type safety.
- **MongoDB**: NoSQL database for data storage.
- **Mongoose**: ODM for MongoDB.
- **Jest & Supertest**: Testing libraries for unit and integration tests.
- **Postman**: API documentation and testing.

## 🚀 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/LorelizDev/backend_memeOS_mongoDB_ts.git
   cd backend_memeOS_mongoDB_ts
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Install TypeScript globally:

   ```bash
   npm install -g typescript
   ```

4. Build the project:

   ```bash
    npm run build
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

## 🌐 API Endpoints

The API will be running at http://localhost:8000.

| Method | Endpoint     | Description                   | Request Body                                         | Response Example                       |
| ------ | ------------ | ----------------------------- | ---------------------------------------------------- | -------------------------------------- |
| GET    | `/memes`     | Get all memes                 | N/A                                                  | 200 OK with list of all memes          |
| GET    | `/memes/:id` | Get a meme by ID              | N/A                                                  | 200 OK with the meme data              |
| POST   | `/memes`     | Create a new meme             | `{ name, image, date, author, stream, description }` | 201 Created with the created meme data |
| PUT    | `/memes/:id` | Update an existing meme by ID | `{ name, image, date, author, stream, description }` | 200 OK with the updated meme data      |
| DELETE | `/memes/:id` | Delete a meme by ID           | N/A                                                  | 200 OK with success message            |

## API Documentation

The API is fully documented via Postman. You can import the Postman collection using the following link: **[MemeOS API Postman Collection](https://documenter.getpostman.com/view/37812295/2sAXqy1ykP)**.

## Testing

The API includes unit and integration tests using Jest and Supertest. To run the tests, use the following command:

```bash
npm test
```

## Team Members

- **[Anca Bacria](https://github.com/a-bac-0)**
- **[Juan Vázquez](https://github.com/juanvprada)**
- **[Juliana Amorim](https://github.com/juamrm)**
- **[Lorena Acosta](https://github.com/LorelizDev)**
- **[Mónica Serna](https://github.com/monicaSernaS)**
