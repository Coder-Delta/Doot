# Doot - Optimized Chat Application

A high-performance, real-time chat application built with modern web technologies. Doot enables seamless messaging between users with real-time notifications, file sharing, and optimized database queries.

## 🎯 Features

- **Real-Time Messaging**: Instant message delivery using WebSocket (Socket.io)
- **User Authentication**: Secure JWT-based authentication with refresh tokens
- **Message Management**: Create, retrieve, and mark messages as read
- **File Sharing**: Upload and share files via Cloudinary integration
- **Scalable Architecture**: Built to handle multiple concurrent connections with load balancing support
- **Optimized Database**: MongoDB with aggregation pipelines and pagination
- **Caching Layer**: Redis integration for improved performance
- **CORS Support**: Configurable cross-origin resource sharing

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js (v5.1.0)
- **Database**: MongoDB with Mongoose ODM
- **Real-Time Communication**: Socket.io
- **Caching**: Redis
- **Authentication**: JWT (jsonwebtoken)
- **File Upload**: Multer + Cloudinary
- **Security**: bcrypt for password hashing, CORS
- **Development**: Nodemon for hot reloading, Prettier for code formatting

## 📋 Prerequisites

- Node.js (v14 or higher)
- pnpm (v11.0.0 or higher)
- MongoDB instance
- Redis instance (optional, for caching)
- Cloudinary account (for file uploads)

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Doot
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory and populate it with the following variables:

```env
# Server Configuration
PORT=8000

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/doot

# CORS Configuration
CORS_ORIGIN=*

# JWT Configuration
ACCESS_TOKEN_SECRET=your_access_token_secret_key
ACCESS_TOKEN_EXPIRY=7d
REFRESH_TOKEN_SECRET=your_refresh_token_secret_key
REFRESH_TOKEN_EXPIRY=30d

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 4. Start the Application

**Development Mode** (with hot reloading):
```bash
pnpm run dev
```

The server will start on the specified PORT (default: 8000).

## 📁 Project Structure

```
Doot/
├── src/
│   ├── config/              # Configuration files
│   │   ├── redis.config.js
│   │   └── socket.config.js
│   ├── controllers/         # Request handlers
│   │   ├── message.controller.js
│   │   └── user.controller.js
│   ├── db/                  # Database connection
│   │   └── index.js
│   ├── middlewares/         # Express middlewares
│   │   ├── auth.middleware.js
│   │   └── multer.middleware.js
│   ├── models/              # Database schemas
│   │   ├── message.model.js
│   │   └── user.model.js
│   ├── routes/              # API routes
│   │   ├── message.route.js
│   │   └── user.route.js
│   ├── utils/               # Utility functions
│   │   ├── apiError.js
│   │   ├── apiResponse.js
│   │   ├── asyncHandler.js
│   │   └── cloudinary.js
│   ├── app.js               # Express app configuration
│   ├── constants.js         # Application constants
│   └── index.js             # Entry point
├── public/                  # Static files
├── package.json
└── README.md
```

## 🔌 API Endpoints

### Messages

#### Create Message
```
POST /messages
Content-Type: application/json

Request:
{
  "recipientID": "user_id",
  "messageContent": "Your message here"
}

Response:
✓ 200: Message created successfully
✗ 400: Missing required parameters
✗ 500: Server error
```

#### Get All Messages
```
GET /messages

Response:
✓ 200: List of messages
✓ 204: No messages found (empty array)
```

#### Get Message by ID
```
GET /messages/:id

Response:
✓ 200: Message details
✗ 404: Message not found
```

#### Mark Message as Read
```
PATCH /messages/:id

Response:
✓ 200: Message marked as read successfully
✗ 404: Message not found
```

### Users

Refer to [user.route.js](src/routes/user.route.js) for user-related endpoints.

## 🏗️ System Architecture

```
┌─────────────────────┐
│  Clients (Web/App)  │
└──────────┬──────────┘
           │
    ┌──────▼──────┐
    │Load Balancer│ (NGINX)
    └──────┬──────┘
           │
    ┌──────▼────────────┐
    │  API Servers      │ (Multiple instances)
    │  (Express.js)     │
    └──────┬────────────┘
           │
    ┌──────▼──────────┐
    │ Message Queue   │ (Socket.io, Redis)
    │ (Fan-out)       │
    └──────┬──────────┘
           │
    ┌──────▼────────────────┐
    │ Message Distributor   │
    └──────┬────────────────┘
           │
    ┌──────▼──────────────┐
    │  MongoDB Database   │
    │  (Hashing Ring)     │
    └─────────────────────┘
```

## 🔐 Authentication

The application uses JWT-based authentication:

1. Users receive an `accessToken` and `refreshToken` upon login
2. Include the `accessToken` in the Authorization header for protected routes
3. Use the `refreshToken` to obtain a new `accessToken` when it expires

**Example Header:**
```
Authorization: Bearer <accessToken>
```

## 📤 File Upload

File uploads are handled via Multer and stored on Cloudinary:

- Configure Cloudinary credentials in `.env`
- Use multipart/form-data for upload requests
- Supported file types depend on Cloudinary configuration

## 🤝 Contributors

- **Ranjit**
- **Anish**

## 📄 License

ISC License - See LICENSE file for details

## 📞 Support

For issues, feature requests, or questions, please contact the development team.

---

**Last Updated**: May 2026

