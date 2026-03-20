# Mini Social Media Feed App

A simple full-stack social media application where users can create accounts, post text or images, view a public feed, like posts, and comment on posts.

---

## 🚀 Features

### Authentication

* User Signup with username, email, and password
* User Login using email and password
* JWT based authentication
* User details stored in MongoDB

### Create Post

* Users can create posts with:

  * Text only
  * Image only
  * Both text and image
* Images are uploaded using **Multer** and stored locally on the server

### Feed

* Public feed showing posts from all users
* Posts displayed in a single centered column layout
* Each post shows:

  * Username
  * Post text
  * Post image
  * Likes count
  * Comments count
  * Timestamp

### Like & Comment

* Users can like or unlike any post
* Users can comment on any post
* Usernames of people who liked or commented are stored
* Like and comment updates reflect instantly in the UI

---

## 🛠 Tech Stack

**Frontend**

* React.js
* Axios
* React Router
* Bootstrap + Basic CSS

**Backend**

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* Multer (for image upload)

**Database**

* MongoDB (2 collections only)

  * Users
  * Posts

---

## 📁 Project Structure

### Backend

backend/

* config/
* controllers/
* middleware/
* models/
* routes/
* uploads/
* server.js

### Frontend

frontend/src/

* api/
* components/
* pages/
* App.jsx

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone <repo-url>
cd project-folder
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret
PORT=5000
```

Run backend:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🌐 API Endpoints

### Auth

* POST `/api/auth/signup`
* POST `/api/auth/login`

### Posts

* POST `/api/posts` → create post
* GET `/api/posts/feed` → get feed
* PUT `/api/posts/like/:id` → like/unlike
* POST `/api/posts/comment/:id` → add comment

