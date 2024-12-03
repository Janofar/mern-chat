# Project Name

## Description
This project is a full-stack web application that leverages modern technologies and design principles to deliver a seamless and interactive user experience. The application incorporates real-time updates, reusable components, and a well-structured codebase to ensure maintainability and scalability.

---

## Technologies Used

### Frontend
- **React**: A JavaScript library for building user interfaces, providing a component-based architecture.
- **TypeScript**: Used for type safety and enhanced developer productivity.
- **Redux**: State management for predictable and centralized application state.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Vite**: A fast build tool for development and production.

### Backend
- **Node.js**: JavaScript runtime for server-side programming.
- **Express.js**: Web framework for building RESTful APIs and managing server routes.
- **Socket.IO**: Enables real-time, bidirectional communication between clients and servers.

### Database
- **MongoDB**: NoSQL database for storing application data.

---

## Features
- **Real-Time Updates**: Implemented using Socket.IO for instant data synchronization across clients.
- **Reusable Components**: Ensures consistency and reusability throughout the application.
- **Router Integration**: Efficient navigation and page management using React Router.
- **MVC Architecture**: A clean code structure separating concerns into Models, Views, and Controllers.
- **Responsive Design**: Achieved with Tailwind CSS to ensure compatibility across devices.

---

## Folder Structure

```
root
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── redux
│   │   ├── router
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── tailwind.config.js
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── services
│   ├── app.ts
│   └── server.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

## Setup and Installation

### Prerequisites
- Node.js and npm/yarn installed
- MongoDB installed and running

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/Janofar/mern-chat.git
   ```
2. Navigate to the project directory:
   ```bash
   cd project-name
   ```
3. Install dependencies for both frontend and backend:
   ```bash
   cd frontend && npm install
   cd ../backend && npm install
   ```
4. Configure environment variables:
   - Create a `.env` file in the `backend` folder with MongoDB connection string and other required variables.
5. Start the application:
   - Start the backend server:
     ```bash
     cd backend
     npm run dev
     ```
   - Start the frontend development server:
     ```bash
     cd frontend
     npm run dev
     ```
6. Open the application in your browser at `http://localhost:5173`.


