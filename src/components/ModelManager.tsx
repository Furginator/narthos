{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Start Frontend",
      "type": "shell",
      "command": "npm run dev",
      "group": "build",
      "runOptions": { "runOn": "folderOpen" },
      "presentation": { "panel": "dedicated", "group": "dev" }
    },
    {
      "label": "Start Backend",
      "type": "shell",
      "command": "${command:python.interpreterPath} -m uvicorn backend:app --host 0.0.0.0 --port 8000",
      "group": "build",
      "runOptions": { "runOn": "folderOpen" },
      "presentation": { "panel": "dedicated", "group": "dev" }
    },
    {
      "label": "Start All",
      "dependsOn": ["Start Frontend", "Start Backend"],
      "group": { "kind": "build", "isDefault": true }
    }
  ]
}