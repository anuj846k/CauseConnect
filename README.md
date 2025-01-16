# CauseConnect

Cause Connect is a web application that helps users find and connect with volunteer opportunities organized by local NGOs and community initiatives. The app aims to bridge the gap between volunteers and organizations, allowing for easy event discovery, registration, and participation.

YouTube link - https://youtu.be/loH2dCFAVb4?si=GHSRxwNOKR0hLQfx


![Community drive](image.png)

![Volunteer Events Near you](https://github.com/user-attachments/assets/d2c1ae07-db99-4c21-998e-b60582ef354d)

![LeaderBoard](https://github.com/user-attachments/assets/5a6b50a3-e2d3-4828-bdef-07881e1cf80e)


![image](https://github.com/user-attachments/assets/71a86f13-4f6e-4f11-a150-9d99b3c222e5)





## Table of Contents
1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Environment Variables](#environment-variables)
   - [Running the App](#running-the-app)
4. [Future Improvements](#future-improvements)


## Features
- **Event Discovery**: Browse and search for volunteer events in your area.
- **User Authentication**: Sign up, log in, and secure access with JWT authentication.
- **Event Registration**: Register for events, view past events, and receive event updates.
- **Organizer Dashboard**: NGOs and organizations can create, update, and manage events.
- **Pagination and Loading Effects**: Smooth and dynamic pagination for events, with loading indicators for a seamless experience.

## Tech Stack
- **Frontend**: React, TypeScript, Tailwind CSS, Daisy UI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (using MongoDB Atlas)
- **Authentication**: JSON Web Tokens (JWT)
- **Map Integration**: OpenStreetMap for location display


## Getting Started

### Prerequisites
Before you begin, make sure you have the following installed:
- Node.js (v14 or higher)
- MongoDB Atlas account and cluster (or a local MongoDB instance)


### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/HackXwizards/CauseConnect.git
   
2. Navigate into the project folder:
   ```bash
   cd CauseConnect

3. Install dependencies for both Frontend and Backend:
   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install

### Environment Variables
Create a .env file in the root of the backend folder and add the following variables:
- **MongoDB Connection String**
   ```plaintext
   MONGO_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<your-database>?retryWrites=true&w=majority
- **JWT SECRET**
   ```plaintext
   JWT_KEY=your_jwt_secret_key
   JWT_EXPIRES_IN=90d
- **PORT**      
   ```plaintext
   PORT=5000
### Running the App
1. Start the Backend Server:
   ```bash
   cd backend
   npm start
2. Start the Frontend Development Server:
   ```bash
   cd ../Frontend
   npm run dev 
3. Open [http://localhost:5173](http://localhost:5173) in your browser to view the app.
      
## Future Improvements


In-app virtual assistant: to suggest event ideas and autofill forms


In-app Messaging: Enable direct communication between volunteers and organizers.


Notifications: Send reminders and updates for upcoming events.
