# Volunteer Registration System

A simple Volunteer Registration System built using the MERN stack that helps manage volunteer registrations and administration in one place.

The system allows volunteers to register through a public form, while administrators can securely log in, review applications, update volunteer status, and monitor overall registration statistics.

---

## Features

### Volunteer

- Register as a volunteer
- Submit personal and contact information
- Choose skills and preferred role
- Prevent duplicate registrations using email validation

### Admin

- Secure admin registration
- Login using JWT authentication
- View all registered volunteers
- View volunteer details
- Approve volunteers
- Reject volunteers
- Delete volunteer records

### Dashboard

- Total volunteers
- Approved volunteers
- Pending volunteers
- Rejected volunteers

---

## Tech Stack

### Frontend

- React.js
- Axios
- React Router DOM

### Backend

- Node.js
- Express.js

### Database

- MongoDB
- Mongoose

### Authentication

- JWT (JSON Web Token)
- bcryptjs

---

## Project Structure

```text
volunteer-registration-system/

├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI (ProtectedRoute, etc.)
│   │   ├── pages/           # Page views (Dashboard, Login, Registration)
│   │   ├── api.js           # Axios configuration
│   │   └── App.jsx          # Routing logic
└── server/
    ├── middleware/
    ├── routes/
    ├── db.js
    ├── server.js
    └── .env
```

---

## API Endpoints

### Volunteer Routes

| Method | Endpoint | Description |
|----------|----------|-------------|
| POST | `/api/volunteers` | Register a volunteer |

### Admin Routes

| Method | Endpoint | Description |
|----------|----------|-------------|
| POST | `/api/admin/register` | Register admin |
| POST | `/api/admin/login` | Admin login |
| GET | `/api/admin/stats` | Dashboard statistics |
| GET | `/api/admin/volunteers` | Get all volunteers |
| GET | `/api/admin/volunteers/:id` | Get volunteer by ID |
| PUT | `/api/admin/volunteers/:id/status` | Update volunteer status |
| DELETE | `/api/admin/volunteers/:id` | Delete volunteer |

---

## Volunteer Registration Flow

1. Volunteer fills out the registration form.
2. Volunteer information is stored in MongoDB.
3. Status is automatically set to **Pending**.
4. Admin logs into the dashboard.
5. Admin reviews volunteer applications.
6. Admin can approve or reject registrations.
7. Dashboard statistics update automatically.

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd volunteer-registration-system
```

### Backend Setup

```bash
cd server
npm install
```

Create a `.env` file:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

Start the backend:

```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## Future Improvements

- Search volunteers
- Filter volunteers by status


---



---

Built using the MERN stack as a volunteer management and registration platform.