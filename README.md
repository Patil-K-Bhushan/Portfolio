# ⚡Developer Portfolio

A responsive, high-performance developer portfolio styled with Tailwind CSS, featuring a Node.js Express mail backend.

## 🛠️ Architecture & Tech Stack
- **Frontend SPA**: React + Vite client utilizing adaptive CSS variables.
- **Backend API**: Node.js Express mail server utilizing Nodemailer for Gmail SMTP.
- **Real Stats**: Removed mock datasets, mapped entirely from actual resume details.

## 📁 Repository Structure
- `frontend/`: React client. Runs on `http://localhost:5173`.
- `backend/`: Express mail API. Runs on `http://localhost:5000`.

## 🚀 Local Installation

### 1. Launch Backend Mail Server
```bash
cd backend
npm install
npm start
```

### 2. Launch Client Console
```bash
cd frontend
npm install
npm run dev
```

## 🌐 Deploying
- **Client**: Build with `npm run build` and upload the compiled `dist/` directory for free on Vercel or Netlify.
- **API Server**: Deploy `backend/` directly to Render, Railway, or Koyeb for free. Configure the environment variables `EMAIL_USER` and `EMAIL_PASS`.
