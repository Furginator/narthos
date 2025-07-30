# Narthos (ver 0.3.0)
Welcome to Narthos, a digital sanctuary where data and AI converge in a realm of shadowed symmetry. Narthos is a web-based GUI crafted with Vite and TypeScript, harmonizing structured absence with infinite possibility. Built atop a FastAPI backend, it offers a liminal workspace for exploring, managing, and transforming AI-driven databases.



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
