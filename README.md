# Authentication API built using Node.js, Express, MongoDB, JWT, and bcrypt
- This project includes Register, Login, Protected Route, and User Profile.
---

## 🚀 Tech Stack
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs
- dotenv

---
## 🚀 Features
### ✔ Register User
- Hashes password using bcrypt
- Validates unique email
- Saves user to database
---
### ✔ Login User
- Checks email + password
- Returns JWT token
- ✔ Protected Route
- Requires JWT
- Middleware verifies token
---
### ✔ User Profile
- Returns logged-in user info (without password)
---
## 🔐 Authentication Flow (Easy to Understand)
 #### User registers → password is hashed
 ---
 #### User logs in → server returns JWT(token (copy it))
 ---
#### User sends token in headers
---
#### Authorization: Bearer token_here(key : Authorization, value : bearer (token))
---
#### Middleware checks token
---
#### If valid → access granted
---
#### If invalid → Access denied
----
📌 API Endpoints
Method	   Endpoint	               Description
POST	  /api/user/register	   Register new user
POST	  /api/user/login	       Login & get token
GET	     /api/user/profile	       Get user profile (Protected)

----
🧪 How to Test
1. Register User

Send JSON body:

{
  "name": "Ali",
  "email": "ali@example.com",
  "password": "123456"
}

2. Login User

Copy the token returned.

3. Test Protected Route

Add header:

Authorization: Bearer yourTokenHere


Call:

GET /api/user/profile
