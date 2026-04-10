# AutoAssist Deployment Checklist

## Recommended Project Deployment Path

Use this setup for a clean project/demo deployment:

- Database: MongoDB Atlas
- Backend: Render, Railway, or any Node host
- Frontend: Vercel, Netlify, or Render Static Site

The repo now includes deployment presets:

- `render.yaml` for Render blueprint deployment
- `backend/Procfile` for Railway/Heroku-style Node hosting
- `backend/Dockerfile` for Docker-based hosting
- `frontend/vercel.json` for React Router support on Vercel
- `frontend/netlify.toml` for React Router support on Netlify

## Step 1: Create MongoDB Atlas Database

1. Create a MongoDB Atlas cluster.
2. Create a database user with a strong password.
3. Add your backend host IP to Network Access. For a quick project demo, Atlas also allows `0.0.0.0/0`, but that is less secure.
4. Copy the connection string and use it as `MONGO_URI`.

## Step 2: Deploy Backend

Backend root directory:

```bash
backend
```

Build command:

```bash
npm ci
```

Start command:

```bash
npm start
```

Health check path:

```bash
/api/health
```

After deployment, open:

```text
https://your-backend-domain.com/api/health
```

Expected response:

```json
{
  "status": "ok"
}
```

## Step 3: Deploy Frontend

Frontend root directory:

```bash
frontend
```

Build command:

```bash
npm ci && npm run build
```

Publish directory:

```bash
frontend/build
```

If the hosting provider asks for publish directory relative to the frontend root, use:

```bash
build
```

## Required Production Environment

Backend variables:

```env
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>/<database>?retryWrites=true&w=majority
JWT_SECRET=<64+ character random secret>
JWT_EXPIRES_IN=1d
FRONTEND_URL=https://your-frontend-domain.com
REQUEST_BODY_LIMIT=20kb
RATE_LIMIT_MAX=300
AUTH_RATE_LIMIT_MAX=20
BCRYPT_ROUNDS=12
MONGO_MAX_POOL_SIZE=20
```

Frontend variables:

```env
REACT_APP_API_URL=https://your-backend-domain.com/api
```

## Important URL Pairing

Backend `FRONTEND_URL` must exactly match your deployed frontend URL.

Frontend `REACT_APP_API_URL` must point to your deployed backend URL ending with `/api`.

Example:

```env
FRONTEND_URL=https://autoassist.vercel.app
REACT_APP_API_URL=https://autoassist-backend.onrender.com/api
```

## Local Verification Commands

Backend:

```bash
cd backend
npm install
npm run check
npm start
```

Frontend:

```bash
cd frontend
npm install
npm run build
```

## Post-Deployment Testing

- Register a new account.
- Login with that account.
- Book a service request.
- Confirm the request appears in My Requests and Live Requests.
- Confirm mechanic assignment, call/chat UI, wallet, profile, and logout work.
- Confirm direct page refresh works on routes like `/home`, `/wallet`, `/profile`, and `/myrequests`.
- Confirm backend rejects unknown frontend origins after `FRONTEND_URL` is set.

## Security Gates Before Public Launch

- Use HTTPS for frontend and backend.
- Never commit `.env` files.
- Use a strong production `JWT_SECRET`.
- Set `FRONTEND_URL` to the exact deployed frontend domain.
- Set `REACT_APP_API_URL` to the deployed backend `/api` URL.
- Verify `/api/health` returns `{ "status": "ok" }`.
- Test register, login, service booking, active requests, wallet, profile, and logout on the deployed URL.
- Rotate secrets if they were ever shared publicly.
- Do not use `npm audit fix --force` on the frontend CRA project because it can install a broken `react-scripts` version.
- For full enterprise readiness later, migrate the frontend from Create React App to Vite or another maintained build setup.
