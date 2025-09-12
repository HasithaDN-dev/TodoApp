# TodoApp

A full-stack Todo application built with React (frontend), Spring Boot (backend), and MariaDB (database). This project demonstrates modern web development, authentication, and containerization with Docker.

---

## Features
- User registration and login (JWT authentication)
- Add, edit, delete, and view todos
- Responsive UI with Tailwind CSS
- RESTful API backend
- Containerized with Docker and Docker Compose

---

## Technologies Used
- React, Vite, Tailwind CSS, Axios (Frontend)
- Spring Boot, Spring Security, JPA/Hibernate, JWT (Backend)
- MariaDB (Database)
- Docker, Docker Compose (DevOps)

---

## Quick Start (with Docker)
1. Ensure MariaDB (or XAMPP) is running and database `todo_app` exists
2. In the project root, run:
   ```bash
   docker-compose up --build
   ```
3. Access the app:
   - Backend: http://localhost:8080
   - Frontend: http://localhost:3000

---

## Project Structure
- `todo-frontend/` - React frontend
- `todo-backend/` - Spring Boot backend
- `Documentation.txt` - Full project documentation
- `docker-compose.yml` - Multi-container orchestration

---

## Collaboration & Containerization
- All collaborators use the same environment via Docker
- No manual setup required for dependencies
- Easy to deploy to cloud or other machines

---

## License
This project is open-source and available under the MIT License.
