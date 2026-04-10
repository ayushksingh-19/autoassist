# AutoAssist

AutoAssist is a full-stack roadside assistance web app for booking vehicle help, tracking service requests, managing user accounts, and coordinating mechanics. It supports car, bike, EV, fuel, tyre, towing, emergency, wallet, profile, and premium package flows from one responsive interface.

## Live Demo

[Open AutoAssist](https://autoassist-frontend.onrender.com/)

Backend health check:

[https://autoassist-backend-z6mz.onrender.com/api/health](https://autoassist-backend-z6mz.onrender.com/api/health)

## Features

- User registration and login with JWT authentication
- Car, bike, EV, fuel, tyre, towing, washing, detailing, and emergency service flows
- Dynamic pricing and request summary before booking
- My Requests and Active Requests dashboards
- Mechanic assignment-ready backend structure
- Wallet and profile management pages
- Premium packages page
- Protected routes for authenticated flows
- Responsive React UI for desktop and mobile
- Express API with MongoDB Atlas storage
- Security middleware for CORS, Helmet, rate limiting, HPP, compression, request limits, and input sanitization

## Tech Stack

Frontend:

- React
- React Router
- Axios
- Socket.IO Client
- Leaflet and React Leaflet
- Tailwind CSS / custom CSS
- Create React App

Backend:

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- JWT
- bcryptjs
- Socket.IO
- Joi

Deployment:

- Render Web Service for the backend
- Render Static Site for the frontend

## Project Structure

```text
autoassist/
  backend/
    server.js
    src/
      config/
      controllers/
      middlewares/
      models/
      repositories/
      routes/
      services/
      validators/
  frontend/
    public/
    src/
      assets/
      components/
      pages/
      services/
      utils/
  render.yaml
  DEPLOYMENT_CHECKLIST.md
```

## Environment Variables

Create a backend `.env` file in `backend/` for local development:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-host>/autoassist?retryWrites=true&w=majority
JWT_SECRET=<use-a-random-64-character-secret>
JWT_EXPIRES_IN=1d
FRONTEND_URL=http://localhost:3000
REQUEST_BODY_LIMIT=20kb
RATE_LIMIT_MAX=300
AUTH_RATE_LIMIT_MAX=20
BCRYPT_ROUNDS=12
MONGO_MAX_POOL_SIZE=20
```

Create a frontend `.env` file in `frontend/` for local development:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

For production on Render:

```env
FRONTEND_URL=https://autoassist-frontend.onrender.com
REACT_APP_API_URL=https://autoassist-backend-z6mz.onrender.com/api
```

Never commit real `.env` files or secrets.

## Local Setup

Clone the repository:

```bash
git clone https://github.com/ayushksingh-19/autoassist.git
cd autoassist
```

Install dependencies:

```bash
npm run install:all
```

Start the backend:

```bash
npm run start:backend
```

Start the frontend in another terminal:

```bash
npm run start:frontend
```

Open:

[http://localhost:3000](http://localhost:3000)

## Available Scripts

From the repository root:

```bash
npm run install:all
npm run check
npm run build
npm run start:backend
npm run start:frontend
```

Backend-only:

```bash
cd backend
npm run check
npm start
```

Frontend-only:

```bash
cd frontend
npm start
npm run build
```

## Deployment

The repository includes `render.yaml` for Render deployment.

Backend settings:

```text
Root Directory: backend
Build Command: npm ci
Start Command: npm start
Health Check Path: /api/health
```

Frontend settings:

```text
Root Directory: frontend
Build Command: npm ci && npm run build
Publish Directory: build
```

After deployment, make sure the backend has:

```env
FRONTEND_URL=https://autoassist-frontend.onrender.com
```

And the frontend has:

```env
REACT_APP_API_URL=https://autoassist-backend-z6mz.onrender.com/api
```

## Security Notes

- Use a strong `JWT_SECRET` in production.
- Use a real MongoDB Atlas database user in `MONGO_URI`.
- URL-encode special characters in the MongoDB password.
- Allow Render access in MongoDB Atlas Network Access.
- Keep `.env` files private.

## Author

Built by [ayushksingh-19](https://github.com/ayushksingh-19).
