# Narthos (ver 0.3.0)
Welcome to Narthos, a digital sanctuary where data and AI converge in a realm of shadowed symmetry. Narthos is a web-based GUI crafted with Vite and TypeScript, harmonizing structured absence with infinite possibility. Built atop a FastAPI backend, it offers a liminal workspace for exploring, managing, and transforming AI-driven databases.

<img width="2494" height="771" alt="narthos-1" src="https://github.com/user-attachments/assets/0d7e645f-5fc7-458c-8d54-96f9741fe8e3" />
<img width="2494" height="759" alt="narthos-2" src="https://github.com/user-attachments/assets/7ed5a645-c7a7-46e3-a666-f1a4bf8a78f5" />

## Installation

### Development Setup
1. Install Node.js >=20.19.0: `curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash - && sudo apt-get install -y nodejs`
2. Install Python 3/venv: `sudo apt-get install -y python3 python3-venv`
3. Clone repo: `git clone https://github.com/Furginator/narthos.git`
4. Navigate: `cd narthos`
5. Create venv: `python3 -m venv venv`
6. Activate venv: `source venv/bin/activate`
7. Install dev deps: `npm run install:dev` (includes TypeScript 5.8.3, etc.)
8. Run: `npm run dev`[](http://localhost:5173)

### Production Setup
1. Follow steps 1-6.
2. Install prod deps: `npm run install:prod`
3. Build: `npm run build`
4. Serve frontend: Use Nginx or similar.
5. Run backend: `uvicorn backend:app --host 0.0.0.0 --port 8000`

Structure

src/components/: React components (NarthosGUI.tsx, Header.tsx, etc.).
src/styles/: Component-specific CSS (App.css, Header.css, etc.).
src/types/: TypeScript type definitions (index.ts).
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
