# TodoApp Frontend

This is the React frontend for the TodoApp project. It provides a user interface for managing todos, authentication, and interacts with the backend API.

---

## Features
- User authentication (login/register)
- Add, edit, delete, and view todos
- Responsive UI with Tailwind CSS
- Protected routes for authenticated users

---

## Getting Started (Local Development)

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. The app will be available at `http://localhost:5173` (default Vite port).

---

## Build for Production

```bash
npm run build
```
The production build will be output to the `dist/` folder.

---

## Containerization & Collaboration

This app is fully containerized using Docker. Collaborators can run the frontend in a consistent environment without manual setup:

### Build and Run with Docker
```bash
docker build -t todo-frontend .
docker run -p 3000:80 todo-frontend
```
Or use Docker Compose for full-stack orchestration:
```bash
docker-compose up --build
```

### How Containerization Helps
- Ensures all collaborators use the same Node.js, Nginx, and dependencies
- No need to install Node.js or Nginx locally
- Easy to deploy to cloud or other machines

---

## Project Structure
- `src/` - React source code
- `public/` - Static assets
- `Dockerfile` - Container build instructions
- `README.md` - This documentation

---

## License

This project is open-source and available under the MIT License.
