# MERN E-Commerce Store Setup Guide

## Prerequisites

- Node.js (v18 or higher recommended)
- npm (comes with Node.js)
- MongoDB (local or cloud, e.g., MongoDB Atlas)

## 1. Clone the Repository

```
git clone <your-repo-url>
cd mern-ecommerce-master
```

## 2. Install Dependencies

### Backend

```
cd backend
npm install
```

### Frontend

```
cd ../frontend
npm install
```

## 3. Set Up Environment Variables

Create a `.env` file in the `backend` folder with the following content:

```
MONGO_URI=mongodb://localhost:27017/ecommerce
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
CLOUDINARY_CLOUD_NAME=dummy_cloud_name
CLOUDINARY_API_KEY=dummy_api_key
CLOUDINARY_API_SECRET=dummy_api_secret
STRIPE_SECRET_KEY=dummy_stripe_secret
```

- For local development, dummy values are fine for Cloudinary and Stripe.
- Replace `your_access_token_secret` and `your_refresh_token_secret` with strong random strings.

## 4. Start MongoDB

Make sure MongoDB is running locally. If installed, you can start it with:

```
# On Windows
mongod
```

Or use MongoDB Compass or Atlas for a cloud database.

## 5. Run the Backend

```
cd backend
npx nodemon server.js
```

The backend will start on `http://localhost:5000`.

## 6. Run the Frontend

```
cd frontend
npm run dev
```

The frontend will start on `http://localhost:5173`.

## 7. Access the App

- Open your browser and go to `http://localhost:5173`.
- To access the admin dashboard, log in as a user with `role: "admin"`.
- To make yourself an admin, update your user in the `users` collection in MongoDB:
  - Set `role` to `admin` for your user document.

## 8. Features

- Product management (add, edit, delete)
- Cart and checkout (mocked for local dev)
- Admin dashboard
- User authentication

## Notes

- Stripe and Cloudinary are disabled/mocked for local development.
- Orders are stored in MongoDB after checkout.
- For production, use real API keys and secure secrets.

---

For any issues, check the code comments or contact the project maintainer.
