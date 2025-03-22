## 🎥 VideoTube Backend

Welcome to the **VideoTube Backend** project! This is a high-performance backend application built using **Node.js**, **Express**, and **MongoDB**, designed to manage video streaming, user interactions, and subscriptions efficiently.

---

## 🚀 Features

✅ **User Authentication & Authorization**
- Secure user authentication using **JWT**.
- Password hashing with **bcrypt**.
- Protected routes and role-based access control.

✅ **Video Management**
- CRUD operations for videos.
- Upload video content using **Multer** and store securely with **Cloudinary**.
- Users can like, comment, and subscribe to channels.

✅ **User Profile & Avatar Management**
- Upload and manage user avatars.
- Subscription management with notification support.

✅ **Social Features**
- Comment and like system.
- Tweet/Share functionality.
- Subscription notifications.

✅ **Robust Middleware**
- Error handling using an efficient **async handler**.
- Input validation and sanitized request handling.
- **CORS** support for secure API interaction.

✅ **API Testing**
- Tested thoroughly using **Postman** for all endpoints.

---

## 🛠️ Technologies Used

- **Node.js** - JavaScript runtime environment that executes JavaScript code server-side.
- **Express.js** - Fast and minimal web framework for building RESTful APIs.
- **MongoDB** - NoSQL database to store and manage user data and videos.
- **Mongoose** - ODM (Object Data Modeling) library for MongoDB with built-in schema validation and query-building.
- **Cloudinary** - Cloud-based storage and image/video management service.
- **Multer** - Middleware for handling file uploads, particularly images and videos.

---

## 📚 Project Structure

```
/VideoTube-Backend
├── /controllers        # Business logic and API handling
├── /middlewares        # Authentication, error handlers, and security
├── /models             # Mongoose models and schema definitions
├── /routes             # Application routes
├── /utils              # Utility functions and helpers
├── /config             # Environment variables and configuration
└── server.js           # Entry point for the application
```

---

## 📦 Dependencies Explained

Here’s a breakdown of all the dependencies used and their role in the project:

### 1. **bcrypt**
- Used for hashing and comparing user passwords.
- Ensures secure password storage and protection from brute-force attacks.
- **Why?** Prevents storing plain text passwords, adding an extra layer of security.
```bash
npm install bcrypt
```

### 2. **cloudinary**
- A cloud-based service for uploading, storing, and managing images and videos.
- Supports transformation, optimization, and delivery of media assets.
- **Why?** It securely stores user avatars and videos, making media content highly accessible and scalable.
```bash
npm install cloudinary
```

### 3. **cookie-parser**
- Middleware that parses cookies attached to the client request object.
- Helps in managing user sessions, authentication, and maintaining state.
- **Why?** To securely store JWT tokens and enable easy access for authenticated requests.
```bash
npm install cookie-parser
```

### 4. **cors**
- Middleware to enable Cross-Origin Resource Sharing (CORS).
- Allows servers to define which domains can access the backend.
- **Why?** Prevents CORS policy errors when the frontend and backend are hosted on different domains.
```bash
npm install cors
```

### 5. **dotenv**
- Loads environment variables from a `.env` file into `process.env`.
- Keeps sensitive data (API keys, database URLs, etc.) hidden and secure.
- **Why?** To prevent hard-coding sensitive information directly in the codebase.
```bash
npm install dotenv
```

### 6. **express**
- Web framework for Node.js that simplifies building APIs.
- Provides routing, middleware support, and error handling.
- **Why?** Reduces boilerplate code and improves API management.
```bash
npm install express
```

### 7. **jsonwebtoken (JWT)**
- Library to generate and verify JSON Web Tokens (JWT).
- Used for securely transmitting information between the client and server.
- **Why?** Ensures secure authentication and authorization for protected routes.
```bash
npm install jsonwebtoken
```

### 8. **mongoose**
- ODM library that provides schema-based solutions for MongoDB.
- Makes it easier to interact with the database by providing models and validation.
- **Why?** Allows easy schema management and ensures consistency in data models.
```bash
npm install mongoose
```

### 9. **mongoose-aggregate-paginate**
- A pagination plugin for Mongoose that helps manage large datasets.
- Provides aggregated query results with pagination support.
- **Why?** Improves performance by paginating large datasets efficiently.
```bash
npm install mongoose-aggregate-paginate
```

### 10. **multer**
- Middleware to handle multipart/form-data, mainly used for file uploads.
- Helps process video and avatar uploads before sending data to the database.
- **Why?** It enables seamless file upload management in the application.
```bash
npm install multer
```

---

## 🔥 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/karangupta01/VideoTube-Backend.git
```

### 2. Navigate to the Project Directory
```bash
cd VideoTube-Backend
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Set Up Environment Variables
Create a `.env` file in the root directory and configure the following:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 5. Start the Server
```bash
npm run start
```
Server will be running on:
```
http://localhost:5000
```

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user and generate token

### User Management
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/avatar` - Upload user avatar
- `POST /api/user/subscribe/:id` - Subscribe to a channel

### Video Management
- `POST /api/video/upload` - Upload a new video
- `GET /api/video/:id` - Get video by ID
- `DELETE /api/video/:id` - Delete video

### Comments & Likes
- `POST /api/comment/:videoId` - Add a comment
- `POST /api/video/:id/like` - Like a video

---

## 🧪 Testing with Postman

All API endpoints have been thoroughly tested using **Postman** to ensure reliability and correctness.

---

## ⚡ Optimizations

- Efficient database queries with **Mongoose Aggregate Pagination**.
- Secured file upload process using **Multer** and **Cloudinary**.
- Optimized route handling and async error handling.

---

## 📝 Contribution Guidelines

Contributions are welcome! If you'd like to improve this project, please fork the repository and create a pull request.

---

## 📧 Contact & Support

For any issues or feature requests, please [open an issue](https://github.com/karangupta01/VideoTube-Backend/issues) or reach out at:
- 📩 **Email:** karangupta1017@gmail.com
- 💬 **LinkedIn:** www.linkedin.com/in/karan-gupta-3aa117248

---

## 📜 License

This project is licensed under the **MIT License**.

🎉 **Happy Coding!** 🎉
