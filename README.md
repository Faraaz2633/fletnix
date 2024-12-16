# FletNix: What to Watch

FletNix is an application that helps users navigate Netflix's vast catalog of TV shows and movies. It allows users to search, filter, and view details about available content based on their preferences and age restrictions. The app is built using **Angular** for the frontend, **Node.js with Express** for the backend, and **MongoDB** for data storage.

---

## Live Links
  - [**Frontend**](https://fletnix-faraz.vercel.app/)
  - [**Backend**](https://fletnix-f1b9.onrender.com)

---

## Features

### 1. **Authentication**
   - Users can register and log in using their **email**, **password**, and **age**.
   - Passwords are securely hashed using **bcrypt** for security.
   
### 2. **Paginated List**
   - Display a paginated list of all available TV shows and movies, with **15 items per page**.
   
### 3. **Search Functionality**
   - Users can search content by:
     - **Title** of the movie/TV show.
     - **Cast members** featured in the show.

### 4. **Age Restriction**
   - Users under 18 years old cannot view items rated **"R"**.

### 5. **Filter by Type**
   - Users can filter content between **Movies** and **TV Shows**.

### 6. **Detail Page**
   - Clicking on an item shows all its details (including **show ID**, **title**, **description**, **cast**, and more).

### 7. **UI/UX Design**
   - Built with **Tailwind CSS** & **Daisy UI** for a clean, responsive design.
   - Fully responsive on both **mobile** and **desktop** devices.

### 8. **Code Quality**
   - Follows best practices for **clean code** and separation of concerns.

### 9. **Hosting**
   - The app is deployed and hosted. The hosted version can be accessed [here](https://fletnix-faraz.vercel.app).

---

# Backend APIs for FletNix

## 1. User Authentication APIs

### `/api/auth/signup`
- **Method**: `POST`
- **Description**: Registers a new user with **email**, **password**, **name**, and **age**. Passwords are securely hashed.

### `/api/auth/login`
- **Method**: `POST`
- **Description**: Authenticates a user using **email** and **password**. Returns a **JWT token** on successful login.

### `/api/auth/validate`
- **Method**: `POST`
- **Description**: Validates the user's JWT token to check if they are authenticated.

---

## 2. Shows API

### `/api/shows`
- **Method**: `GET`
- **Description**: Fetches a paginated list of shows (movies or TV shows) based on **type**, **search** keyword, **page**, and **per_page** parameters.

#### Query Parameters:
- `type`: Filter by show type (movie or tv_show).
- `search`: Search by title or cast.
- `page`: Page number (default is 1).
- `per_page`: Number of items per page (default is 15).

---

## 3. Show Details API

### `/api/shows/:id`
- **Method**: `GET`
- **Description**: Retrieves detailed information for a specific show by its **show_id**.

---

## Tech Stack

- **Frontend**: Angular 19, Tailwind CSS, Daisy UI
- **Backend**: Node.js with Express
- **Database**: MongoDB
- **Authentication**: JWT & bcrypt for secure password hashing
- **Deployment**: Deployed on Vercel for frontend and Render for backend.

---


## Setup Instructions

### Backend Setup

1. **Clone the Repository:**

   ```bash
   git clone <repository-url>
   cd <repository-directory>/backend
   ```

2. **Install Dependencies:**

   ```bash
   yarn install
   ```

3. **Create a `.env` File:**

   Sign in to unsplash.com and create an application to get the access key. Create a `.env` file in the `backend` directory and add the following:

   ```env
   DB_URL=<your-db-url>
   JWT_ACCESS_TOKEN_EXPIRATION_TIME='2h'
   JWT_ACCESS_TOKEN_SECRET='secret'
   JWT_HASH_SALT=10
   JWT_REFRESH_TOKEN_EXPIRATION_TIME='7d'
   JWT_REFRESH_TOKEN_EXPIRATION_TIME_IN_DB=2592000
   JWT_REFRESH_TOKEN_SECRET='refresh_token'
   LOG_LEVEL='tiny'
   PORT=8000
   ```

4. **Start the Server:**

   ```bash
   yarn run dev
   ```

   The server will be running on `http://localhost:8000`.

### Frontend Setup

1. **Navigate to the Frontend Directory:**

   ```bash
   cd <repository-directory>/frontend
   ```

2. **Install Dependencies:**

   ```bash
   yarn install
   ```

3. **Start the Development Server:**

   ```bash
   yarn start
   ```

   The frontend will be running on `http://localhost:4200`.
