<img align="left" width="100" height="100" alt="narthos_logo" src="https://github.com/user-attachments/assets/fb0cc2be-ac89-47aa-a75c-50aaf7119563">

# <table><tr><td> Welcome to Narthos! </td></tr></table>

Narthos is a web-based GUI crafted with Vite and TypeScript, harmonizing structured absence with infinite possibility. Built atop a FastAPI backend, it offers a liminal workspace for exploring, managing, and transforming AI-driven databases.

<div style="display: flex; gap: 20px;">
  <img width="300" height="200" alt="Screenshot from 2025-07-31 00-36-05" src="https://github.com/user-attachments/assets/cfcc1402-36f2-46a5-9de4-4b0117425e28" />
  <img width="300" height="200" alt="Screenshot from 2025-07-31 00-36-13" src="https://github.com/user-attachments/assets/0a32c91c-d289-4558-8df6-a72abf4c6419" />
</div>

## Setup

### Frontend
- Install Node.js (>=20.19.0): [https://nodejs.org]
- Install dependencies: `npm install`
- Run the app: `npm run dev`
- Access at [http://localhost:5173](http://localhost:5173)

### Backend
- Create a Python virtual environment (>=3.8): `python3 -m venv venv`
- Activate Python virtual environment: `source venv/bin/activate`
- Install dependencies: `pip install -r backend/requirements.txt`
- Run the backend: `uvicorn backend:app --host 0.0.0.0 --port 8000`

### Running in VS Code
- Install the Python extension in VS Code.
- Select the virtual environment: `Ctrl+Shift+P` > Python: Select Interpreter.
- Run both environments: `Ctrl+Shift+B` > Start All (uses .vscode/tasks.json).

### Structure
- src/components/: React components (NarthosGUI.tsx, Header.tsx, etc.).
- src/styles/: Component-specific CSS (App.css, Header.css, etc.).
- src/types/: TypeScript type definitions (index.ts).
- src/main.tsx: Entry point for the Vite app.
- backend/: FastAPI backend (backend.py, requirements.txt).
- public/: Static assets (index.html, favicon.ico, manifest.json).

### Features
- Dashboard: System summary and stats with hover details.
- Connections: Database connection management with connection log.
- Models: Model creation and listing.
- Data: Collection browsing with delete functionality.
- Predictions: Run predictions with results display.
- Logs: System log viewer with clear option.

### Security
- Migrated to Vite to resolve vulnerabilities in react-scripts@5.0.1.
- No known vulnerabilities remain.
- Monitor with: `npm audit` and `npm outdated`

Commits are GPG-signed (verified on GitHub).

License: MIT
