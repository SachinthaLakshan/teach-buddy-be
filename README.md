# Teach Buddy Backend API

A Node.js backend server using Express, MongoDB, and Mongoose for managing users, subjects, teaching records, and lesson plans.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file (see `.env` in repo for example).
3. Start the server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Auth

#### POST `/api/users/signup`
- **Description:** Register a new user.
- **Body:**
  ```json
  { "email": "string", "password": "string", "name": "string" }
  ```
- **Response:**
  - `201 Created` on success
  - `409 Conflict` if user exists

#### POST `/api/users/signin`
- **Description:** Login and get JWT token.
- **Body:**
  ```json
  { "email": "string", "password": "string" }
  ```
- **Response:**
  - `200 OK` with `{ token, user }`
  - `401 Unauthorized` on invalid credentials

---

### Subjects

#### GET `/api/subjects`
- **Description:** List all subjects.
- **Response:** Array of subjects

#### POST `/api/subjects`
- **Description:** Create a new subject.
- **Body:**
  ```json
  { "name": "string" }
  ```
- **Response:** Created subject

#### PUT `/api/subjects/:id`
- **Description:** Update a subject by ID.
- **Body:**
  ```json
  { "name": "string" }
  ```
- **Response:** Updated subject

#### DELETE `/api/subjects/:id`
- **Description:** Delete a subject by ID.
- **Response:** `{ message }`

---

### Teaching Records

#### GET `/api/teaching-records/user/:userId`
- **Description:** Get all teaching records for a user.
- **Response:** Array of teaching records

#### POST `/api/teaching-records`
- **Description:** Add a new teaching record.
- **Body:**
  ```json
  { "userId": "string", "date": "YYYY-MM-DD", "period": number, "subjectId": "string", "description": "string", "grade": "string (optional)" }
  ```
- **Response:** Created record

#### PUT `/api/teaching-records/:id`
- **Description:** Update a teaching record by ID.
- **Body (provide only fields to update):**
  ```json
  {
    "date": "YYYY-MM-DD",
    "period": number,
    "subjectId": "string",
    "description": "string",
    "grade": "string"
  }
  ```
- **Response:** Updated record

#### DELETE `/api/teaching-records/:id`
- **Description:** Delete a teaching record by ID.
- **Response:** `{ message }`

---

### Lesson Plans

#### GET `/api/lesson-plans/user/:userId`
- **Description:** Get all lesson plans for a user.
- **Response:** Array of lesson plans

#### POST `/api/lesson-plans`
- **Description:** Add a new lesson plan.
- **Body:**
  ```json
  {
    "userId": "string",
    "title": "string",
    "subjectId": "string",
    "date": "YYYY-MM-DD",
    "objectives": ["string"],
    "activities": ["string"],
    "assessment": "string",
    "grade": "string (optional)"
  }
  ```
- **Response:** Created lesson plan

#### DELETE `/api/lesson-plans/:id`
- **Description:** Delete a lesson plan by ID.
- **Response:** `{ message }`

---

## Notes
- All endpoints are public (no authentication required for API access).
- Passwords are hashed before storing in the database.
- JWT is returned on signin but not required for other endpoints. 