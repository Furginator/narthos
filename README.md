**<p align="center">Welcome to Narthos!</p>**
<p align="center"><img width="150" height="150" alt="narthos_logo" src="https://github.com/user-attachments/assets/fb0cc2be-ac89-47aa-a75c-50aaf7119563" /></p>

<p align="center">Narthos is a web-based GUI crafted with Vite and TypeScript, harmonizing structured absence with infinite possibility.</p>
<p align="center">Built atop a FastAPI backend, it offers a liminal workspace for exploring, managing, and transforming AI-driven databases.</p>

<img width="2494" height="771" alt="narthos-1" src="https://github.com/user-attachments/assets/0d7e645f-5fc7-458c-8d54-96f9741fe8e3" />
<img width="2494" height="759" alt="narthos-2" src="https://github.com/user-attachments/assets/7ed5a645-c7a7-46e3-a666-f1a4bf8a78f5" />

## Setup

### Frontend
1. Install Node.js (>=20.19.0): https://nodejs.org
2. Install dependencies: npm install
3. Run the app: npm run dev

Access at http://localhost:5173.

Backend

Create and activate a Python virtual environment (>=3.8):python3 -m venv venv
source venv/bin/activate


Install dependencies:pip install -r backend/requirements.txt


Run the backend:uvicorn backend:app --host 0.0.0.0 --port 8000



Running in VS Code

Install the Python extension in VS Code.
Select the virtual environment: Ctrl+Shift+P > Python: Select Interpreter.
Run both environments: Ctrl+Shift+B > Start All (uses .vscode/tasks.json).

Structure

src/components/: React components (NarthosGUI.tsx, Header.tsx, etc.).
src/styles/: Component-specific CSS (App.css, Header.css, etc.).
src/types/: TypeScript type definitions (index.ts).
src/main.tsx: Entry point for the Vite app.
backend/: FastAPI backend (backend.py, requirements.txt).
public/: Static assets (index.html, favicon.ico, manifest.json).

Features

Dashboard: System summary and stats with hover details.
Connections: Database connection management with connection log.
Models: Model creation and listing.
Data: Collection browsing with delete functionality.
Predictions: Run predictions with results display.
Logs: System log viewer with clear option.

Security
Migrated to Vite to resolve vulnerabilities in react-scripts@5.0.1. No known vulnerabilities remain. Monitor with:
npm audit
npm outdated

Commits are GPG-signed (verified on GitHub).

License
MIT
