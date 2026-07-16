# ⚡ Mail Decryption Server - Backend Subproject

Lightweight Express API server for mail delivery routing.

## ⚙️ Configuration
The server reads the following environment variables:
- `EMAIL_USER`: Gmail SMTP account (default: `bpatil.00001@gmail.com`).
- `EMAIL_PASS`: App password generated from your Google Account settings.
*Note: If no password is set, the server runs in simulation log mode.*

## 🚀 Execution Commands
1. Configure credentials:
   ```bash
   $env:EMAIL_PASS="your_gmail_app_password"
   ```
2. Start API listener:
   ```bash
   npm start
   ```
