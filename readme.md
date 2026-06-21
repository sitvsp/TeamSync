# TeamSync : Real-Time Team Collaboration Platform

A full-stack real-time collaboration web application built using the MERN stack (MongoDB, Express.js, React.js, and Node.js) that enables users to communicate through one-to-one messaging, group conversations, and file sharing in a responsive and secure environment.

---

## Features

### User Authentication

* Secure user registration and login using JWT (JSON Web Tokens).
* Passwords are securely hashed using BcryptJS.
* Protected routes accessible only to authenticated users.

### Real-Time Communication

* Instant one-to-one messaging between users using Socket.IO.
* Global group chat for team-wide communication.
* Live message updates without page refresh.
* Efficient and low-latency communication system for seamless collaboration.

### Media & File Sharing

* Share files directly within private and group conversations.
* Support for images, PDFs, and documents using Multer.
* Uploaded files can be accessed directly from the chat interface.
* Secure file handling and storage on the server.

### User Directory & Chat Navigation

* View all registered users through a dedicated sidebar.
* Switch seamlessly between private chats and group conversations.
* Organized messaging interface for improved user experience.

### Collaboration Dashboard

* Centralized dashboard for chats and shared files.
* Real-time communication and file-sharing features in one place.
* Clean and intuitive layout for easy navigation.

### Modern User Interface

* Built using React.js and Tailwind CSS.
* Fully responsive design for desktop and mobile devices.
* Smooth and intuitive user experience.
* Modern and clean interface for real-time collaboration.

### Secure Logout

* JWT token removal from local storage.
* Automatic redirection to login page after logout.

---

## Usage

### Sign Up

Create a new account by providing:

* Name
* Email
* Password

Passwords are securely hashed before storage.

### Log In

Log in using registered credentials.

Upon successful login:

* JWT token is generated.
* Token is stored in local storage.
* User is redirected to the dashboard.

### Group Chat

Participate in a shared group conversation with all connected users in real time.

### Private Messaging

Select a user from the sidebar and exchange one-to-one messages instantly.

### File Sharing

Upload and share files directly inside private and group conversations.

### Logout

End the session securely and return to the login page.

---

## Technologies Used

* MongoDB & Mongoose – Database and schema modeling
* Express.js & Node.js – Backend server and API development
* React.js – Frontend development
* Socket.IO – Real-time communication
* React Router DOM – Client-side routing
* Axios – API communication
* Tailwind CSS – Responsive UI styling
* JWT (jsonwebtoken) – Authentication and authorization
* BcryptJS – Password hashing and security
* Multer – File upload handling

---

## Project Structure

```text
TeamSync
│
├── backend
│   │
│   ├── middleware
│   │   └── authMiddleware.js
│   │
│   ├── models
│   │   ├── Message.js
│   │   └── User.js
│   │
│   ├── routes
│   │   ├── authRoutes.js
│   │   └── fileRoutes.js
│   │
│   ├── uploads
│   │
│   ├── package-lock.json
│   ├── package.json
│   └── server.js
│
├── frontend
│   │
│   ├── src
│   │   │
│   │   ├── components
│   │   │   ├── ChatBox.jsx
│   │   │   ├── FileUpload.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── UserSidebar.jsx
│   │   │
│   │   ├── pages
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   │
│   │   ├── services
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .gitignore
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/sitvsp/TeamSync.git
```

### Backend Setup

```bash
cd backend
npm install
npm start
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## Future Improvements

* Online/offline user status indicators
* Typing indicators
* Deleting chats and clear chat option
* Allowing users to message themselves
* Search messages and files
* Multiple file upload and sharing support
* Dark/Light mode support
* Message reactions and replies
* Notifications system
* Team creation and invite system

---

## Acknowledgments

Built to enhance real-time communication and collaboration through secure messaging and file sharing. Special thanks to the MERN stack ecosystem, Socket.IO, JWT, Multer, Tailwind CSS, and the open-source community for providing the tools and technologies that powered this project.

---

## Author

**Priya Sinha**
