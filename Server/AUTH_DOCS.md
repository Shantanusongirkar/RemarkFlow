# Auth System Documentation

## Overview
Added a JWT-based authentication system for admin-only access. No third-party OAuth (no Google/Gmail). Admins register and log in using email + password.

---

## Files Added

### `Server/models/admin.model.js`
Mongoose schema for the Admin user.

Fields:
- `username` - unique, required
- `email` - unique, required, stored lowercase
- `password` - required, stored as bcrypt hash
- `role` - defaults to `"admin"`
- `timestamps` - createdAt / updatedAt auto-managed by Mongoose

---

### `Server/routes/auth.route.js`
Handles signup and login logic.

#### `POST /api/auth/signup`
Registers a new admin.

Request body:
```json
{
  "username": "admin1",
  "email": "admin@example.com",
  "password": "yourpassword"
}
```

Response:
```json
{
  "message": "Admin registered successfully",
  "token": "<jwt_token>",
  "admin": { "id", "username", "email", "role" }
}
```

- Checks for duplicate email or username before creating
- Password is hashed with bcrypt (salt rounds: 10)
- Returns a signed JWT valid for 7 days

---

#### `POST /api/auth/login`
Logs in an existing admin.

Request body:
```json
{
  "email": "admin@example.com",
  "password": "yourpassword"
}
```

Response:
```json
{
  "message": "Login successful",
  "token": "<jwt_token>",
  "admin": { "id", "username", "email", "role" }
}
```

- Validates email exists and password matches
- Returns a signed JWT valid for 7 days

---

### `Server/middleware/auth.middleware.js`
Middleware to protect routes. Verifies the JWT and checks the role is `"admin"`.

Usage on any protected route:
```js
import verifyAdmin from '../middleware/auth.middleware.js';

router.get('/protected-route', verifyAdmin, yourHandler);
```

Expects the token in the `Authorization` header:
```
Authorization: Bearer <jwt_token>
```

Error responses:
- `401` - No token or invalid/expired token
- `403` - Token valid but role is not admin

---

### `Server/.env`
Environment variables required to run the server.

```
PORT=3000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net
JWT_SECRET=your_super_secret_key_here
```

> Make sure this file is in `.gitignore` and never committed to the repo.

---

## Changes to Existing Files

### `Server/server.js`
- Imported `authRoutes` from `./routes/auth.route.js`
- Registered the route: `app.use("/api/auth", authRoutes)`

---

## API Summary

| Method | Endpoint            | Description        | Auth Required |
|--------|---------------------|--------------------|---------------|
| POST   | /api/auth/signup    | Register new admin | No            |
| POST   | /api/auth/login     | Login as admin     | No            |
| ANY    | /api/your-route     | Protected example  | Yes (Bearer)  |

---

## Dependencies Used
Already present in `package.json`:
- `bcrypt` - password hashing
- `jsonwebtoken` - JWT sign/verify
- `mongoose` - MongoDB ODM
