# SportNest Server

## Project Overview

SportNest Server is the backend API service for the SportNest Sports Facility Booking Management System. It handles authentication, facility management, bookings, protected APIs, and MongoDB database operations.

This backend is built using Node.js, Express.js, MongoDB, JWT Authentication, and Better Auth.

---

## Live API URL

🔗 Server URL: https://b13-a09-server.vercel.app

---

## Features

- RESTful API Architecture
- JWT Authentication with HTTPOnly Cookies
- Better Auth Integration
- MongoDB Database Management
- Facility CRUD Operations
- Booking Management System
- Search & Filter APIs
- Protected Private Routes
- Owner-based Authorization
- Error Handling Middleware
- Secure Environment Variables
- CORS Configuration

---

## Tech Stack

- Node.js
- Express.js
- Typescript
- MongoDB
- Mongoose
- JWT
- Better Auth
- Cookie Parser
- Dotenv
- Cors

---

## API Endpoints

### Authentication

| Method | Route                | Description       |
| ------ | -------------------- | ----------------- |
| POST   | `/api/auth/login`    | User Login        |
| POST   | `/api/auth/register` | User Registration |
| POST   | `/api/auth/logout`   | Logout User       |

---

### Facilities

| Method | Route                 | Description         |
| ------ | --------------------- | ------------------- |
| GET    | `/api/facilities`     | Get All Facilities  |
| GET    | `/api/facilities/:id` | Get Single Facility |
| POST   | `/api/facilities`     | Add Facility        |
| PUT    | `/api/facilities/:id` | Update Facility     |
| DELETE | `/api/facilities/:id` | Delete Facility     |

---

### Bookings

| Method | Route               | Description       |
| ------ | ------------------- | ----------------- |
| POST   | `/api/bookings`     | Create Booking    |
| GET    | `/api/bookings`     | Get User Bookings |
| PUT    | `/api/bookings/:id` | Cancel Booking    |

---

## MongoDB Collections

### Facilities Collection

```js
{
  (name,
    facility_type,
    image,
    location,
    price_per_hour,
    capacity,
    available_slots,
    description,
    owner_email,
    booking_count);
}
```

### Bookings Collection

```js
{
  (facility_id,
    user_email,
    booking_date,
    time_slot,
    hours,
    total_price,
    status);
}
```

---

## Search & Filter Support

### Search by Facility Name

Uses MongoDB `$regex`

### Filter by Sport Type

Uses MongoDB `$in`

Example:

```js
{
  facility_type: {
    $in: ["Football", "Tennis"];
  }
}
```

---

## Authentication System

### JWT with Cookies

- Generate JWT token
- Store token in HTTPOnly Cookie
- Verify token in middleware
- Protect private APIs

---

## Environment Variables

Create a `.env` file in the root directory.

```env
PORT=5000
DATABASE_URL=your_mongodb_uri
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:3000
```

---

## Installation & Setup

### Clone Repository

```bash
git clone https://github.com/Saddam2508/b13-a09-server.git
```

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

---

## NPM Packages Used

```txt
express
mongoose
jsonwebtoken
cookie-parser
cors
dotenv
better-auth
bcryptjs
tsx
```

---

## Security Features

- Protected Routes
- HTTPOnly Cookies
- Environment Variable Protection
- MongoDB Credential Security
- Owner Authorization Middleware

---

## Error Handling

- Custom Error Middleware
- Invalid Route Handling
- Validation Error Responses
- Unauthorized Access Handling

---

## Future Improvements

- Payment Gateway Integration
- Admin Panel
- Email Notifications
- Facility Reviews & Ratings
- Real-time Booking Availability

---

## Author

Developed by Md Saddam Hossain
